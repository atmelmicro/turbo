import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";
import { Theme } from "@radix-ui/themes";

// export const runtime =
//  process.env.NODE_ENV === "development" ? "nodejs" : "edge";
export const runtime = "edge"; // need this shit to work for now HOLY SHIT FUCK NEXT
export const metadata: Metadata = {
  title: "MAT Development",
  description: "We're reinveting the smart home for you.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <Theme grayColor="sand" radius="small">
          {children}
        </Theme>
      </body>
    </html>
  );
}
