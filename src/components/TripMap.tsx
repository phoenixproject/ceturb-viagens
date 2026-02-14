import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface TripMapProps {
  origin: [number, number];
  destination: [number, number];
  originLabel: string;
  destinationLabel: string;
}

const TripMap = ({ origin, destination, originLabel, destinationLabel }: TripMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current).fitBounds([origin, destination], { padding: [40, 40] });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const originIcon = L.divIcon({
      className: "",
      html: `<div style="background:hsl(197,100%,47%);width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    const destIcon = L.divIcon({
      className: "",
      html: `<div style="background:hsl(342,90%,51%);width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>`,
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    L.marker(origin, { icon: originIcon }).addTo(map).bindPopup(originLabel);
    L.marker(destination, { icon: destIcon }).addTo(map).bindPopup(destinationLabel);
    L.polyline([origin, destination], { color: "hsl(197,100%,47%)", weight: 3, dashArray: "8 4" }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [origin, destination, originLabel, destinationLabel]);

  return <div ref={mapRef} className="h-64 w-full rounded-lg border" />;
};

export default TripMap;
