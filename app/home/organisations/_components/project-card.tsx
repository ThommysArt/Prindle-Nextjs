"use client"

import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Project } from '@prisma/client'

export const Projectcard = ({project} : {project: Project}) => {
    const router = useRouter()
  return (
    <Card key={project.orgId} onClick={()=>{router.push(`/home/projects/manage/${project.projectId}`)}}>
        <CardHeader>
            <CardTitle>{project.name}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
        </CardHeader>
    </Card>
  )
}
