import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar"; // Sidebar component
import { Suspense } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoginProvider } from "./context/LoginContext"; // 👈 Import LoginProvider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ashish Mishra Portfolio",
  description: "My personal portfolio built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-gray-100 text-gray-800">
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <LoginProvider> {/* 👈 Wrap children inside LoginProvider */}
            <Sidebar />
            <main className="flex-1">{children}</main>
          </LoginProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
