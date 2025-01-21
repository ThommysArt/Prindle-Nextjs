import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma'
import { auth } from '@/auth'

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { title, content } = await request.json()
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const newNote = await prisma.note.create({
      data: {
        title,
        content,
        ownerId: user.id,
      },
    })

    return NextResponse.json(newNote)
  } catch (error) {
    console.error('Error creating note:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}