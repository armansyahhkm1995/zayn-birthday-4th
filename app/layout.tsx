import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zayn Birthday 4th",
  description:
    "A playful underwater birthday puzzle adventure for Zayn's fourth birthday.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--color-ocean-900)] text-[var(--color-navy)]">
        {children}
      </body>
    </html>
  );
}
