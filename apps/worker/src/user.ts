import { z } from "zod";
import { procedure, router, withAuth } from "./trpc";
import { generateId } from "lucia";
import { hash, sendEmail } from "./utils";
import { users } from "./schema";
import { bytesToHex } from "@noble/hashes/utils";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

const emailSchema = z.string().email().max(100);
const usernameSchema = z.string().min(1).max(100);
const passwordSchema = z.string().max(100).min(5);

export const userRouter = router.router({
  createUser: procedure
    .input(
      z.object({
        email: emailSchema,
        password: passwordSchema,
        username: usernameSchema,
      })
    )
    .mutation(async ({ input, ctx: { db, lucia } }) => {
      const id = generateId(15);
      const hashedPassword = hash(input.password, id);
      await db.insert(users).values({
        email: input.email,
        password: bytesToHex(hashedPassword),
        id,
        username: input.username,
      });
      const session = await lucia.createSession(id, {});
      return { sessionId: session.id, id };
    }),
  login: procedure
    .input(
      z.object({
        email: emailSchema,
        password: passwordSchema,
      })
    )
    .mutation(async ({ input, ctx: { db, lucia } }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.email, input.email),
      });
      if (!user)
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      const toCompare = hash(input.password, user.id);
      if (bytesToHex(toCompare) !== user.password)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Incorrect password",
        });
      const session = await lucia.createSession(user.id, {});
      console.log("login", session.id);
      return { sessionId: session.id, id: user.id };
    }),
  me: withAuth.query(async ({ ctx: { user } }) => ({
    id: user.id,
    email: user.email,
    username: user.username,
  })),
  changePassword: withAuth
    .input(
      z.object({
        oldPassword: passwordSchema,
        newPassword: passwordSchema,
      })
    )
    .mutation(
      async ({ ctx: { user, db }, input: { newPassword, oldPassword } }) => {
        const dbUser = await db.query.users.findFirst({
          where: eq(users.id, user.id),
        });
        if (!dbUser)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Server error",
          });

        const oldHashed = hash(oldPassword, user.id);
        if (bytesToHex(oldHashed) !== dbUser.password)
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Incorrect old password",
          });

        const newHashed = hash(newPassword, user.id);

        await db
          .update(users)
          .set({ password: bytesToHex(newHashed) })
          .where(eq(users.id, user.id));

        return { ok: true };
      }
    ),
  editUser: withAuth
    .input(z.object({ username: usernameSchema, email: emailSchema }))
    .mutation(async ({ ctx: { user, db }, input: { email, username } }) => {
      const res = await db
        .update(users)
        .set({ email, username })
        .where(eq(users.id, user.id));

      return { ok: res.meta.rows_written > 0 };
    }),
  deleteUser: withAuth.mutation(async ({ ctx: { db, user } }) => {
    const res = await db.delete(users).where(eq(users.id, user.id));
    return { ok: res.meta.rows_written > 0 };
  }),
  logout: withAuth.mutation(async ({ ctx: { lucia, session } }) => {
    await lucia.invalidateSession(session.id);
    await lucia.deleteExpiredSessions(); // TODO: cron job this
    return { ok: true };
  }),
  resetPassword: procedure
    .input(z.object({ email: emailSchema }))
    .mutation(async ({ ctx: { db, env }, input: { email } }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
      });
      if (!user)
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      if (
        user.lastPasswordReset &&
        new Date().getTime() - user.lastPasswordReset.getTime() <
          1000 * 60 * 60 * 24
      )
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already sent",
        });

      const resetToken = generateId(40);
      const res = await db
        .update(users)
        .set({ lastPasswordReset: new Date(), passwordResetToken: resetToken })
        .where(eq(users.id, user.id));
      const emailRes = await sendEmail(
        resetToken,
        user.email,
        "reset password",
        env.RESEND_KEY
      );
      if (!emailRes.ok) {
        console.log("WASDSAJNSNJAJFJKA");
        console.log(await emailRes.text());
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Can't send email",
        });
      }

      if (res.meta.rows_written < 1)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "something went wrong",
        });

      return { ok: true };
    }),
  useResetToken: procedure
    .input(z.object({ token: z.string(), newPassword: passwordSchema }))
    .mutation(async ({ ctx: { db }, input: { token, newPassword } }) => {
      const user = await db.query.users.findFirst({
        where: eq(users.passwordResetToken, token),
      });
      if (!user)
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid token" });
      const hashedPassword = hash(newPassword, user.id);
      const res = await db.update(users).set({
        passwordResetToken: null,
        lastPasswordReset: null,
        password: bytesToHex(hashedPassword),
      });
      return { ok: res.meta.rows_written > 0 };
    }),
});
