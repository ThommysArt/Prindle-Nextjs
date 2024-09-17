import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const start = searchParams.get('start')
  const end = searchParams.get('end')

  if (!start || !end) {
    return NextResponse.json({ error: 'Start and end dates are required' }, { status: 400 })
  }

  const startDate = new Date(start)
  const endDate = new Date(end)

  try {
    const [sprints, tasks] = await Promise.all([
      prisma.sprint.findMany({
        where: {
          OR: [
            { startDate: { gte: startDate, lte: endDate } },
            { endDate: { gte: startDate, lte: endDate } },
          ],
        },
        select: {
          sprintId: true,
          title: true,
          startDate: true,
          endDate: true,
        },
      }),
      prisma.sprintTask.findMany({
        where: {
          OR: [
            { startDate: { gte: startDate, lte: endDate } },
            { endDate: { gte: startDate, lte: endDate } },
          ],
        },
        select: {
          sprintTaskId: true,
          title: true,
          startDate: true,
          endDate: true,
        },
      }),
    ])

    const events = [
      ...sprints.map(sprint => ({
        id: sprint.sprintId,
        title: sprint.title,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        type: 'sprint' as const,
      })),
      ...tasks.map(task => ({
        id: task.sprintTaskId,
        title: task.title,
        startDate: task.startDate,
        endDate: task.endDate,
        type: 'task' as const,
      })),
    ]

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}