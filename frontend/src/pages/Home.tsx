import React from 'react'
import JourneyCard from '../components/JourneyCard'
import NewsEventsSection from '../components/NewsEventsSection'
import SectionHeading from '../components/SectionHeading'
import StatsSection from '../components/StatsSection'
import { getEvents, getNews } from '../lib/api'
import type { EventDTO, NewsDTO } from '../lib/contracts'
import heroImage from '../assets/Hero_image.png'
import heroImageMobile from '../assets/Hero_image_mobile.png'
import adultLeaderImage from '../assets/Adult_leader.png'
import cubScoutImage from '../assets/Cub_scout.png'
import juniorScoutImage from '../assets/Junior_Scout.png'
import roverScoutImage from '../assets/Rover_Scout.png'
import seniorScoutImage from '../assets/Senior_Scout.png'
import singithiScoutImage from '../assets/Singithi_Scout.png'

const journeyData = [
  {
    id: 'singithi',
    title: 'Singithi',
    ageCategory: '6-8',
    imageUrl: singithiScoutImage,
    href: '#singithi',
  },
  {
    id: 'cubs',
    title: 'Cubs',
    ageCategory: '8-11',
    imageUrl: cubScoutImage,
    href: '#cubs',
  },
  {
    id: 'junior',
    title: 'Junior',
    ageCategory: '11-14',
    imageUrl: juniorScoutImage,
    href: '#junior',
  },
  {
    id: 'senior',
    title: 'Senior',
    ageCategory: '14-17',
    imageUrl: seniorScoutImage,
    href: '#senior',
  },
  {
    id: 'rover',
    title: 'Rover',
    ageCategory: '17-26',
    imageUrl: roverScoutImage,
    href: '#rover',
  },
  {
    id: 'adult',
    title: 'Adult Scouts',
    imageUrl: adultLeaderImage,
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
        <picture>
          <source media="(max-width: 767px)" srcSet={heroImageMobile} />
          <img
            src={heroImage}
            alt="Scouting outdoor activity"
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
        </picture>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,29,20,0.24)_0%,rgba(21,29,20,0.36)_34%,rgba(21,29,20,0.76)_100%)]" />
        <div className="relative z-10 mx-auto flex min-h-[560px] max-w-[1360px] items-start px-4 pb-16 pt-[90px] md:min-h-[700px] md:items-center md:justify-end md:pt-36">
          <div className="max-w-[420px] text-center text-white md:text-left">
            <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl">Beyond Boundaries</h1>
            <a
              href="#journey"
              className="mt-5 inline-flex items-center justify-center rounded-full border border-white/25 bg-[rgba(244,239,227,0.12)] px-6 py-3 text-sm font-bold text-white shadow-xl backdrop-blur-2xl transition-all duration-300 hover:border-[var(--tone-paper)] hover:bg-[var(--tone-paper)] hover:text-[var(--tone-heading)]"
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
              <JourneyCard key={item.id} title={item.title} ageCategory={item.ageCategory} imageUrl={item.imageUrl} href={item.href} />
            ))}
          </div>
        </div>
      </section>

      <NewsEventsSection items={homeFeed} />

      <StatsSection />
    </main>
  )
}
