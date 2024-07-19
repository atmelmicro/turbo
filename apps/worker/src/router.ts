import { homeRouter } from "./homes";
import { procedure, router } from "./trpc";
import { roomRouter } from "./rooms";
import { deviceRouter } from "./devices";
import { userRouter } from "./user";
import { z } from "zod";
import { LoopsClient } from "loops";

export const appRouter = router.router({
  home: homeRouter,
  room: roomRouter,
  device: deviceRouter,
  user: userRouter,
  ping: procedure.query(() => "hello from mat"),
  addEmail: procedure
    .input(z.object({ email: z.string().email() }))
    .mutation(async ({ ctx: { env }, input: { email } }) => {
      // @ts-ignore
      const loops = new LoopsClient("c79490a48bdd3e2f46d51c4d03a52263");

      let res = await loops.createContact(email);
      console.log(res);
      return res;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
