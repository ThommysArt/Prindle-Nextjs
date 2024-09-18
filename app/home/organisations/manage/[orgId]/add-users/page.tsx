import { prisma } from '@/prisma/prisma'
import { BackButton } from '@/components/back-button'
import { AddUserForm } from './_components/add-user-form'
import { UserList } from './_components/user-list'

const AddUsersPage = async ({ params }: { params: { orgId: string } }) => {
  const org = await prisma.organisation.findUnique({
    where: { orgId: params.orgId }
  })

  if (!org) {
    return <div>Organization not found</div>
  }

  return (
    <div className='flex flex-col h-screen'>
      {/* Top status bar */}
      <div className="flex w-full h-14">
        <div className="fixed top-5 z-50 flex items-center gap-4 w-full border-b py-2 px-6">
          <BackButton />
          <h1 className="text-2xl font-bold">Add Users to {org.name}</h1>
        </div>
      </div>

      <div className="my-8 mx-6 space-y-8 mt-10 mb-24">
        <AddUserForm orgId={params.orgId} />
        <UserList orgId={params.orgId} />
      </div>
    </div>
  )
}

export default AddUsersPage