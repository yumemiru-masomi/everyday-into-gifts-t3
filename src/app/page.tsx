import Link from "next/link";
import { LatestPost } from "~/components/LatestPost";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Everyday <span className="text-[hsl(280,100%,70%)]">into</span>{" "}
            Gifts
          </h1>
          <p className="text-center">
            日々のストレスを文字で書いてストレスを発散しましょう❤️‍🔥
            <br />
            1文字1円として換算し、合計の金額が表示されます!
            <br />
            溜まったら、その分のお金を自分へのご褒美の金額として何か買っちゃいましょう🥰
          </p>
          {session?.user && <LatestPost />}
          {session?.user && (
            <div className="flex w-full flex-row items-center justify-end gap-4">
              <p className="text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          )}
          {!session?.user && (
            <div className="flex w-full flex-row items-center justify-center gap-4">
              <p className="text-2xl text-white">
                {session && <span>Logged in as {session.user?.name}</span>}
              </p>
              <Link
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
                className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              >
                {session ? "Sign out" : "Sign in"}
              </Link>
            </div>
          )}
          {!session?.user && (
            <div className="flex">
              <Link
                href={"/legal/terms"}
                target="_blank"
                className="text-sm text-white transition hover:text-gray-300"
              >
                利用規約
              </Link>
              <p className="text-sm text-white">・</p>
              <Link
                href={"/legal/privacy"}
                target="_blank"
                className="text-sm text-white transition hover:text-gray-300"
              >
                プライバシーポリシー
              </Link>
              <p className="text-sm">をご確認ください</p>
            </div>
          )}
        </div>
      </main>
    </HydrateClient>
  );
}
