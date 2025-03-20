"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export function Header() {
  const { username } = useParams();

  return (
    <header className="container mx-auto sticky top-6 bg-background z-50">
      <div className="h-12 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-xl font-bold">{username}</h1>
        </Link>
        <nav>nav links</nav>
      </div>
    </header>
  );
}
