import { Suspense, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-dvh p-6 grid grid-cols-1 lg:grid-cols-2">
      <section className="hidden lg:flex bg-gradient-to-r from-zinc-700 via-zinc-800 to-zinc-900 rounded-2xl" />
      <section className="p-6 md:p-16 flex flex-col justify-center">
        <Suspense>{children}</Suspense>
      </section>
    </div>
  );
}
