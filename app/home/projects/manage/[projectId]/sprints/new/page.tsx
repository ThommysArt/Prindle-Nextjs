import { NewSprintForm } from "@/app/home/projects/_components/new-sprint-form"
import { auth } from "@/auth"
import { BackButton } from "@/components/back-button"
import { prisma } from "@/prisma/prisma"

export default async function CreateSprintPage({ params }: { params: { projectId: string } }) {
  const session = await auth()

  const UserOrgs = await prisma.organisationUser.findMany({
    where: {
        userId: session!.user!.id!
    }
  })
  const teams = await prisma.team.findMany()
  UserOrgs.map(Userorg => {
      teams.filter(team=>{
          return team.orgId === Userorg.orgId
      })
  })


  return (
    <div className='flex flex-col h-screen'>
      <div className="sticky top-0 z-40 bg-background w-full h-14 border-b">
        <div className="flex items-center gap-4 h-full px-6">
          <BackButton />
          <h1 className="text-2xl font-bold">Create Sprint</h1>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <NewSprintForm projectId={params.projectId} teams={teams} />
      </div>
    </div>
  )
}