'use client'

import * as React from "react";

import { Controller, useForm } from "react-hook-form"
import { Flag, Globe, Mail, MapPin, Phone, User } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils";
import { format } from "date-fns"

interface PersonalInfoFormProps {
  onClose?: () => void
}


 function DatePicker() {
  const [date, setDate] = React.useState<Date>();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          autoFocus
          startMonth={new Date(1999, 11)}
          endMonth={new Date(2025, 2)}
        />
      </PopoverContent>
    </Popover>
  );
}

export default function PersonalInfoForm({ onClose }: PersonalInfoFormProps) {
  const { control, handleSubmit } = useForm()

  const onSubmit = (data: any) => {
    console.log("Submitted data:", data)
    if (onClose) onClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[600px] space-y-6">
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
              Date of birth
            </label>
            <Controller
              control={control}
              name="dob"
              render={({  }) => (
                <DatePicker />
              )}
            />
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
        type="submit"
        className="w-full bg-[#0066FF] hover:bg-blue-600 text-white font-medium py-6 rounded-lg"
      >
        Save
      </Button>
    </form>
  )
} 