"use client"

import { Button } from '@/components/ui/button'
import { Cross2Icon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const CancelSignOutButton = () => {
    const router = useRouter()
  return (
    <Button variant="outline" onClick={()=>router.back()}>
        Cancel <Cross2Icon className='ml-2'/> 
    </Button>
  )
}
