"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Importación dinámica de SearchBox para evitar SSR
const SearchBox = dynamic(
  () => import("@mapbox/search-js-react").then((mod) => mod.SearchBox),
  { ssr: false }
);

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

// SVG tambor rojo para marcadores
const drumSVG = encodeURIComponent(
  `<svg viewBox="0 0 36 36" width="34" height="34" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="18" cy="30" rx="13" ry="3.5" fill="#ba181b" stroke="#fff" stroke-width="2"/><ellipse cx="18" cy="10" rx="16" ry="7" fill="#dc2626" stroke="#fff" stroke-width="2"/><ellipse cx="18" cy="10" rx="14" ry="5.5" fill="#c50000"/><ellipse cx="18" cy="10" rx="13" ry="4.5" fill="#7c1414" opacity="0.3"/></svg>`
);

type Evento = {
  _id: string;
  titulo: string;
  agrupaciones?: Array<{ nombre: string }>;
  fecha?: string;
  direccion?: string;
  ubicacion?: {
    coordinates: [number, number]; // [lng, lat]
  };
  goingCount?: number;
  iAmGoing?: boolean;
};

export default function MapView() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [popup, setPopup] = useState<Evento | null>(null);
  const [userPos, setUserPos] = useState<[number, number]>([-56.167, -34.901]); // Montevideo default

  // User info (demo - reemplazar con datos reales del token)
  const [usuario] = useState({
    nombre: "Usuario Tambora",
    cuerda: "Candonga Africana",
    foto: "https://ui-avatars.com/api/?name=Usuario+Tambora&background=b91c1c&color=fff",
    esAdmin: false
  });

  // Geolocalización
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setUserPos([coords.longitude, coords.latitude]);
        },
        () => {},
        { enableHighAccuracy: true, timeout: 7000 }
      );
    }
  }, []);

  // Inicializar mapa
  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: userPos,
      zoom: 13
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Esperar a que el mapa esté completamente cargado
    map.on("load", () => {
      // Marcador de posición del usuario
      new mapboxgl.Marker({ color: "#fff" })
        .setLngLat(userPos)
        .setPopup(new mapboxgl.Popup().setText("¡Estás acá!"))
        .addTo(map);
    });

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [MAPBOX_TOKEN, userPos]);

  // Mover mapa cuando cambia userPos
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.flyTo({ center: userPos, zoom: 14 });
    }
  }, [userPos]);

  // Cargar eventos del backend
  useEffect(() => {
    const token = localStorage.getItem("tamboraToken") || localStorage.getItem("token");
    
    fetch(`${BACKEND_URL}/api/events`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
      .then((res) => res.json())
      .then((data) => {
        const eventosFormateados = (Array.isArray(data) ? data : []).map((e: any) => ({
          _id: e._id,
          titulo: e.titulo,
          agrupaciones: e.agrupaciones || [],
          fecha: e.fecha,
          direccion: e.direccion || "Dirección no informada",
          ubicacion: e.ubicacion,
          goingCount: e.goingCount || 0,
          iAmGoing: e.iAmGoing || false
        }));
        setEventos(eventosFormateados);
      })
      .catch((err) => console.error("Error cargando eventos:", err));
  }, []);

  // Función para agregar marcadores
  const agregarMarcadores = () => {
    if (!mapRef.current) return;

    // Limpiar marcadores anteriores
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    eventos.forEach((ev) => {
      if (!ev.ubicacion?.coordinates || !mapRef.current) return;

      const [lng, lat] = ev.ubicacion.coordinates;

      const el = document.createElement("div");
      el.className = "tambora-drum-marker";
      el.innerHTML = `<img src="data:image/svg+xml,${drumSVG}" width="36" height="36" alt="Tambora"/>`;
      el.style.cursor = "pointer";
      el.onclick = () => setPopup(ev);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .addTo(mapRef.current!);

      markersRef.current.push(marker);
    });
  };

  // Renderizar marcadores
  useEffect(() => {
    if (!mapRef.current || eventos.length === 0) return;

    // Verificar que el mapa esté cargado usando el evento 'load'
    const map = mapRef.current;
    
    if (map.isStyleLoaded()) {
      // El mapa ya está cargado, agregar marcadores directamente
      agregarMarcadores();
    } else {
      // Esperar a que el mapa esté listo
      map.once("load", () => {
        agregarMarcadores();
      });
    }
  }, [eventos]);

  // Handler toggle "Voy"
  const handleVoy = (ev: Evento) => {
    const token = localStorage.getItem("tamboraToken") || localStorage.getItem("token");
    
    fetch(`${BACKEND_URL}/api/events/${ev._id}/going`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: "include"
    })
      .then(() => {
        setEventos((evs) =>
          evs.map((e) =>
            e._id === ev._id
              ? {
                  ...e,
                  iAmGoing: !e.iAmGoing,
                  goingCount: e.iAmGoing ? (e.goingCount || 0) - 1 : (e.goingCount || 0) + 1
                }
              : e
          )
        );
        setPopup((p) =>
          p && p._id === ev._id
            ? {
                ...p,
                iAmGoing: !p.iAmGoing,
                goingCount: p.iAmGoing ? (p.goingCount || 0) - 1 : (p.goingCount || 0) + 1
              }
            : p
        );
      })
      .catch((err) => console.error("Error en toggle voy:", err));
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-30 flex flex-col bg-black/95 border-r-2 border-red-800 min-h-screen w-64 shadow-2xl">
        <div className="flex flex-col gap-6 py-8 px-6">
          {/* Header con logo/título */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-700 flex items-center justify-center text-white font-black text-xl">
              🥁
            </div>
            <h2 className="text-xl font-black text-red-600">Tambora</h2>
          </div>

          {/* Usuario */}
          <div className="flex flex-col items-center gap-3 pb-6 border-b border-red-900/50">
            <img
              className="rounded-full border-4 border-red-950 shadow-xl w-20 h-20 object-cover"
              src={usuario.foto}
              alt="avatar"
            />
            <div className="text-center">
              <p className="font-bold text-red-300 text-lg">{usuario.nombre}</p>
              {usuario.cuerda && (
                <p className="text-sm text-red-100 italic mt-1">{usuario.cuerda}</p>
              )}
            </div>
          </div>

          {/* Botón Panel Admin */}
          {usuario.esAdmin && (
            <a
              className="w-full bg-yellow-400/10 hover:bg-yellow-300/20 text-yellow-300 rounded-lg py-3 px-4 text-sm text-center font-semibold border-2 border-yellow-400 transition-all hover:scale-105"
              href="/admin"
              target="_blank"
            >
              ⚡ Panel Admin
            </a>
          )}

          {/* Stats o info adicional */}
          <div className="mt-auto pt-6 border-t border-red-900/50">
            <p className="text-xs text-red-200/60 text-center">
              {eventos.length} eventos activos
            </p>
          </div>
        </div>
      </aside>

      {/* Searchbar */}
      {MAPBOX_TOKEN && typeof window !== "undefined" && (
        <div className="absolute top-4 left-[17rem] right-4 z-20 max-w-lg">
          <SearchBox
            accessToken={MAPBOX_TOKEN}
            placeholder="Buscar dirección, lugar..."
            map={mapRef.current as any}
          />
        </div>
      )}

      {/* Mapa */}
      <div ref={mapContainer} className="w-full h-screen ml-64" />

      {/* Popup */}
      {popup && (
        <div className="tambora-popup z-50 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-95 text-white rounded-xl p-7 shadow-lg border-2 border-red-800 max-w-md animate-fadein">
          <button
            className="absolute right-3 top-2 text-red-700 text-xl font-bold hover:text-red-500"
            onClick={() => setPopup(null)}
          >
            ×
          </button>
          <div className="flex flex-col items-center gap-2 mb-2">
            <span className="mb-2">
              <img
                src={`data:image/svg+xml,${drumSVG}`}
                width={48}
                height={48}
                alt="drum"
              />
            </span>
            <h2 className="text-2xl font-black text-red-600">{popup.titulo}</h2>
            {popup.agrupaciones && popup.agrupaciones.length > 0 && (
              <span className="text-lg text-white/80">
                {popup.agrupaciones.map((a) => a.nombre).join(", ")}
              </span>
            )}
          </div>
          <div className="text-lg mt-3">
            <span className="block font-bold mb-1 text-white">{popup.direccion}</span>
            {popup.fecha && (
              <span className="block text-red-200 mb-2">
                {new Date(popup.fecha).toLocaleString("es-UY")}
              </span>
            )}
          </div>
          <div className="my-4 text-4xl text-red-600 font-black text-center select-none">
            {popup.goingCount || 0} tamboras yendo 🔥
          </div>
          <div className="flex flex-col gap-3">
            <button
              className={`w-full text-xl font-extrabold py-4 rounded-full shadow transition ${
                popup.iAmGoing
                  ? "bg-red-900 hover:bg-red-800 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              } animate-pulse-glow`}
              onClick={() => handleVoy(popup)}
            >
              {popup.iAmGoing ? "Ya no voy" : "¡Voy a ir!"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

