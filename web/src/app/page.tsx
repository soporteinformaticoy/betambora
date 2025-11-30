"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    // Busca token en cookies o localStorage (solo lado cliente)
    if (
      typeof window !== "undefined" &&
      (localStorage.getItem("token") || document.cookie.includes("token="))
    ) {
      router.replace("/mapa");
    }
  }, [router]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('tamboraToken', token);
      window.location.href = '/mapa';
    }
  }, []);

  const GOOGLE_URL =
    `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"}/api/auth/google`;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Fuego animado abajo */}
      <div className="absolute bottom-0 left-0 w-full h-[32vh] z-0 fire-gradient animate-fire pointer-events-none" />

      {/* Luna roja animada */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        animate={{ scale: [0.96, 1.14, 1.06], boxShadow: ["0 0 90px #b91c1c99", "0 0 120px #dc2626cc", "0 0 100px #b91c1c99"] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <div className="rounded-full bg-gradient-to-b from-red-900 via-red-700 to-black w-[340px] h-[340px] shadow-2xl border-8 border-red-900 opacity-95"></div>
      </motion.div>

      {/* Textos y botón sobre la luna */}
      <div className="relative z-20 flex flex-col items-center gap-8">
        <h1 className="text-6xl sm:text-7xl font-black text-red-700 drop-shadow-lg tracking-widest animate-fadein">
          Tambora
        </h1>
        <h2 className="text-lg sm:text-2xl font-semibold text-white/90 mb-2 max-w-xl text-center animate-fadein-slow">
          Almas de ayer y hoy haciendo chas chas bajo las estrellas
        </h2>
        <Button
          asChild
          size="lg"
          className="mt-4 px-10 py-6 bg-red-700 hover:bg-red-900 text-xl font-bold rounded-full shadow-lg animate-pulse-glow"
        >
          <a href={GOOGLE_URL}>
            Entrar con Google &middot; <span className="font-light">Reconocer mi alma</span>
          </a>
        </Button>
      </div>
    </div>
  );
}