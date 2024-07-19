import { z } from "zod";
import { router, withHome, withRoom } from "./trpc";
import { TRPCError } from "@trpc/server";
import { rooms } from "./schema";
import { generateId } from "lucia";
import { eq } from "drizzle-orm";

export const roomRouter = router.router({
    create: withHome
        .input(
            z.object({
                name: z.string(),
            })
        )
        .mutation(async ({ ctx: { home, db }, input: { homeId, name } }) => {
            if (!["admin", "owner"].includes(home.members.role))
                throw new TRPCError({ code: "UNAUTHORIZED", message: "You can't create rooms" });
            const id = generateId(15);
            await db.insert(rooms).values({
                id,
                name,
                homeId,
            });
            return { id };
        }),
    delete: withRoom.mutation(async ({ ctx: { db, member }, input: { roomId } }) => {
        if (!["admin", "owner"].includes(member.role))
            throw new TRPCError({ code: "UNAUTHORIZED", message: "You can't delete rooms" });
        const res = await db.delete(rooms).where(eq(rooms.id, roomId));
        return { ok: res.meta.rows_written > 0 };
    }),
    changeName: withRoom
        .input(z.object({ name: z.string() }))
        .mutation(async ({ ctx: { db, member }, input: { name, roomId } }) => {
            if (!["admin", "owner"].includes(member.role))
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You can't change room name",
                });
            const res = await db.update(rooms).set({ name }).where(eq(rooms.id, roomId));
            return { ok: res.meta.rows_written > 0 };
        }),
});
