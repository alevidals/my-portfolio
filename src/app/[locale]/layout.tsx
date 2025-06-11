import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "../globals.css";
import { routing } from "@/i18n/routing";
import { TailwindIndicator } from "@/shared/components/tailwind-indicator";
import { Toaster } from "@/shared/components/ui/sonner";
import { siteConfig } from "@/shared/lib/config";
import { env } from "@/shared/lib/env";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";

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
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className="dark">
      <body className={`${geistMono.variable} font-sans antialiased`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  );
}
