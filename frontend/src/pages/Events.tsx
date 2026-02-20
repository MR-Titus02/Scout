import React from 'react'
import { getEvents } from '../lib/api'

export default function Events(){
  const [events, setEvents] = React.useState<any[]>([])
  React.useEffect(()=>{ getEvents().then(setEvents) }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Events</h1>
      <ul className="space-y-2">
        {events.map(e => (
          <li key={e.id} className="p-2 border rounded">
            <div className="font-semibold">{e.title}</div>
            <div className="text-sm text-gray-600">{e.start_date} — {e.end_date}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}
