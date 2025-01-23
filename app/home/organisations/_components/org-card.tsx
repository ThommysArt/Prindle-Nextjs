"use client"

import React from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Organisation } from '@prisma/client'
import { Users } from 'lucide-react'

export const OrgCard = ({org} : {org: Organisation}) => {
    const router = useRouter()
  return (
    <Card key={org.orgId} onClick={()=>{router.push(`/home//organisations/manage/${org.orgId}`)}} className='p-6'>
        <div className="grid grid-cols-6 gap-2 items-center">
            <Users className="h-8 w-8" />
            <p className="col-span-5 text-lg font-semibold">{org.name}</p>
        </div>
    </Card>
  )
}
