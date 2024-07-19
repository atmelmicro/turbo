import { z } from "zod";
import { router, withDevice, withHome } from "./trpc";
import { devices } from "./schema";
import { generateId } from "lucia";
import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

export const deviceTypes = z.enum(["blinds1"]);
export const devicesSchema = {
    blinds1: z.object({
        tilt: z.number().min(0).max(100).default(0),
        lift: z.number().min(0).max(100).default(0),
    }),
} satisfies Record<z.infer<typeof deviceTypes>, any>;

function getDefaults<Schema extends z.AnyZodObject>(schema: Schema) {
    return Object.fromEntries(
        Object.entries(schema.shape).map(([key, value]) => {
            if (value instanceof z.ZodDefault) return [key, value._def.defaultValue()];
            return [key, undefined];
        })
    );
}

export const deviceRouter = router.router({
    register: withHome
        .input(z.object({ name: z.string(), type: deviceTypes }))
        .mutation(async ({ ctx: { db }, input: { homeId, name, type } }) => {
            const id = generateId(15);
            const token = generateId(40);
            const state = getDefaults(devicesSchema[type]);
            await db
                .insert(devices)
                .values({ id, name, state, type, lastUpdated: new Date(), homeId, token });
            return { token, id };
        }),
    delete: withDevice.mutation(async ({ ctx: { device, member, db } }) => {
        if (!["admin", "owner"].includes(member.role))
            throw new TRPCError({ code: "UNAUTHORIZED", message: "You can't remove devices" });
        const res = await db.delete(devices).where(and(eq(devices.id, device.id)));
        return { ok: res.meta.rows_written > 0 };
    }),
    auth: withDevice.query(async ({ ctx: { device, member } }) => {
        if (!["admin", "owner"].includes(member.role))
            throw new TRPCError({ code: "UNAUTHORIZED", message: "You can't auth devices" });
        return { token: device.token };
    }),
    get: withDevice.query(
        async ({
            ctx: {
                device: { id, homeId, lastUpdated, name, parentDeviceId, roomId, state, type },
            },
        }) => ({
            id,
            homeId,
            lastUpdated,
            name,
            parentDeviceId,
            roomId,
            state,
            type,
        })
    ),
    setRoom: withDevice
        .input(z.object({ roomId: z.string() }))
        .mutation(async ({ ctx: { db }, input: { deviceId, roomId } }) => {
            const res = await db.update(devices).set({ roomId }).where(eq(devices.id, deviceId));
            return { ok: res.meta.rows_written > 0 };
        }),
});
