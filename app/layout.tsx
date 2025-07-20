"use client";

import React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <main className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-900 text-white">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
