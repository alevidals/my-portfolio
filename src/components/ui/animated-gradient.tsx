"use client";

import { useEffect, useRef } from "react";

export function AnimatedGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
      mouseY = e.clientY / window.innerHeight;
    };

    const render = () => {
      time += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Crear gradiente
      const gradient = ctx.createRadialGradient(
        canvas.width * mouseX,
        canvas.height * mouseY,
        0,
        canvas.width * mouseX,
        canvas.height * mouseY,
        canvas.width * 0.5,
      );

      gradient.addColorStop(0, "rgba(30, 30, 30, 0.2)");
      gradient.addColorStop(0.5, "rgba(40, 40, 40, 0.1)");
      gradient.addColorStop(1, "rgba(10, 10, 10, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    resize();
    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-70"
    />
  );
}
