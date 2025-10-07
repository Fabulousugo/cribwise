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

type ScheduleViewingModalProps = {
  propertyTitle: string
}

export function ScheduleViewingModal({ propertyTitle }: ScheduleViewingModalProps) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Viewing scheduled:", formData)
    setSubmitted(true)
    
    setTimeout(() => {
      setSubmitted(false)
      setOpen(false)
      setFormData({ name: "", email: "", phone: "", date: "", time: "" })
    }, 3000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Schedule Viewing
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Schedule a Viewing</DialogTitle>
          <DialogDescription>
            Request a viewing appointment for {propertyTitle}
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
              <label className="text-sm font-medium mb-2 block">Phone</label>
              <Input 
                required
                type="tel"
                placeholder="080XXXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Preferred Date</label>
                <Input 
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Preferred Time</label>
                <Input 
                  required
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>
            
            <Button type="submit" className="w-full">
              Request Viewing
            </Button>
          </form>
        ) : (
          <div className="py-8 text-center">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold mb-2">Viewing Requested!</h3>
            <p className="text-slate-600">
              The landlord will confirm your viewing appointment soon.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}