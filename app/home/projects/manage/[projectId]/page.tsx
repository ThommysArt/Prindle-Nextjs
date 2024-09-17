import { prisma } from '@/prisma/prisma'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PlusIcon } from '@radix-ui/react-icons'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { format } from 'date-fns'
import { BackButton } from '@/components/back-button'
import { DeleteSprintModal } from '../../_components/delete-sprint-modal'

const ProjectPage = async ({ params }: { params: { projectId: string } }) => {
  const sprints = await prisma.sprint.findMany({
    where: {
      projectId: params.projectId
    },
    include: {
      sprintTasks: true
    },
    orderBy: {
      startDate: 'asc'
    }
  })

  return (
    <div className='flex flex-col h-screen'>
      {/* Top status bar */}
      <div className="sticky top-0 z-40 bg-background w-full h-14 border-b">
        <div className="flex items-center gap-4 h-full px-6">
            <BackButton />
          <h1 className="text-2xl font-bold">Sprints</h1>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-6">
          {sprints.map((sprint) => (
            <Card key={sprint.sprintId}>
              <CardHeader>
                <CardTitle>{sprint.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{sprint.description}</p>
                <p className="text-sm mb-4">
                  {format(new Date(sprint.startDate), 'PPP')} - {format(new Date(sprint.endDate), 'PPP')}
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sprint.sprintTasks.map((task) => (
                      <TableRow key={task.sprintTaskId}>
                        <TableCell>{task.title}</TableCell>
                        <TableCell>{task.description}</TableCell>
                        <TableCell>{format(new Date(task.startDate), 'PP')}</TableCell>
                        <TableCell>{format(new Date(task.endDate), 'PP')}</TableCell>
                        <TableCell>{task.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex gap-4">
                <Button>
                  <Link href={`/home/projects/manage/${params.projectId}/sprints/${sprint.sprintId}`} className="flex items-center font-semibold">
                    Edit
                  </Link>
                </Button>
                <DeleteSprintModal sprintId={sprint.sprintId} sprintTitle={sprint.title} />
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-6">
          <Button asChild>
            <Link href={`/home/projects/manage/${params.projectId}/sprints/new`} className="flex items-center font-semibold">
              New Sprint<PlusIcon className="ml-2"/>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ProjectPage