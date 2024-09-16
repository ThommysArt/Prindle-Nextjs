import { CalendarIcon, EnvelopeClosedIcon, GearIcon, HomeIcon } from '@radix-ui/react-icons'
import React from 'react'

export const Navbar = () => {
  return (
    <nav className='flex flex-row justify-between items-center'>
        <div className="flex flex-col gap-1">
            <HomeIcon />
            Dashboard
        </div>
        <div className="flex flex-col gap-1">
            <CalendarIcon />
            Calendar
        </div>
        <div className="flex flex-col gap-1">
            <EnvelopeClosedIcon />
            Emails
        </div>
        <div className="flex flex-col gap-1">
            <GearIcon />
            Settings
        </div>
    </nav>
  )
}
