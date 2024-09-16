"use client"

import React from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Organisation } from '@prisma/client'

export const OrgCard = ({org} : {org: Organisation}) => {
    const router = useRouter()
  return (
    <Card key={org.orgId} onClick={()=>{router.push(`/home//organisations/manage/${org.orgId}`)}}>
        <CardHeader>
            <CardTitle>{org.name}</CardTitle>
        </CardHeader>
    </Card>
  )
}
