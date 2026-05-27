import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "../store/ReduxProvider";
import { ThemeProvider } from "../context/ThemeContext";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskFlow - Task Management System",
  description: "A modern task management application built with Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen`}>
        <ReduxProvider>
          <ThemeProvider>
            <Navbar />
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{children}</main>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
