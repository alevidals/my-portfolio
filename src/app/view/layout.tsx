import { Header } from "@/app/view/_components/header";

export default async function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-6 max-w-4xl container mx-auto">
      <Header />
      {children}
    </div>
  );
}
