"use client"

import React from 'react'
import { Button } from './ui/button'
import { ChevronLeftIcon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'

export const BackButton = () => {
    const router = useRouter()
  return (
    <Button variant="outline" size="icon" onClick={()=>{router.back()}}>
        <ChevronLeftIcon />
    </Button>
  )
}
