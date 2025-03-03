"use client";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1>Hello, World!</h1>
      <Button
        onClick={() => {
          console.log("clicked");
        }}
      >
        Click me
      </Button>
    </div>
  );
}
