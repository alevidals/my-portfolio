import { Footer } from "@/shared/components/footer";
import { Header } from "@/shared/components/header";
import { AnimatedGradient } from "@/shared/components/ui/animated-gradient";
import Image from "next/image";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="min-h-dvh grid grid-rows-[auto_1fr_auto]">
      <AnimatedGradient />
      <Header />
      <main className="flex flex-col items-center justify-center px-4">
        <Image
          src="/404.svg"
          alt="404"
          width={500}
          height={500}
          className="mx-auto mt-10"
        />
        <Link href="/" className="text-center mt-12">
          <h1 className="text-3xl mb-4">Page not found</h1>
          <p className="text-base">
            The page you are looking for does not exist.{" "}
            <span className="font-medium underline underline-offset-4">
              Go back to the homepage
            </span>
            .
          </p>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
