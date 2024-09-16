import { auth } from '@/auth'
import { prisma } from '@/prisma/prisma'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusIcon } from '@radix-ui/react-icons'

const OrganisationsPage = async () => {
    const session = await auth()
    const orgs = await prisma.organisationUser.findMany({
        where: { userId: session?.user?.id },
        include: { org: true },
    })
  return (
    <div className='flex flex-col'>
      {/* Top status bar */}
      <div className="flex w-full h-14">
        <div className="fixed top-5 z-50 flex items-center gap-4 w-full border-b py-2 px-6">
          <h1 className="text-2xl font-bold">Organsiations</h1>
        </div>
      </div>

      <div className="my-8 mx-6">
        {/* Project list */}
        <div className="flex flex-col gap-4 w-full">
          {orgs.map((orgUser) => (
            <div key={orgUser.orgUserId} className="flex w-full border-b border-gray-200 px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{orgUser.org.name}</h2>
                </div>
              </div>
            </div>
          ))}
          <Button>
            <Link href="/home/organisations/new" className="flex items-center font-semibold">
              New Organisation<PlusIcon className="ml-2"/>
            </Link>
          </Button>
        </div>
      </div>

    </div>
  )
}

export default OrganisationsPage