import { prisma } from '@/prisma/prisma'
import { NoteEditor } from './_components/note-editor'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'

export default async function NotePage({ params }: { params: { noteId: string } }) {
  const session = await auth()
  if (!session?.user?.email) {
    return <div>Please sign in to view this note.</div>
  }

  const note = await prisma.note.findUnique({
    where: { 
      id: params.noteId,
    },
  })
  
  if (!note) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <NoteEditor note={note} />
    </div>
  )
}