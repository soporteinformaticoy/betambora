"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useRef, useEffect } from "react";
import { SearchBox } from "@mapbox/search-js-react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapaPage() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current || !MAPBOX_TOKEN) return;
    mapboxgl.accessToken = MAPBOX_TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-56.167, -34.901], // Montevideo
      zoom: 11,
    });

    // Add zoom/navigation controls
    mapRef.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up map
    return () => mapRef.current?.remove();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="absolute top-4 right-4 z-30 w-[350px] max-w-xs">
        <SearchBox
          accessToken={MAPBOX_TOKEN}
          placeholder="Buscar lugar o dirección"
          map={mapRef.current as any}
          value=""
          theme="dark"
        />
      </div>
      <div
        ref={mapContainer}
        className="w-full h-screen"
        style={{ minHeight: "100vh" }}
      />
    </div>
  );
}