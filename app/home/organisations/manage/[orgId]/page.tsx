import { prisma } from '@/prisma/prisma'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusIcon } from '@radix-ui/react-icons'
import { BackButton } from '@/components/back-button'
import { Teamcard } from '../../_components/team-card'

const OrgManagement = async ({params}: {params: {orgId: string}}) => {
    const org = await prisma.organisation.findUnique({
        where: {orgId: params.orgId}
    })
    const teams = await prisma.team.findMany({
        where: {orgId: params.orgId}
    })
  return (
    <div className='flex flex-col h-screen'>
      {/* Top status bar */}
      <div className="flex w-full h-14">
        <div className="fixed top-5 z-50 flex items-center gap-4 w-full border-b py-2 px-6">
            <BackButton />
          <h1 className="text-2xl font-bold">{org!.name}</h1>
        </div>
      </div>

      <div className="my-8 mx-6">
        {/* Action buttons */}
        <div className="flex justify-between mb-6">
          <Button asChild>
            <Link href={`/home/organisations/manage/${params.orgId}/teams/new`} className="flex items-center font-semibold">
              New Team<PlusIcon className="ml-2"/>
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/home/organisations/manage/${params.orgId}/add-users`} className="flex items-center font-semibold">
              Add Users<PlusIcon className="ml-2"/>
            </Link>
          </Button>
        </div>

        {/* Team list */}
        <div className="flex flex-col gap-4 w-full mt-10 mb-24">
          {teams.map((team) => (
            <Teamcard key={team.teamId} team={team} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrgManagement