import React from 'react'
import { BackButton } from '@/components/back-button'
import { NewProjectForm } from './_components/new-project-form'
import { prisma } from '@/prisma/prisma'
import { auth } from '@/auth'
import { Organisation } from '@prisma/client'

export default async function NewTeamPage() {
    const session = await auth()
    const UserOrgs = await prisma.organisationUser.findMany({
        where: {
            userId: session!.user!.id!
        }
    })
    const orgs = await prisma.organisation.findMany()
    UserOrgs.map(Userorg => {
        orgs.filter(org=>{
            return org.orgId === Userorg.orgId
        })
    })
    console.log(orgs)
    
  return (
    <div className='flex flex-col h-screen'>
      {/* Top status bar */}
      <div className="sticky top-0 z-40 bg-background w-full h-14 border-b backdrop-blur-sm">
        <div className="flex items-center gap-4 h-full px-6">
          <BackButton />
          <h1 className="text-2xl font-bold">New Project</h1>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex justify-center items-start w-full h-full overflow-y-auto py-8 px-6">
          <NewProjectForm orgs={orgs}/>
        </div>
      </div>
    </div>
  )
}