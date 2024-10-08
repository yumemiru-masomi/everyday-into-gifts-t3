"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestPost() {
  // totalLengthを取得
  const { data: totalLengthData, refetch: refetchTotalLength } =
    api.post.getTotalMessageLength.useQuery();
  // モーダル
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  // 最新の投稿を取得
  const [latestPost] = api.post.getLatest.useSuspenseQuery();
  const utils = api.useUtils();
  const [message, setMessage] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      await refetchTotalLength();
      setMessage("");
    },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="justify-cente container flex flex-col items-center">
        <p className="text-7xl">
          {totalLengthData?.totalLength?.toLocaleString() ?? "🥺"}
          <span className="text-3xl">円</span>
        </p>
        <button
          className="mb-7 mt-4 rounded-full bg-red-500 px-6 py-2 text-white"
          onClick={openModal}
        >
          ご褒美に使っちゃおう！
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-8 text-center">
            <p className="mb-4 text-lg text-black">
              本当に使ってもいいですか？
            </p>
            <p className="pb-4 text-5xl text-black">
              {totalLengthData?.totalLength?.toLocaleString() ?? 0}
              <span className="text-3xl text-black">円</span>
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="rounded-full bg-red-500 px-6 py-2 text-white"
                onClick={() => {
                  // ここに「使っちゃう」ボタンを押したら金額をリセットする処理を書く
                  setIsModalOpen(false);
                }}
              >
                使っちゃう！
              </button>
              <button
                className="rounded-full bg-gray-500 px-6 py-2 text-white"
                onClick={closeModal}
              >
                キャンセル
              </button>
            </div>
          </div>
        </div>
      )}
      {latestPost ? (
        <p className="mx-auto w-[500px] whitespace-normal pb-7 text-center text-3xl">
          {latestPost.message}
        </p>
      ) : (
        <p className="pb-7 text-center text-3xl">
          ここにストレスを吐き出そう！
        </p>
      )}
      <div className="w-full max-w-xs">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPost.mutate({ message });
          }}
          className="flex flex-col gap-2"
        >
          <input
            type="text"
            placeholder="Stress Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-full px-4 py-2 text-black"
          />
          <button
            type="submit"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
            disabled={createPost.isPending}
          >
            {createPost.isPending ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
