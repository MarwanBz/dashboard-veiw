'use client'

import { Flag, Globe, Mail, MapPin, Phone, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CustomModal } from "../components/ui/CustomModal"
import EducationForm from "./EducationForm"
import ExperienceForm from "../components/ExperienceForm"
import Image from "next/image"
import PersonalInfoForm from "../components/PersonalInfoForm"
import SkillsForm from "../components/SkillsForm"
import { useState } from "react"

interface InfoSectionProps {
  title: string
  description: string
  iconSrc: string
  formType: 'personal' | 'education' | 'skills' | 'experience'
}

interface PersonalInfo {
  nationality: string;
  dateOfBirth: string;
  gender: string;
  email: string;
  mobileNumber: string;
  region: string;
  city: string;
}

interface Experience {
  startDate: string;
  endDate: string;
  company: string;
  division: string;
  description: string;
}

interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
}

export default function InfoSection({
  title,
  description,
  iconSrc,
  formType,
}: InfoSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [savedSkills, setSavedSkills] = useState<string[]>([])
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
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleSaveChanges = (skills: string[], available: string[]) => {
    setSavedSkills(skills)
    setAvailableSkills(available)
    setIsModalOpen(false)
  }

  const handleSavePersonalInfo = (info: PersonalInfo) => {
    setPersonalInfo(info)
    setIsModalOpen(false)
  }

  const handleSaveExperience = (experience: Experience) => {
    setExperiences([...experiences, experience])
    setIsModalOpen(false)
  }

  const handleSaveEducation = (education: Education[]) => {
    setEducation(education)
    setIsModalOpen(false)
  }

  const renderForm = () => {
    switch (formType) {
      case 'skills':
        return <SkillsForm savedSkills={savedSkills} availableSkills={availableSkills} onSave={handleSaveChanges} />
      case 'personal':
        return <PersonalInfoForm onClose={() => setIsModalOpen(false)} onSave={handleSavePersonalInfo} />
      case 'experience':
        return <ExperienceForm onSave={handleSaveExperience} initialExperiences={experiences} />
      case 'education':
        return <EducationForm onSave={handleSaveEducation} initialEducation={education} />
      default:
        return null
    }
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
        {formType === "skills" && savedSkills.length > 0 ? (
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
        ) : formType === "personal" && personalInfo ? (
          <div className="space-y-4 p-4">
            <div className="rounded-xl bg-white shadow-sm border p-4">
              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#0A0F51] font-medium">
                    <Flag className="w-4 h-4" />
                    <span>Nationality</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {personalInfo.nationality}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#0A0F51] font-medium">
                    {/* <Calendar className="w-4 h-4" /> */}
                    <span>Date of birth</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {personalInfo.dateOfBirth}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#0A0F51] font-medium">
                    <User className="w-4 h-4" />
                    <span>Gender</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {personalInfo.gender}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white shadow-sm border p-4">
              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#0A0F51] font-medium">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {personalInfo.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#0A0F51] font-medium">
                    <Phone className="w-4 h-4" />
                    <span>Mobile number</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {personalInfo.mobileNumber}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white shadow-sm border p-4">
              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-1">
                  <div className="flex items-center  gap-2 text-[#0A0F51] font-medium">
                    <Globe className="w-4 h-4" />
                    <span className="">Region</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {personalInfo.region}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#0A0F51] font-medium">
                    <MapPin className="w-4 h-4" />
                    <span>City</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {personalInfo.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : formType === "experience" && experiences.length > 0 ? (
          <div className="space-y-6">
            {experiences.map((experience, index) => (
              <div key={index} className="relative pl-6">
                <div className="absolute left-0 top-1.5 w-3 h-3 bg-[#0066FF] rounded-full" />
                <div className="space-y-1">
                  <h3 className="font-medium text-base">
                    {experience.startDate} to {experience.endDate}
                  </h3>
                  <div className="text-sm font-medium text-[#0A0F51]">
                    {experience.company}, {experience.division}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {experience.description}
                  </p>
                </div>
              </div>
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

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        width="sm:max-w-[600px]"
      >
        {renderForm()}
      </CustomModal>
    </div>
  );
}