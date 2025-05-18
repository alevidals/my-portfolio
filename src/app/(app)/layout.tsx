import { Header } from "@/app/_components/header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto min-h-dvh grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="px-4">{children}</main>
      <footer>
        <div className="container mx-auto py-8">
          <p className="text-center text-sm text-neutral-400">
            &copy; {new Date().getFullYear()} MyPortfolio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
