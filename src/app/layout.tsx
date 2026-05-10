import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PCH Community | Elevate Your Game",
  description: "The exclusive web platform for the PCH sports community.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased text-white selection:bg-primary/30`}>
        <Navbar />
        <main className="pt-16 min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
