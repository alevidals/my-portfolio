import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  type Locale,
  assertIsLocale,
  baseLocale,
  getLocale,
  overwriteGetLocale,
  overwriteGetUrlOrigin,
} from "@/paraglide/runtime";
import { TailwindIndicator } from "@/shared/components/tailwind-indicator";
import { Toaster } from "@/shared/components/ui/sonner";
import { siteConfig } from "@/shared/lib/config";
import { env } from "@/shared/lib/env";
import { headers } from "next/headers";
import { cache } from "react";

const ssrLocale = cache(() => ({
  locale: baseLocale,
  // needs to be localhost https://github.com/opral/inlang-paraglide-js/issues/407
  origin: "http://localhost",
}));

// overwrite the getLocale function to use the locale from the request
overwriteGetLocale(() => assertIsLocale(ssrLocale().locale));
overwriteGetUrlOrigin(() => ssrLocale().origin);

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  ssrLocale().locale = (await headers()).get("x-paraglide-locale") as Locale;
  ssrLocale().origin = new URL(
    (await headers()).get("x-paraglide-request-url"),
  ).origin;

  return (
    <html lang={getLocale()} className="dark" suppressHydrationWarning>
      <body className={`${geistMono.variable} font-sans antialiased`}>
        {children}
        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  );
}
