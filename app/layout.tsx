'use client' 

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/NavBar";

const queryClient = new QueryClient();


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap your entire layout in QueryClientProvider */}
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
          <Navbar />
          {children}
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
