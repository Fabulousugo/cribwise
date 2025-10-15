// components/property/Map.tsx
"use client"

import { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"

type Props = {
  lat: number
  lng: number
  title: string
  address?: string
  radiusMeters?: number
  theme?: "light" | "dark" | "auto"
  zoom?: number
}

export default function Map(props: Props) {
  const {
    lat,
    lng,
    title,
    address,
    radiusMeters = 300,
    theme = "auto",
    zoom = 16,
  } = props

  // Guard: if coords missing, show a friendly placeholder
  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng)
  if (!hasCoords) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[Map] Missing lat/lng", { lat, lng })
    }
    return (
      <div className="h-64 md:h-80 w-full rounded-md bg-slate-200 grid place-items-center text-slate-600 text-sm">
        Map unavailable — no coordinates for this listing.
      </div>
    )
  }

  const [RL, setRL] = useState<null | typeof import("react-leaflet")>(null)
  const [L, setL] = useState<any>(null)
  const [isDark, setIsDark] = useState(false)

  // Load react-leaflet + leaflet only in the browser
  useEffect(() => {
    let mounted = true
    const prefersDark =
      theme === "auto"
        ? typeof window !== "undefined" &&
          window.matchMedia?.("(prefers-color-scheme: dark)").matches
        : theme === "dark"
    setIsDark(prefersDark)

    Promise.all([import("react-leaflet"), import("leaflet")]).then(([rl, leaflet]) => {
      if (!mounted) return
      setRL(rl)
      setL(leaflet.default)
    })

    return () => {
      mounted = false
    }
  }, [theme])

  // Add this temporarily to your Map component
    useEffect(() => {
    console.log('🗺️ Map Debug:', {
        lat,
        lng,
        title,
        address,
        coordinates: `${lat}, ${lng}`,
        googleMapsLink: `https://www.google.com/maps?q=${lat},${lng}`
    })
    }, [lat, lng])

  // Placeholder while libs load
  if (!RL || !L) {
    return (
      <div className="relative">
        <div className="h-64 md:h-80 w-full rounded-md bg-slate-200" />
        <div className="absolute inset-0 grid place-items-center text-slate-600 text-sm">
          Loading map…
        </div>
      </div>
    )
  }

  const { MapContainer, TileLayer, Marker, Popup, Circle } = RL
  const center: [number, number] = [lat, lng]

  const tile = isDark
    ? {
        url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        attribution:
          '&copy; OpenStreetMap contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      }
    : {
        url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        attribution:
          '&copy; OpenStreetMap contributors, Tiles style by <a href="https://www.hotosm.org/">Humanitarian OpenStreetMap Team</a>',
      }

  const homeIcon = new L.DivIcon({
    className: "",
    html:
      '<div style="font-size:28px; line-height:1; filter: drop-shadow(0 1px 2px rgba(0,0,0,.4));">🏠</div>',
    iconSize: [28, 28],
    iconAnchor: [14, 22],
    popupAnchor: [0, -18],
  })

  const gq = encodeURIComponent(`${lat},${lng}`)
  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${gq}`
  const gmapsDir = `https://www.google.com/maps/dir/?api=1&destination=${gq}`
  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(title)}&ll=${lat},${lng}`
   const bingMapsUrl = `https://www.bing.com/maps?q=${gq}`

  return (
    <div className="relative rounded-md overflow-hidden">
      <div className="pointer-events-none absolute right-3 top-3 z-[500] flex gap-2">
        <a
          href={gmapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto rounded-lg bg-background px-3 py-1.5 text-xs font-medium shadow hover:bg-background"
        >
          Open in Google Maps
        </a>
        <a
          href={appleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto rounded-lg bg-background px-3 py-1.5 text-xs font-medium shadow hover:bg-background"
        >
          Apple Maps
        </a>
        <a
          href={gmapsDir}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto rounded-lg bg-background px-3 py-1.5 text-xs font-medium shadow hover:bg-background"
        >
          Directions
        </a>
      </div>

      <MapContainer
        center={center}
        zoom={zoom}
        className="h-64 md:h-80 w-full"
        scrollWheelZoom={false}
        zoomControl={true}
      >
        <TileLayer attribution={tile.attribution} url={tile.url} />
        {radiusMeters > 0 && (
          <Circle
            center={center}
            radius={radiusMeters}
            pathOptions={{
              color: isDark ? "#7dd3fc" : "#0ea5e9",
              weight: 2,
              opacity: 0.9,
              fillOpacity: 0.08,
            }}
          />
        )}
        <Marker position={center} icon={homeIcon}>
          <Popup>
            <div className="text-sm">
              <p className="font-medium">{title}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
