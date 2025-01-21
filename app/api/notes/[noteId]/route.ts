import { NextResponse } from 'next/server'
import { prisma } from '@/prisma/prisma'
import { auth } from '@/auth'

export async function PUT(request: Request, { params }: { params: { noteId: string } }) {
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

    const updatedNote = await prisma.note.update({
      where: {
        id: params.noteId,
      },
      data: {
        title,
        content,
      },
    })

    return NextResponse.json(updatedNote)
  } catch (error) {
    console.error('Error updating note:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { noteId: string } }) {
  const session = await auth()
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: session.user.email } })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const updatedNote = await prisma.note.delete({
      where: {
        id: params.noteId,
      },
    })

    return NextResponse.json(updatedNote)
  } catch (error) {
    console.error('Error deleting note:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}