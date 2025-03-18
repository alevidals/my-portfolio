import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { getUser } from "@/lib/db/queries/users";
import { UserProvider } from "@/providers/user-provider";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyPortfolio",
  description: "The place where you could generate and share your portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userPromise = getUser();

  return (
    <html lang="en" className="dark">
      <body className={`${geistMono.variable} font-sans antialiased px-10`}>
        <UserProvider userPromise={userPromise}>
          {children}
          <TailwindIndicator />
        </UserProvider>
      </body>
    </html>
  );
}
