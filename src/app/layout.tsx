// src/app/layout.tsx
import type { Metadata } from "next";
// A nice Persian font to make it look more polished
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

// Font setup
const vazirmatn = Vazirmatn({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "Auth Task",
  description: "A simple auth flow with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      {/*
        Here we wrap the entire app with our AuthProvider.
        Now, any component in the app can access the auth state.
      */}
      <body className={vazirmatn.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}