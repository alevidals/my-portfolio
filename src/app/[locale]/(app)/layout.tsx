import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="px-4 container mx-auto">{children}</main>
      <Footer />
    </div>
  );
}
