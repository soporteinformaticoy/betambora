"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    // Captura el token recibido por el callback de Google
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('tamboraToken', token);
      window.location.href = '/mapa';
    }

    // Si ya está logueado, redirigir
    if (
      typeof window !== "undefined" &&
      (localStorage.getItem("tamboraToken") || localStorage.getItem("token"))
    ) {
      router.replace("/mapa");
    }
  }, [router]);

  const GOOGLE_URL =
    `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"}/auth/google`;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden">
      {/* Fuego animado abajo */}
      <div className="absolute bottom-0 left-0 w-full h-[40vh] z-0 fire-gradient animate-fire pointer-events-none" />

      {/* Gradiente azul/púrpura sutil de fondo (inspirado en original) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-black z-0" />

      {/* Luna roja animada */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10"
        animate={{ 
          scale: [0.96, 1.14, 1.06], 
          boxShadow: [
            "0 0 90px #b91c1c99", 
            "0 0 120px #dc2626cc", 
            "0 0 100px #b91c1c99"
          ] 
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <div className="rounded-full bg-gradient-to-b from-red-900 via-red-700 to-black w-[340px] h-[340px] shadow-2xl border-8 border-red-900 opacity-95"></div>
      </motion.div>

      {/* Header con link admin (inspirado en original) */}
      <div className="absolute top-6 right-6 z-30">
        <a
          href="/admin"
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all backdrop-blur-sm border border-white/20"
        >
          🔐 Admin
        </a>
      </div>

      {/* Contenido principal */}
      <div className="relative z-20 flex flex-col items-center gap-8 px-6">
        {/* Título principal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-7xl sm:text-8xl font-black text-red-700 drop-shadow-2xl tracking-widest mb-4">
            🥁 Tambora
          </h1>
          <p className="text-xl sm:text-2xl font-semibold text-white/90 mb-2 max-w-2xl">
            Eventos de Candombe en Uruguay y Argentina
          </p>
        </motion.div>

        {/* Subtítulo épico */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-lg sm:text-xl font-light text-white/80 italic max-w-xl">
            Almas de ayer y hoy haciendo chas chas bajo las estrellas
          </p>
        </motion.div>

        {/* Botón Google */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Button
            asChild
            size="lg"
            className="mt-4 px-12 py-7 bg-red-700 hover:bg-red-900 text-xl font-bold rounded-full shadow-2xl animate-pulse-glow border-2 border-red-800"
          >
            <a href={GOOGLE_URL}>
              Entrar con Google &middot; <span className="font-light">Reconocer mi alma</span>
            </a>
          </Button>
        </motion.div>

        {/* Info adicional (inspirado en original) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-white/60">
            Descubrí los eventos de candombe en tu ciudad
          </p>
        </motion.div>
      </div>

      {/* Footer sutil */}
      <footer className="absolute bottom-4 left-0 right-0 z-20 text-center text-xs text-white/40">
        <p>Tambora - Conectando almas a través del candombe</p>
      </footer>
    </div>
  );
}
