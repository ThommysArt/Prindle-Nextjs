"use client"

import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Team } from '@prisma/client'

export const Teamcard = ({team} : {team: Team}) => {
    const router = useRouter()
  return (
    <Card key={team.orgId} onClick={()=>{router.push(`/home//organisations/manage/${team.orgId}`)}}>
        <CardHeader>
            <CardTitle>{team.name}</CardTitle>
            <CardDescription>{team.description}</CardDescription>
        </CardHeader>
    </Card>
  )
}
