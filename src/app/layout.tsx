import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/config";
import { env } from "@/lib/env";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [
    "portfolio",
    "cv",
    "resume",
    "myportfolio",
    "create portfolio",
    "create cv",
  ],
  authors: [
    {
      name: "Alejandro Vidal",
      url: siteConfig.links.github,
    },
  ],
  creator: "Alejandro Vidal",
  openGraph: {
    type: "website",
    url: env.NEXT_PUBLIC_SITE_URL,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 600,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@alevidals",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" className="dark">
        <body className={`${geistMono.variable} font-sans antialiased`}>
          {children}
          <Toaster />
          <TailwindIndicator />
        </body>
      </html>
    </ClerkProvider>
  );
}
