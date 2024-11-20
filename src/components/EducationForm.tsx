'use client'

import * as React from 'react'

import { CalendarIcon, Plus, Trash2 } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useFieldArray, useForm } from "react-hook-form"

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { format } from 'date-fns'

interface Education {
  school: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  grade: string
}

interface EducationFormProps {
  onClose?: () => void
  onSave: (data: Education[]) => void
  initialEducation?: Education[]
}

export default function EducationForm({ onClose, onSave, initialEducation = [] }: EducationFormProps) {
  const { register, control, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      education: initialEducation.length > 0 ? initialEducation : [{
        school: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        grade: ""
      }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education"
  })

  const onSubmit = (data: { education: Education[] }) => {
    onSave(data.education)
    if (onClose) onClose()
  }

  const DatePicker = ({
    index,
    fieldName,
    label,
  }: {
    index: number
    fieldName: "startDate" | "endDate"
    label: string
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              value={watch(`education.${index}.${fieldName}`)}
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
                setValue(`education.${index}.${fieldName}`, format(date, "MMM yyyy"))
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )

  return (
    <div className="w-full max-w-[600px]">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Education</h2>
          <p className="text-sm text-muted-foreground">Add your education information</p>
        </div>

        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Education {index + 1}</h3>
              {index > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => remove(index)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">School</Label>
                  <Input
                    {...register(`education.${index}.school`)}
                    placeholder="Ex, University"
                    className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Degree</Label>
                  <Input
                    {...register(`education.${index}.degree`)}
                    placeholder="Ex, Bachelor"
                    className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Field of study</Label>
                <Input
                  {...register(`education.${index}.fieldOfStudy`)}
                  placeholder="Ex, Software Engineering"
                  className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <DatePicker index={index} fieldName="startDate" label="Start Date" />
                <DatePicker index={index} fieldName="endDate" label="End Date" />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Grade</Label>
                <Input
                  {...register(`education.${index}.grade`)}
                  placeholder="Ex, 3.8 GPA"
                  className="bg-[#F8F9FC] border-0 focus-visible:ring-1 focus-visible:ring-blue-500"
                />
              </div>
            </div>
            {index < fields.length - 1 && <Separator className="my-6" />}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed"
          onClick={() => append({
            school: "",
            degree: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: "",
            grade: ""
          })}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Another Education
        </Button>

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