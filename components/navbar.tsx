"use client"

import { cn } from '@/lib/utils'
import { CalendarIcon, EnvelopeClosedIcon, GearIcon, HomeIcon, Pencil2Icon, PersonIcon } from '@radix-ui/react-icons'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'

export const Navbar = () => {
    const pathname = usePathname()
    const router = useRouter()

    const sections = [
        {title: "Projects", icon: HomeIcon, path: "/home/projects"},
        {title: "Calendar", icon: CalendarIcon, path: "/home/calendar"},
        // {title: "Emails", icon: EnvelopeClosedIcon, path: "/home/emails"},
        {title: "Notes", icon: Pencil2Icon, path: "/home/notes"},
        {title: "Orgs", icon: PersonIcon, path: "/home/organisations"},
        {title: "Settings", icon: GearIcon, path: "/home/settings"},
    ]
  return (
    <nav className="flex w-full justify-center ">
        <div className="fixed bottom-5 flex z-50 border rounded-full mx-3 w-fit h-16 bg-muted/20 items-center justify-center backdrop-blur-sm">
            {sections.map((section, idx) => (
                <Button
                    key={idx}
                    onClick={() => router.push(section.path)}
                    variant={pathname.includes(section.path) ? 'default' : 'ghost'}
                    size="icon"
                    className="rounded-full w-full h-full p-4"
                    >
                    <section.icon className="w-8 h-8" />
                </Button>
            ))}
        </div>
    </nav>
  )
}
