import { ChevronRight, Home, LayoutDashboard, LogOut, Settings, User } from 'lucide-react'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SideBar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
        <div className="flex h-16 items-center border-b px-6">
          <Image
            src="/assets/img/logo.png"
            alt="HRAKH Logo"
            className="rounded-full"
            width={40}
            height={40}
          />
          <span className="ml-3 text-xl font-bold">HRAKH</span>
        </div>
        <nav className="space-y-1 p-4">
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-5 text-gray-500 hover:bg-gray-100"
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-5 text-primary hover:bg-gray-100"
          >
            <User className="h-5 w-5" />
            Profile
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-5 text-gray-500 hover:bg-gray-100"
          >
            <LayoutDashboard className="h-5 w-5" />
            Task
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-5 text-gray-500 hover:bg-gray-100"
          >
            <Settings className="h-5 w-5" />
            Setting
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-5 text-gray-500 hover:bg-gray-100"
          >
            <Settings className="h-5 w-5" />
            Development
          </Link>
        </nav>
        <div className="absolute bottom-4 w-full px-4">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <span className='h-8 w-8 flex justify-center items-center bg-[#0A0F51] rounded-full'>
            <LogOut className=" text-white  " />
            </span>
            
            Logout
          </Button>
        </div>
      </aside>
  )
}
