'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { X } from 'lucide-react'
import { useState } from "react"

interface SkillsFormProps {
  savedSkills: string[]
  onSave: (skills: string[]) => void
}

export default function SkillsForm({ savedSkills, onSave }: SkillsFormProps) {
  const [availableSkills, setAvailableSkills] = useState([
    "UI Designer",
    "UX Designer",
    "Product Manager",
    "Developer",
    "Team Lead",
    "Scrum Master",
    "PMO",
    "Team Work",
    "Efficacy",
    "Graphic Designer"
  ])
  const [selectedSkills, setSelectedSkills] = useState<string[]>(savedSkills)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSkillClick = (skill: string) => {
    setAvailableSkills(availableSkills.filter(s => s !== skill))
    setSelectedSkills([...selectedSkills, skill])
  }

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter(s => s !== skill))
    setAvailableSkills([...availableSkills, skill])
  }

  const filteredSkills = availableSkills.filter(skill => 
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Search skills..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />

      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {filteredSkills.map((skill) => (
          <div
            key={skill}
            className="flex items-center justify-between rounded-lg p-3 cursor-pointer hover:bg-gray-50"
            onClick={() => handleSkillClick(skill)}
          >
            <span>{skill}</span>
            <span className="w-6 h-6 flex items-center justify-center rounded-md bg-[#F8F9FC] text-blue-600">
              +
            </span>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      {selectedSkills.length > 0 && (
        <>
          <div className="font-medium text-sm text-gray-500">Selected Skills</div>
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center"
              >
                {skill}
                <X
                  className="ml-2 h-3 w-3 cursor-pointer hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveSkill(skill)
                  }}
                />
              </Badge>
            ))}
          </div>
        </>
      )}

      <Button 
        className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white"
        onClick={() => onSave(selectedSkills)}
      >
        Save Changes
      </Button>
    </div>
  )
} 