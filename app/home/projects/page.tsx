import { Button } from '@/components/ui/button'
import { prisma } from '@/prisma/prisma'
import { PlusIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'
import { Projectcard } from '../organisations/_components/project-card'

const DashboardPage = async () => {
  const projects = await prisma.project.findMany()
  return (
    <div className='flex flex-col'>
      {/* Top status bar */}
      <div className="flex w-full h-14">
        <div className="fixed top-5 z-50 flex items-center gap-4 w-full border-b px-6 py-2">
          <h1 className="text-2xl font-bold">Projects</h1>
        </div>
      </div>

      <div className="my-8 mx-6">
        {/* Project list */}
        <div className="flex flex-col gap-4 w-full">
          {projects.map((project) => (
            <Projectcard project={project} />
          ))}
          <Button>
            <Link href="/home/projects/new" className="flex items-center font-semibold">
              New Project<PlusIcon className="ml-2"/>
            </Link>
          </Button>
        </div>
      </div>

    </div>
  )
}

export default DashboardPage