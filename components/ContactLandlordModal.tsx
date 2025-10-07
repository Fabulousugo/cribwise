"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type ContactLandlordModalProps = {
  propertyTitle: string
  landlordName: string
  landlordPhone: string
}

export function ContactLandlordModal({ 
  propertyTitle, 
  landlordName,
  landlordPhone 
}: ContactLandlordModalProps) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // For now, just show success message
    // Later we'll actually send this to the landlord
    console.log("Contact form submitted:", formData)
    setSubmitted(true)
    
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false)
      setOpen(false)
      setFormData({ name: "", email: "", phone: "", message: "" })
    }, 3000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full">
          Contact Landlord
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {landlordName}</DialogTitle>
          <DialogDescription>
            Interested in {propertyTitle}? Send a message to the landlord.
          </DialogDescription>
        </DialogHeader>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Name</label>
              <Input 
                required
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input 
                required
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Phone Number</label>
              <Input 
                required
                type="tel"
                placeholder="080XXXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Message</label>
              <Textarea 
                required
                placeholder="I'm interested in viewing this property..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg text-sm">
              <p className="font-medium text-blue-900 mb-1">Landlord Contact:</p>
              <p className="text-blue-700">{landlordPhone}</p>
            </div>
            
            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        ) : (
          <div className="py-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
            <p className="text-slate-600">
              The landlord will contact you soon via email or phone.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}