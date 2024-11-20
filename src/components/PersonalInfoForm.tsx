'use client'

import { Flag, Globe, Mail, MapPin, Phone, User } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function PersonalInfoForm({ onClose }: { onClose?: () => void } = {}) {
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(undefined)

  return (
    <div className="w-full max-w-[600px]">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <p className="text-sm text-muted-foreground">Add your personal information</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Flag className="w-4 h-4" />
                Nationality
              </label>
              <Input 
                placeholder="Ex, Saudi" 
                className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date of birth
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Input 
                    placeholder="Select date" 
                    value={dateOfBirth ? dateOfBirth.toLocaleDateString() : ""}
                    readOnly
                    className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500 cursor-pointer"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar 
                    selected={dateOfBirth}
                    onSelect={setDateOfBirth}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              Gender
            </label>
            <Input 
              placeholder="Ex, Male" 
              className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Globe className="w-4 h-4" />
                Region
              </label>
              <Input 
                placeholder="Ex, Riyadh" 
                className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                City
              </label>
              <Input 
                placeholder="Ex, Riyadh" 
                className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Mobile number
              </label>
              <Input 
                placeholder="Ex, 049837" 
                type="tel"
                className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <Input 
                placeholder="Ex, aa@gmail.com" 
                type="email"
                className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <Button 
          className="w-full bg-[#0066FF] hover:bg-blue-600 text-white font-medium py-6 rounded-lg"
          onClick={onClose}
        >
          Save
        </Button>
      </div>
    </div>
  )
} 