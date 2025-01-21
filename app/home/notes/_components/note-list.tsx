import { prisma } from '@/prisma/prisma'
import { NoteCard } from './note-card'
import { auth } from '@/auth'

export async function NoteList() {
  const session = await auth()
  if (!session?.user?.email) {
    return <div>Please sign in to view your notes.</div>
  }

  const notes = await prisma.note.findMany({
    where: { ownerId: session.user.id },
    orderBy: { updatedAt: 'desc' },
  })

  if (notes.length === 0) {
    return <div>You don't have any notes yet. Create one to get started!</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}