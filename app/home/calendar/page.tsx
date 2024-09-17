import { Suspense } from 'react'
import { CalendarView } from './_components/calendar-view'
import { CalendarSkeleton } from './_components/calendar-skeleton'

export default function CalendarPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 z-40 bg-background w-full h-14 border-b">
        <div className="flex items-center gap-4 h-full px-6">
          <h1 className="text-2xl font-bold">Calendar</h1>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-6">
        <Suspense fallback={<CalendarSkeleton />}>
          <CalendarView />
        </Suspense>
      </div>
    </div>
  )
}