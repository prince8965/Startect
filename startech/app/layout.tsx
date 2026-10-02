import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "STARTECH — Lunar Image Correspondence Platform | SIH 2026",
  description:
    "Cross-mission image registration and correspondence platform for Chandrayaan-2, NASA LRO, and JAXA SELENE lunar observations (SIH 2026 - Problem Statement 26166).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-foreground antialiased min-h-screen selection:bg-cyan selection:text-background">
        {children}
      </body>
    </html>
  );
}
