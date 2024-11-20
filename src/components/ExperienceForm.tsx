'use client'

import * as React from "react"

import { CalendarIcon, Plus, Trash2 } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useFieldArray, useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"

interface Experience {
  startDate: string
  endDate: string
  company: string
  division: string
  description: string
}

interface ExperienceFormProps {
  onClose?: () => void
  onSave: (data: Experience[]) => void
  initialExperiences?: Experience[]
}

export default function ExperienceForm({ onClose, onSave, initialExperience }: ExperienceFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm<Experience>({
    defaultValues: initialExperience || {
      title: "",
      employmentType: "",
      company: "",
      startDate: "",
      endDate: "",
      description: ""
    }
  })

  const onSubmit = (data: Experience) => {
    onSave(data)
    if (onClose) onClose()
  }

  return (
    <div className="w-full max-w-[600px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Experience</h2>
          <p className="text-sm text-muted-foreground">add your experience information</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input 
                {...register("title")}
                placeholder="Ex, Software Engineer" 
                className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label>Employment type</Label>
              <Input 
                {...register("employmentType")}
                placeholder="Ex, Full-time" 
                className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Company or organization</Label>
            <Input 
              {...register("company")}
              placeholder="Ex, Google" 
              className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input 
                      value={watch("startDate")}
                      placeholder="Date" 
                      className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
                      readOnly
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    onSelect={(date) => {
                      if (date) {
                        setValue("startDate", format(date, "MMM yyyy"))
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input 
                      value={watch("endDate")}
                      placeholder="Date" 
                      className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
                      readOnly
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    onSelect={(date) => {
                      if (date) {
                        setValue("endDate", format(date, "MMM yyyy"))
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea 
              {...register("description")}
              placeholder="Describe your role and responsibilities" 
              className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500 min-h-[100px]"
            />
          </div>
        </div>

        <Button 
          type="submit"
          className="w-full bg-[#0066FF] hover:bg-blue-600 text-white font-medium py-6 rounded-lg"
        >
          Save
        </Button>
      </form>
    </div>
  )
}