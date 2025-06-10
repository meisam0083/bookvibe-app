// file: app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header"; // وارد کردن هدر

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookVibe",
  description: "Discover your next great read, built with AI.",
  // این خط مانیفست رو برای ظاهر اپلیکیشنی اضافه می‌کنه
  manifest: "/manifest.json", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}