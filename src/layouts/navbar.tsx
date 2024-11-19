import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import React from "react";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-30 pt-2">
      <nav className="w-[98%] mx-auto">
        <div className="flex flex-col  bg-white px-6 rounded-xl ">
          <div className="flex h-16 items-center justify-between border-b">
            <div className="flex flex-1 items-center">
              <Input className="max-w-md" placeholder="Search" type="search" />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Image
                src="/assets/img/pic.png"
                alt="Profile"
                className="rounded-full"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div className="mt-2 py-4">
            <h1 className="text-left">Profile</h1>
          </div>
        </div>
      </nav>
    </header>
  );
}
