"use client"

import { cn } from '@/lib/utils'
import { CalendarIcon, EnvelopeClosedIcon, GearIcon, HomeIcon, PersonIcon } from '@radix-ui/react-icons'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export const Navbar = () => {
    const pathname = usePathname()
    const router = useRouter()
  return (
    <nav className='flex flex-row justify-between items-center px-3'>
        <div className={cn("flex flex-col gap-1 text-sm hover:text-primary items-center justify-center", pathname.includes("/home/dashboard") ? "text-primary":"text-muted-foreground")}
            onClick={()=>router.push("/home/projects")}
        >
            <HomeIcon className="w-6 h-6" />
            Projects
        </div>
        <div className={cn("flex flex-col gap-1 text-sm hover:text-primary items-center justify-center", pathname.includes("/home/calendar") ? "text-primary":"text-muted-foreground")}
            onClick={()=>router.push("/home/calendar")}
        >
            <CalendarIcon className="w-6 h-6" />
            Calendar
        </div>
        <div className={cn("flex flex-col gap-1 text-sm hover:text-primary items-center justify-center", pathname.includes("/home/emails") ? "text-primary":"text-muted-foreground")}
            onClick={()=>router.push("/home/emails")}
        >
            <EnvelopeClosedIcon className="w-6 h-6" />
            Emails
        </div>
        <div className={cn("flex flex-col gap-1 text-sm hover:text-primary items-center justify-center", pathname.includes("/home/organisations") ? "text-primary":"text-muted-foreground")}
            onClick={()=>router.push("/home/organisations")}
        >
            <PersonIcon className="w-6 h-6" />
            Orgs
        </div>
        <div className={cn("flex flex-col gap-1 text-sm hover:text-primary items-center justify-center", pathname.includes("/home/settings") ? "text-primary":"text-muted-foreground")}
            onClick={()=>router.push("/home/settings")}
        >
            <GearIcon className="w-6 h-6" />
            Settings
        </div>
    </nav>
  )
}
