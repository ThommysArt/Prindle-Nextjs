import React from 'react'
import { NewOrgForm } from './_components/new-org-form'
import { BackButton } from '@/components/back-button'

const NewOrgPage = () => {
  return (
    <div className='flex flex-col h-screen'>
      {/* Top status bar */}
      <div className="flex w-full h-14">
        <div className="fixed top-5 z-50 flex items-center gap-4 w-full border-b py-2 px-6">
            <BackButton />
          <h1 className="text-2xl font-bold">New Organsiation</h1>
        </div>
      </div>

        <div className="flex justify-center items-center w-full h-full py-8 px-6">
            <NewOrgForm />
        </div>
    </div>
  )
}

export default NewOrgPage