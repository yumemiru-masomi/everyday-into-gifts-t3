import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Footer } from "~/components/Footer";

export const metadata: Metadata = {
  title: "Everyday Into Gifts",
  description: "日々のストレスを文字で書いてストレスを発散しましょう❤️‍🔥",
  icons: [{ rel: "icon", url: "/gifts.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          {children}
          <Footer />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
