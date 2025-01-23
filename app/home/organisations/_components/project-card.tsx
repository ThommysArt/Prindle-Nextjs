"use client"

import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Project } from '@prisma/client'
import { Component2Icon } from '@radix-ui/react-icons'
import { FolderGit2 } from 'lucide-react'

export const Projectcard = ({project} : {project: Project}) => {
    const router = useRouter()
  return (
    <Card key={project.orgId} onClick={()=>{router.push(`/home/projects/manage/${project.projectId}`)}}>
        <CardHeader>
          <div className="grid grid-cols-6">
            <FolderGit2 className="h-8 w-8" />
            <div className="col-span-5 flex flex-col gap-2">
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
    </Card>
  )
}
