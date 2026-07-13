import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrendBurst | Discover Trending Products",
  description:
    "Stay ahead of the market with real-time trend tracking. Discover what's trending before everyone else.",
  keywords: ["trends", "products", "tracking", "market", "analysis"],
  authors: [{ name: "TrendBurst" }],
  creator: "TrendBurst",
  icons: {
    icon: "/assets/svg_fav.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://trendburst.io",
    title: "TrendBurst | Discover Trending Products",
    description: "Discover trending products in real-time",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", "font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
