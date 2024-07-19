import { z } from "zod";
import { generateId } from "lucia";
import { homes, members, users } from "./schema";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { router, withAuth, withHome } from "./trpc";

export const homeRouter = router.router({
    create: withAuth
        .input(
            z.object({
                name: z.string().min(5),
            })
        )
        .mutation(async ({ ctx: { user, db }, input: { name } }) => {
            const id = generateId(15);
            await db.insert(homes).values({
                name,
                id,
            });
            await db.insert(members).values({
                userId: user.id,
                role: "owner",
                homeId: id,
            });

            return { id };
        }),
    delete: withHome.mutation(async ({ ctx: { db, home }, input: { homeId } }) => {
        if (home.members.role !== "owner")
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You cant add a member to this home",
            });

        const res = await db.delete(homes).where(eq(homes.id, homeId)).returning();

        if (res.length === 0)
            throw new TRPCError({ code: "BAD_REQUEST", message: "Could not remove house" });
        return { ok: true };
    }),
    addMember: withHome
        .input(z.object({ userEmail: z.string().email() }))
        .mutation(async ({ ctx: { db, home }, input: { homeId, userEmail } }) => {
            if (!["owner", "admin"].includes(home.members.role))
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You cant add a member to this home",
                });

            const usersWithEmail = await db
                .select({ id: users.id })
                .from(users)
                .where(eq(users.email, userEmail));
            if (usersWithEmail.length !== 1)
                throw new TRPCError({ code: "BAD_REQUEST", message: `User doesn't exist` });
            const userId = usersWithEmail[0].id;

            const membersWithEmail = await db
                .select()
                .from(members)
                .innerJoin(users, eq(members.userId, users.id))
                .where(eq(users.email, userEmail));

            if (membersWithEmail.map((x) => x.members.homeId).includes(homeId))
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: `User already is a part of the house`,
                });

            await db.insert(members).values({ userId, role: "member", homeId });
            return { ok: true };
        }),
    removeMember: withHome
        .input(z.object({ homeId: z.string(), userId: z.string() }))
        .mutation(async ({ ctx: { home, db }, input: { homeId, userId } }) => {
            if (!["owner", "admin"].includes(home.members.role))
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You cant add a member to this home",
                });

            const res = await db
                .delete(members)
                .where(and(eq(members.homeId, homeId), eq(members.userId, userId)));
            return { ok: res.meta.rows_written > 0 };
        }),
    changeRole: withHome
        .input(
            z.object({ homeId: z.string(), userId: z.string(), role: z.enum(["member", "admin"]) })
        )
        .mutation(async ({ ctx: { home, db }, input: { homeId, userId, role } }) => {
            if (home.members.role !== "owner")
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You cant add a member to this home",
                });

            const res = await db
                .update(members)
                .set({ role: role })
                .where(and(eq(members.homeId, homeId), eq(members.userId, userId)));

            return { ok: res.meta.rows_written > 0 };
        }),
    getAll: withAuth.query(async ({ ctx: { db, user } }) => {
        return (
            await db
                .select()
                .from(homes)
                .innerJoin(members, eq(homes.id, members.homeId))
                .where(and(eq(members.userId, user.id)))
        ).map((x) => x.homes);
    }),
    get: withHome.query(async ({ ctx: { db }, input: { homeId } }) => {
        return await db.query.homes.findFirst({
            where: eq(homes.id, homeId),
            with: {
                devices: {
                    columns: {
                        id: true,
                        name: true,
                        lastUpdated: true,
                        parentDeviceId: true,
                        roomId: true,
                        state: true,
                        type: true,
                    },
                },
                rooms: { columns: { id: true, name: true } },
            },
        });
    }),
    getMembers: withHome.query(async ({ ctx: { db }, input: { homeId } }) => {
        return await db.select().from(members).where(eq(members.homeId, homeId));
    }),
});
