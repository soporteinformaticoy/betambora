"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Landing() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"agrupaciones" | "eventos">("agrupaciones");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"todos" | "UY" | "AR">("todos");

  useEffect(() => {
    // Busca token en cookies o localStorage (solo lado cliente)
    if (
      typeof window !== "undefined" &&
      (localStorage.getItem("tamboraToken") || localStorage.getItem("token") || document.cookie.includes("token="))
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
    <div className="relative min-h-screen flex bg-black overflow-hidden">
      {/* Fuego animado abajo */}
      <div className="absolute bottom-0 left-0 w-full h-[40vh] z-0 fire-gradient animate-fire pointer-events-none" />

      {/* Luna roja animada - más sutil, no bloquea el contenido */}
      <motion.div
        className="absolute right-20 top-20 z-10 opacity-60"
        animate={{ 
          scale: [0.96, 1.1, 1], 
          boxShadow: ["0 0 60px #b91c1c66", "0 0 90px #dc262699", "0 0 70px #b91c1c66"] 
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <div className="rounded-full bg-gradient-to-b from-red-900 via-red-700 to-black w-[280px] h-[280px] shadow-2xl border-6 border-red-900"></div>
      </motion.div>

      {/* Sidebar izquierdo - estilo original pero con colores Tambora */}
      <aside className="relative z-20 w-80 bg-gradient-to-b from-black/95 via-black/90 to-black/95 border-r-2 border-red-800 min-h-screen flex flex-col shadow-2xl">
        {/* Header */}
        <div className="px-6 py-6 border-b border-red-900/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white font-black text-xl">
              🥁
            </div>
            <h1 className="text-2xl font-black text-white">Tambora</h1>
          </div>
          <p className="text-sm text-red-200/80 italic">Almas de ayer y hoy haciendo chas chas bajo las estrellas</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-red-900/50">
          <button
            onClick={() => setActiveTab("agrupaciones")}
            className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
              activeTab === "agrupaciones"
                ? "text-white border-b-2 border-red-600 bg-red-900/20"
                : "text-red-200/60 hover:text-red-300"
            }`}
          >
            Agrupaciones
          </button>
          <button
            onClick={() => setActiveTab("eventos")}
            className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
              activeTab === "eventos"
                ? "text-white border-b-2 border-red-600 bg-red-900/20"
                : "text-red-200/60 hover:text-red-300"
            }`}
          >
            Eventos
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-6 border-b border-red-900/50">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={activeTab === "agrupaciones" ? "Buscar comparsa, barrio..." : "Buscar evento, lugar..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-black/50 border border-red-900/50 rounded-lg px-4 py-2 text-white placeholder-red-200/40 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 transition-colors">
              🔍
            </button>
          </div>
        </div>

        {/* Filtros */}
        <div className="px-6 pb-6 border-b border-red-900/50">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("todos")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all ${
                filter === "todos"
                  ? "bg-red-600 text-white"
                  : "bg-black/50 text-red-200/60 hover:bg-red-900/30"
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilter("UY")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1 ${
                filter === "UY"
                  ? "bg-red-600 text-white"
                  : "bg-black/50 text-red-200/60 hover:bg-red-900/30"
              }`}
            >
              🇺🇾 UY
            </button>
            <button
              onClick={() => setFilter("AR")}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1 ${
                filter === "AR"
                  ? "bg-red-600 text-white"
                  : "bg-black/50 text-red-200/60 hover:bg-red-900/30"
              }`}
            >
              🇦🇷 AR
            </button>
          </div>
        </div>

        {/* Contenido del tab activo */}
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          {activeTab === "agrupaciones" ? (
            <div className="text-red-200/60 text-sm">
              <p className="mb-4">Explorá las comparsas y agrupaciones de candombe.</p>
              <p className="text-xs italic">Iniciá sesión para ver más detalles y crear tu propia agrupación.</p>
            </div>
          ) : (
            <div className="text-red-200/60 text-sm">
              <p className="mb-4">Descubrí los próximos eventos de candombe.</p>
              <p className="text-xs italic">Iniciá sesión para ver el mapa completo y marcar "Voy a ir".</p>
            </div>
          )}
        </div>

        {/* Footer con botones */}
        <div className="p-6 border-t border-red-900/50 space-y-3">
          <Button
            asChild
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold rounded-lg"
          >
            <a href={GOOGLE_URL}>
              Ingresar / Registro
            </a>
          </Button>
          <a
            href="/admin"
            className="block text-center text-sm text-red-200/60 hover:text-red-300 transition-colors"
          >
            Acceso Admin
          </a>
        </div>
      </aside>

      {/* Área principal - mapa o contenido */}
      <main className="flex-1 relative z-10 flex items-center justify-center">
        {/* Texto central con efectos */}
        <div className="text-center space-y-6 z-20 relative">
          <motion.h2
            className="text-5xl sm:text-6xl font-black text-red-700 drop-shadow-lg tracking-widest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Tambora
          </motion.h2>
          <motion.p
            className="text-xl sm:text-2xl font-semibold text-white/90 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Almas de ayer y hoy haciendo chas chas bajo las estrellas
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="mt-4 px-10 py-6 bg-red-700 hover:bg-red-900 text-xl font-bold rounded-full shadow-lg animate-pulse-glow"
            >
              <a href={GOOGLE_URL}>
                Entrar con Google &middot; <span className="font-light">Reconocer mi alma</span>
              </a>
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
