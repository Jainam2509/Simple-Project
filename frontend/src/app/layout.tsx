import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import AppNav from "../components/AppNav";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Simple Fullstack Flow",
  description: "Frontend to backend flow with Next.js, Express and MongoDB"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spaceGrotesk.variable} suppressHydrationWarning>
        <AppNav />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
