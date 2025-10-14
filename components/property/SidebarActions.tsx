"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ContactLandlordModal } from "@/components/ContactLandlordModal"
import { ScheduleViewingModal } from "@/components/ScheduleViewingModal"

const NGN = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 })

type Landlord = { name: string; phone: string; verified?: boolean }

export default function SidebarActions({
  priceYear,
  available,
  landlord,
  propertyTitle,
}: {
  priceYear: number
  available: boolean
  landlord: Landlord
  propertyTitle: string
}) {
  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <div className="text-3xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
          {NGN.format(priceYear)}<span className="text-lg text-slate-500">/year</span>
        </div>
        <p className="text-xs text-slate-500 mb-6">Billed annually. Utilities may be separate.</p>

        {available ? (
          <div className="space-y-3">
            <ContactLandlordModal
              propertyTitle={propertyTitle}
              landlordName={landlord.name}
              landlordPhone={landlord.phone}
            />
            <ScheduleViewingModal propertyTitle={propertyTitle} />
            <Button variant="outline" asChild className="w-full">
              <a href={`tel:${landlord.phone}`} aria-label="Call landlord">Call Landlord</a>
            </Button>
          </div>
        ) : (
          <Button className="w-full" disabled>
            Not Available
          </Button>
        )}

        <div className="mt-6 pt-6 border-t">
          <h3 className="font-semibold mb-3">Landlord Information</h3>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between"><span className="text-slate-600">Name:</span><span className="font-medium">{landlord.name}</span></p>
            <p className="flex justify-between"><span className="text-slate-600">Phone:</span><span className="font-medium">{landlord.phone}</span></p>
            {typeof landlord.verified !== "undefined" && (
              <p className="flex justify-between items-center"><span className="text-slate-600">Verified:</span><span className={landlord.verified ? "text-green-600" : "text-slate-400"}>{landlord.verified ? "✓ Yes" : "Pending"}</span></p>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h3 className="font-semibold mb-3">Safety Features</h3>
          <div className="space-y-2 text-sm text-slate-600">
            <p>✓ Identity verified</p>
            <p>✓ Property inspected</p>
            <p>✓ Secure payment</p>
            <p>✓ Deposit protection</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}