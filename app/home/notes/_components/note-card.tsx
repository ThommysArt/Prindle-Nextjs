import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type NoteCardProps = {
  note: {
    id: string
    title: string
    content: string
    updatedAt: Date
  }
}

export function NoteCard({ note }: NoteCardProps) {
  return (
    <Link href={`/home/notes/${note.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {note.content.slice(0, 100)}...
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Last updated: {note.updatedAt.toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}