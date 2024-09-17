"use client"

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { format, addMonths, subMonths } from 'date-fns'
import { EventList } from './event-list'
import { useEvents } from '@/hooks/use-events'

export function CalendarView() {
  const [date, setDate] = useState<Date>(new Date())
  const { events, isLoading } = useEvents(date)

  const handlePrevMonth = () => setDate(subMonths(date, 1))
  const handleNextMonth = () => setDate(addMonths(date, 1))

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{format(date, 'MMMM yyyy')}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && setDate(newDate)}
            className="rounded-md border shadow"
            modifiers={{
              event: (day) => events.some(event => 
                day >= new Date(event.startDate) && day <= new Date(event.endDate)
              )
            }}
            modifiersStyles={{
              event: { border: '2px solid var(--primary)' }
            }}
          />
          <EventList events={events} isLoading={isLoading} />
        </div>
      </CardContent>
    </Card>
  )
}