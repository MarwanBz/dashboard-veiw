'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import SkillsForm from "../components/SkillsForm"
import { useState } from "react"

interface InfoSectionProps {
  title: string
  description: string
  iconSrc: string
  formType: 'personal' | 'education' | 'skills' | 'experience'
}

export default function InfoSection({
  title,
  description,
  iconSrc,
  formType,
}: InfoSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [savedSkills, setSavedSkills] = useState<string[]>([])

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleSaveChanges = (skills: string[]) => {
    setSavedSkills(skills)
    setIsModalOpen(false)
  }

  const renderForm = () => {
    if (formType === 'skills') {
      return <SkillsForm savedSkills={savedSkills} onSave={handleSaveChanges} />
    }
    return null
  }

  return (
    <div className="p-4">
      <div className="flex flex-row items-center justify-between mb-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <Button
          variant="outline"
          className="border-[#0A0F51] text-[#0A0F51] font-bold"
          size="sm"
          onClick={handleOpenModal}
        >
          Edit
        </Button>
      </div>
      
      <div className="flex flex-col items-center justify-center text-center border rounded-lg bg-white shadow p-4">
        {savedSkills.length > 0 ? (
          <div className="flex flex-wrap gap-2 justify-center">
            {savedSkills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-3 py-1 rounded-full bg-gray-100 text-gray-700"
              >
                {skill}
              </Badge>
            ))}
          </div>
        ) : (
          <>
            <Image
              src={iconSrc}
              alt={`${title} Icon`}
              width={100}
              height={100}
              className=""
            />
            <p className="text-sm text-gray-500 w-1/2">{description}</p>
          </>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>{title}</DialogTitle>
            <p className="text-sm text-gray-500">Explore and showcase your skills</p>
          </DialogHeader>
          <div className="p-6">
            {renderForm()}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}