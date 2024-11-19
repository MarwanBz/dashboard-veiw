import { Button } from "@/components/ui/button";
import Image from "next/image";
import InfoSection from "../components/ui/info-section";
import ProfileBanner from "../components/ui/profile-banner";

export default function Home() {
  return (
    // <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
    //   <ProfileBanner />
    //   <InfoSection
    //     title="my name is "
    //     description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur tempora odit adipisci error quod, maxime officiis perspiciatis quam est qui."
    //     iconSrc="/assets/img/logo.png"
    //   />
    //   <InfoSection
    //     title="my name is "
    //     description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur tempora odit adipisci error quod, maxime officiis perspiciatis quam est qui."
    //     iconSrc="/assets/img/logo.png"
    //   />
    // </div>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3 p-10">
      {/* Profile Banner (Spanning 3 Columns) */}
      <div className="col-span-1 md:col-span-3">
        <ProfileBanner />
      </div>

      {/* Personal Information (Spanning Full Width on Small Screens, 2 Columns on Larger Screens) */}
      <div className="col-span-1 md:col-span-2">
        <InfoSection
          title="Personal Information"
          description="Add your personal information to maintain a professional profile."
          iconSrc="/assets/img/pers.png"
        />
      </div>

      {/* Skills Section */}
      <div className="col-span-1">
        <InfoSection
          title="Skills"
          description="Highlight your skills to make a strong impression."
          iconSrc="/assets/img/skills.png"
        />
      </div>

      {/* Education Section (Spanning Full Width on Small Screens, 2 Columns on Larger Screens) */}
      <div className="col-span-1 md:col-span-2">
        <InfoSection
          title="Education"
          description="Add your educational background to highlight your academic achievements."
          iconSrc="/assets/img/edu.png"
        />
      </div>

      {/* Experience Section */}
      <div className="col-span-1">
        <InfoSection
          title="Experience"
          description="Present your experience to emphasize your professional background."
          iconSrc="/assets/img/exp.png"
        />
      </div>
    </div>
  );
}
