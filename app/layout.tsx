import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arian Monadi | Full Stack Developer & Visionary",
  description: "Official portfolio of Arian Monadi. Exploring the intersection of Web Development, AI, and Pharmaceutical Sciences through immersive 3D experiences.",
  keywords: ["Arian Monadi", "Full Stack Developer", "Next.js", "Three.js", "AI", "Pharmacy", "Web Design"],
  authors: [{ name: "Arian Monadi" }],
  creator: "Arian Monadi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
