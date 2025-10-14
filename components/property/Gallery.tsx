"use client"

import Image from "next/image"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"

export default function Gallery({
  images,
  title,
  badges,
}: {
  images: string[]
  title: string
  badges: { available: boolean; verified: boolean; type: string }
}) {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <div>
      <div className="relative h-[460px] bg-muted">
        <Image
          key={activeIdx}
          src={images[activeIdx]}
          alt={`${title} image ${activeIdx + 1}`}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 66vw, 100vw"
          priority
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {badges.available ? (
            <Badge className="bg-emerald-600 text-white">Available</Badge>
          ) : (
            <Badge className="bg-rose-600 text-white">Not Available</Badge>
          )}
          {badges.verified && <Badge className="bg-green-600 text-white">✓ Verified</Badge>}
          <Badge className="bg-slate-900/80 text-white">{badges.type}</Badge>
        </div>
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2 p-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`relative h-20 rounded overflow-hidden border ${
                activeIdx === idx ? "border-slate-900" : "border-transparent"
              } focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900`}
              aria-label={`View image ${idx + 1}`}
              type="button"
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" sizes="20vw" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}