import type { Metadata } from "next";
import { Syne, Space_Mono, Outfit } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Ayush Kumawat | Premium Portfolio",
  description: "Explore the premium portfolio of Ayush Kumawat, a world-class Full Stack Developer specializing in Next.js, React Native, Expo, Node.js, and Matter.js interactive physics experiences.",
  keywords: "Ayush Kumawat, Full Stack Developer, Next.js Developer, React Native, Mobile Apps, Expo, Supabase, TypeScript, Matter.js Portfolio",
  authors: [{ name: "Ayush Kumawat" }],
  openGraph: {
    title: "Ayush Kumawat | Premium Portfolio",
    description: "Explore the premium portfolio of Ayush Kumawat, a world-class Full Stack Developer.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${spaceMono.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-background text-text-main font-sans selection:bg-accent selection:text-background overflow-x-hidden"
      >
        {children}
      </body>
    </html>
  );
}
