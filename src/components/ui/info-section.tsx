import { Button } from "@/components/ui/button";
import Image from "next/image";

interface InfoSectionProps {
  title: string;
  description: string;
  iconSrc: string;
}

export default function InfoSection({
  title,
  description,
  iconSrc,
}: InfoSectionProps) {
  return (
    <div className="p-4 ">
      <div className="flex flex-row items-center justify-between mb-4 ">
        <h3 className="text-lg font-bold">{title}</h3>
        <Button
          variant={"outline"}
          className="border-[#0A0F51] text-[#0A0F51] font-bold"
          size="sm"
        >
          Edit
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center text-center border rounded-lg bg-white shadow p-4">
        <Image
          src={iconSrc}
          alt={`${title} Icon`}
          width={100}
          height={100}
          className=""
        />
        <p className="text-sm text-gray-500 w-1/2">{description}</p>
      </div>
    </div>
  );
}
