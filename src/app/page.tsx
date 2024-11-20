import { Button } from "@/components/ui/button";
import Image from "next/image";
import InfoSection from "../components/info-section";
import ProfileBanner from "../components/profile-banner";

export default function Home() {
  return (
    <div className="container grid grid-cols-1 gap-6 md:grid-cols-3 p-10">
      <div className="col-span-1 md:col-span-3">
        <ProfileBanner />
      </div>

      <div className="container col-span-1 md:col-span-2">
        <InfoSection
          title="Personal Information"
          description="Add your personal information to maintain a professional profile."
          iconSrc="/assets/img/pers.png"
          formType="personal"
        />
      </div>

      <div className="col-span-1">
        <InfoSection
          title="Skills"
          description="Highlight your skills to make a strong impression."
          iconSrc="/assets/img/skills.png"
          formType="skills"
        />
      </div>

      <div className="col-span-1 md:col-span-2">
        <InfoSection
          title="Education"
          description="Add your educational background to highlight your academic achievements."
          iconSrc="/assets/img/edu.png"
          formType="education"
        />
      </div>

      <div className="col-span-1">
        <InfoSection
          title="Experience"
          description="Present your experience to emphasize your professional background."
          iconSrc="/assets/img/exp.png"
          formType="experience"
        />
      </div>
    </div>
  );
}
