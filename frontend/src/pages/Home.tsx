import React from 'react'
import JourneyCard from '../components/JourneyCard'
import NewsEventsSection from '../components/NewsEventsSection'
import SectionHeading from '../components/SectionHeading'
import StatsSection from '../components/StatsSection'
import { getEvents, getNews } from '../lib/api'
import type { EventDTO, NewsDTO } from '../lib/contracts'

const journeyData = [
  {
    id: 'singithi',
    title: 'Singithi',
    description: 'Ages 6-8, where curiosity, confidence, and teamwork begin through playful discovery.',
    imageUrl: 'https://picsum.photos/seed/singithi-scout/720/900',
    href: '#singithi',
  },
  {
    id: 'cubs',
    title: 'Cubs',
    description: 'Ages 8-11, growing through badges, outdoor challenges, and meaningful community habits.',
    imageUrl: 'https://picsum.photos/seed/cubs-scout/720/900',
    href: '#cubs',
  },
  {
    id: 'junior',
    title: 'Junior',
    description: 'Ages 11-14, building independence with service projects, fieldcraft, and adventure.',
    imageUrl: 'https://picsum.photos/seed/junior-scout/720/900',
    href: '#junior',
  },
  {
    id: 'senior',
    title: 'Senior',
    description: 'Ages 14-17, preparing young leaders through planning, teamwork, and district participation.',
    imageUrl: 'https://picsum.photos/seed/senior-scout/720/900',
    href: '#senior',
  },
  {
    id: 'rover',
    title: 'Rover',
    description: 'Young adults serving as mentors, volunteers, and role models across local units.',
    imageUrl: 'https://picsum.photos/seed/rover-scout/720/900',
    href: '#rover',
  },
  {
    id: 'adult',
    title: 'Adult Scouts',
    description: 'Dedicated leaders and supporters creating safe, inspiring spaces for every scout.',
    imageUrl: 'https://picsum.photos/seed/adult-scout/720/900',
    href: '#adult',
  },
]

export default function Home(){
  const [news, setNews] = React.useState<NewsDTO[]>([])
  const [events, setEvents] = React.useState<EventDTO[]>([])

  React.useEffect(() => {
    let isMounted = true

    Promise.all([getNews(), getEvents()]).then(([newsItems, eventItems]) => {
      if (!isMounted) {
        return
      }

      setNews(newsItems)
      setEvents(eventItems)
    })

    return () => {
      isMounted = false
    }
  }, [])

  const newsItems = news.slice(0, 8).map((item) => ({
    id: item.id,
    title: item.title,
    date: item.date,
    excerpt: item.excerpt,
    tag: item.tag,
    imageUrl: `https://picsum.photos/seed/${encodeURIComponent(item.id)}/640/840`,
  }))

  const eventItems = events.slice(0, 4).map((item) => ({
    id: item.id,
    title: item.title,
    date: item.start_date,
    excerpt: item.location || 'District-wide scouting event',
    tag: 'Event',
    imageUrl: `https://picsum.photos/seed/${encodeURIComponent(item.id)}/640/840`,
  }))

  const homeFeed = [...eventItems, ...newsItems].slice(0, 6)

  return (
    <main id="main" className="w-full bg-[var(--tone-page)] text-slate-900">
      <section className="relative min-h-[560px] overflow-hidden md:min-h-[700px]">
        <img
          src="https://picsum.photos/seed/scout-hero/1920/1200"
          alt="Scouting outdoor activity"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,29,20,0.24)_0%,rgba(21,29,20,0.36)_34%,rgba(21,29,20,0.76)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1360px] items-center px-4 pb-16 pt-28 md:min-h-[700px] md:justify-end md:pt-36">
          <div className="max-w-[420px] text-center text-white md:text-left">
            <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl">Beyond Boundaries</h1>
            <p className="mt-4 text-sm leading-6 text-white/84 md:text-base">
              Inspiring young people across Kilinochchi through leadership, service, resilience, and outdoor adventure.
            </p>
            <a
              href="#journey"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--tone-paper)] px-6 py-3 text-sm font-bold text-[var(--tone-heading)] shadow-xl transition hover:bg-[var(--tone-sand)]"
            >
              Join the Movement
            </a>
          </div>
        </div>
      </section>

      <section id="journey" className="bg-[var(--tone-paper)] px-4 py-12 md:py-14">
        <div className="mx-auto max-w-[1360px]">
          <div className="mb-8 flex items-center justify-between gap-4">
            <SectionHeading
              title="Our Scouting Journey"
              subtitle="Choose your path from first steps in scouting to adult leadership and service."
            />
            <div className="hidden items-center gap-2 md:flex">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(74,94,63,0.18)] text-[var(--tone-olive)]">&lt;</span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(74,94,63,0.18)] text-[var(--tone-olive)]">&gt;</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-6">
            {journeyData.map((item) => (
              <JourneyCard key={item.id} title={item.title} description={item.description} imageUrl={item.imageUrl} href={item.href} />
            ))}
          </div>
        </div>
      </section>

      <NewsEventsSection items={homeFeed} />

      <StatsSection />
    </main>
  )
}
