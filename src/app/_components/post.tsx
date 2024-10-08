"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [message, setMessage] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setMessage("");
    },
  });

  return (
    <div className="flex flex-col items-center">
      {latestPost ? (
        <p className="mx-auto w-[500px] whitespace-normal pb-7 text-center text-3xl">
          {latestPost.message}
        </p>
      ) : (
        <p className="pb-7 text-center text-3xl">You have no posts yet.</p>
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
