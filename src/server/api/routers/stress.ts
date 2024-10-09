import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

type Post = {
  message: string;
};

export const stressRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ message: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.post.create({
        data: {
          message: input.message,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return post ?? null;
  }),

  getTotalMessageLength: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // 全てのメッセージを取得
    const messages: Post[] = await ctx.db.post.findMany({
      where: { createdById: userId, status: false },
      select: { message: true }, // messageフィールドのみを取得
    });

    // メッセージの文字数を合計
    const totalLength = messages.reduce(
      (acc, post) => acc + post.message.length,
      0,
    );

    return { totalLength };
  }),

  updateStatus: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    // ステータスを更新
    const updatedPosts = await ctx.db.post.updateMany({
      where: {
        createdById: userId, // 現在のユーザーが作成した投稿
        status: false, // まだ「使っていない」投稿のみ
      },
      data: {
        status: true, // status を true に更新（リセット）
      },
    });
    return updatedPosts;
  }),
});
