import { Suspense } from 'react'
import { NoteList } from './_components/note-list'
import { NewNoteButton } from './_components/new-note-button'
import { Skeleton } from '@/components/ui/skeleton'

export default function NotesPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Notes</h1>
        <NewNoteButton />
      </div>
      <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
        <NoteList />
      </Suspense>
    </div>
  )
}