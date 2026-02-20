import React from 'react'
import { getNews, getEvents, getUnits } from '../lib/api'
import ScoutCard from '../components/ScoutCard'

export default function Home(){
  const [news, setNews] = React.useState<any[]>([])
  const [events, setEvents] = React.useState<any[]>([])
  const [units, setUnits] = React.useState<any[]>([])

  React.useEffect(()=>{ getNews().then(setNews); getEvents().then(setEvents); getUnits().then(setUnits) }, [])

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="rounded-lg overflow-hidden p-8 text-white" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.08), transparent)' }}>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Kilinochchi District Scouts</h1>
            <p className="mt-4 text-lg muted">Celebrating growth, service, and character across our units. Discover events, news, and scout achievements.</p>
            <div className="mt-6 flex gap-3">
              <a href="/units" className="px-4 py-2 rounded bg-white text-green-800 font-semibold shadow hover:scale-[1.02] transition" role="button">View Units</a>
              <a href="/events" className="px-4 py-2 rounded border border-white text-white hover:bg-white/10 transition" role="button">Upcoming Events</a>
            </div>
          </div>

          <div className="slide-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 card-surface rounded shadow-sm">
                <div className="text-sm muted">Active Units</div>
                <div className="text-2xl font-bold">{units.length}</div>
              </div>
              <div className="p-4 card-surface rounded shadow-sm">
                <div className="text-sm muted">Upcoming Events</div>
                <div className="text-2xl font-bold">{events.length}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest news & events */}
      <section className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Latest News</h2>
          <div className="space-y-4">
            {news.map(n => (
              <article key={n.id} className="p-4 card-surface rounded shadow-sm fade-in">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{n.title}</h3>
                  <div className="text-sm muted">{n.date}</div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside>
          <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {events.map(e => (
              <div key={e.id} className="p-3 card-surface rounded shadow-sm slide-up">
                <div className="font-semibold">{e.title}</div>
                <div className="text-sm muted">{e.start_date} — {e.end_date}</div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      {/* Spotlight: sample unit */}
      <section className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Featured Unit</h2>
        <div className="p-4 card-surface rounded shadow-sm">
          {units[0] ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <div className="md:col-span-2">
                <h3 className="font-bold text-xl">{units[0].name}</h3>
                <p className="muted">{units[0].type}</p>
                <div className="mt-4 space-y-2">
                  {(units[0].scouts || []).slice(0,4).map((s:any)=> (
                    <ScoutCard key={s.scout_id} name={s.display_name} unit={units[0].name} rank={s.rank} photo={s.profile_photo_url} />
                  ))}
                </div>
              </div>
              <div className="p-4">
                <a href="/units" className="px-4 py-2 rounded bg-[color:var(--primary)] text-white">View all units</a>
              </div>
            </div>
          ) : (
            <div className="muted">No unit data available.</div>
          )}
        </div>
      </section>

      <div className="container mx-auto text-center py-8 muted">
        <small>Public site — for admin access contact the district office.</small>
      </div>
    </div>
  )
}
