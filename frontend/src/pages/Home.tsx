import React from 'react'
import JourneyCard from '../components/JourneyCard'
import JoinModal from '../components/JoinModal'
import NewsEventsSection from '../components/NewsEventsSection'
import ScoutActivitiesSection from '../components/ScoutActivitiesSection'
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

const heroImages = [heroImage, adultLeaderImage, roverScoutImage, ]

export default function Home(){
  const [news, setNews] = React.useState<NewsDTO[]>([])
  const [events, setEvents] = React.useState<EventDTO[]>([])
  const [heroIndex, setHeroIndex] = React.useState(0)
  const [isJoinOpen, setIsJoinOpen] = React.useState(false)

  React.useEffect(() => {
    const id = setInterval(() => setHeroIndex(v => (v + 1) % heroImages.length), 6000)
    return () => clearInterval(id)
  }, [])

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
      <section className="relative h-screen overflow-hidden" style={{ minHeight: '100svh' }}>
        {heroImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Scouting activity"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === heroIndex ? 'opacity-100' : 'opacity-0'}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="relative z-10 mx-auto flex h-full min-h-screen w-full max-w-[1360px] items-end justify-end px-4 pb-24 pt-[120px] md:items-center md:pt-[120px]">
          <div className="max-w-[540px] text-left text-white">
            <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl">Beyond Boundaries</h1>
            <p className="mt-4 text-lg text-white/90 font-medium">Join a community dedicated to leadership, outdoor adventure, and public service. Step forward to explore your potential and serve the district.</p>
            <button
              onClick={() => setIsJoinOpen(true)}
              className="btn-primary mt-8"
            >
              Join the Movement
            </button>
          </div>
        </div>
      </section>

      <JoinModal isOpen={isJoinOpen} onClose={() => setIsJoinOpen(false)} />

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

      {/* <ScoutActivitiesSection /> */}

      <NewsEventsSection items={homeFeed} />

      <StatsSection />
    </main>
  )
}
