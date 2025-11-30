"use client";

import dynamic from "next/dynamic";

// Importación dinámica para evitar SSR con mapbox-gl y SearchBox
const MapView = dynamic(() => import("@/components/MapView"), { 
  ssr: false 
});

export default function MapaPage() {
  return <MapView />;
}
