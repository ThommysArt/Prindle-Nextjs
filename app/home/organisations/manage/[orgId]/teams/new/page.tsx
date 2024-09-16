import React from 'react'
import { NewTeamForm } from '@/app/home/organisations/_components/new-team-form'
import { BackButton } from '@/components/back-button'

export default function NewTeamPage({params}: {params: {orgId: string}}) {
  return (
    <div className='flex flex-col h-screen'>
      {/* Top status bar */}
      <div className="sticky top-0 z-40 bg-background w-full h-14 border-b">
        <div className="flex items-center gap-4 h-full px-6">
          <BackButton />
          <h1 className="text-2xl font-bold">New Team</h1>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="flex justify-center items-start w-full h-full overflow-y-auto py-8 px-6">
          <NewTeamForm orgId={params.orgId}/>
        </div>
      </div>
    </div>
  )
}