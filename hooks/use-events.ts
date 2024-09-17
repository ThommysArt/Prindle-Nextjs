import { useState, useEffect } from 'react'
import { startOfMonth, endOfMonth } from 'date-fns'

type Event = {
  id: string
  title: string
  startDate: Date
  endDate: Date
  type: 'sprint' | 'task'
}

export function useEvents(date: Date) {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      setIsLoading(true)
      try {
        const start = startOfMonth(date)
        const end = endOfMonth(date)
        const response = await fetch(`/api/events?start=${start.toISOString()}&end=${end.toISOString()}`)
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        const data = await response.json()
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [date])

  return { events, isLoading }
}