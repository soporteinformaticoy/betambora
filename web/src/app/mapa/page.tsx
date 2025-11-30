"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useRef, useEffect } from "react";
import { SearchBox } from "@mapbox/search-js-react";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapaVivo() {
  return (
    <div className="text-white text-center pt-20 text-3xl font-black">
      MAPA VIVO - CHAS CHAS LATIENDO
    </div>
  );
}