import { Header } from "@/app/dashboard/_components/header";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-6">
      <Header />
      {children}
    </div>
  );
}
