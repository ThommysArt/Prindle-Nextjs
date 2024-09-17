import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { format } from 'date-fns'

type Event = {
  id: string
  title: string
  startDate: Date
  endDate: Date
  type: 'sprint' | 'task'
}

type EventListProps = {
  events: Event[]
  isLoading: boolean
}

export function EventList({ events, isLoading }: EventListProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    )
  }

  return (
    <ScrollArea className="h-[400px] rounded-md border p-4">
      <h3 className="font-semibold mb-4">Events</h3>
      {events.length === 0 ? (
        <p className="text-muted-foreground">No events for this month.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="flex items-center space-x-4">
              <div className={`w-2 h-2 rounded-full ${event.type === 'sprint' ? 'bg-blue-500' : 'bg-green-500'}`} />
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(event.startDate), 'MMM d')} - {format(new Date(event.endDate), 'MMM d')}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </ScrollArea>
  )
}