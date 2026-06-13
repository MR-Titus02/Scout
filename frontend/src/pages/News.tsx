import React, { useState, useEffect, useMemo } from 'react'
import { getNews, getEvents } from '../lib/api'

type FeedType = 'news' | 'event'

export interface FeedItem {
  id: string
  type: FeedType
  title: string
  date: string
  excerpt: string
  imageUrl: string
}

export default function News() {
  const [items, setItems] = useState<FeedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | FeedType>('all')

  useEffect(() => {
    async function fetchData() {
      try {
        const [newsData, eventsData] = await Promise.all([getNews(), getEvents()])
        
        const mappedNews: FeedItem[] = newsData.map(n => ({
          id: `news-${n.id}`,
          type: 'news',
          title: n.title,
          date: n.date,
          excerpt: n.excerpt || n.body?.substring(0, 100) + '...' || 'Read more about this news article...',
          imageUrl: `https://picsum.photos/seed/news${n.id}/800/600`
        }))

        const mappedEvents: FeedItem[] = eventsData.map(e => ({
          id: `event-${e.id}`,
          type: 'event',
          title: e.title,
          date: e.start_date, // use start date for chronological sorting
          excerpt: e.location ? `Location: ${e.location}` : 'Join us for this upcoming district event!',
          imageUrl: `https://picsum.photos/seed/event${e.id}/800/600`
        }))

        const combined = [...mappedNews, ...mappedEvents].sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
        
        setItems(combined)
      } catch (err) {
        console.error('Failed to load news and events', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter = filterType === 'all' || item.type === filterType
      return matchesSearch && matchesFilter
    })
  }, [items, searchQuery, filterType])

  return (
    <main className="w-full bg-[var(--tone-page)] text-slate-900 pb-24 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#0A1A12] px-4 py-20 text-center md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(48,94,99,0.3)_0%,transparent_70%)]" />
        <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--tone-gold)] to-transparent opacity-30" />
        
        <div className="relative z-10 mx-auto max-w-[800px] pt-12">
          <h1 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl mb-6">
            District Hub
          </h1>
          <p className="text-lg text-white/70 font-medium leading-relaxed mb-10 max-w-2xl mx-auto">
            Stay up to date with the latest stories, announcements, and upcoming events from across the Kilinochchi District.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by title, keyword, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--tone-gold)] transition-all shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>
      </section>

      {/* Filter and Grid Section */}
      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-[1360px]">
          
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {(['all', 'news', 'event'] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                  filterType === type 
                    ? 'bg-[var(--tone-olive)] text-white shadow-md' 
                    : 'bg-white text-[var(--tone-muted)] hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {type === 'all' ? 'All Updates' : type === 'news' ? 'News' : 'Events'}
              </button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 border-4 border-[var(--tone-olive)] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredItems.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-[var(--tone-heading)] mb-2">No results found</h3>
              <p className="text-[var(--tone-muted)]">We couldn't find anything matching "{searchQuery}" in {filterType === 'all' ? 'any category' : filterType}.</p>
              <button 
                onClick={() => {setSearchQuery(''); setFilterType('all')}}
                className="mt-6 inline-flex items-center px-6 py-2 rounded-full border border-[var(--tone-olive)] text-[var(--tone-olive)] font-bold hover:bg-[var(--tone-olive)] hover:text-white transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <article key={item.id} className="group flex flex-col bg-white rounded-[24px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100 transition-all duration-500 hover:shadow-[0_12px_40px_rgba(15,76,35,0.1)] hover:-translate-y-1 cursor-pointer">
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white shadow-md backdrop-blur-md ${
                      item.type === 'news' ? 'bg-[var(--tone-olive)]/90 border border-white/20' : 'bg-[var(--tone-gold)] text-[var(--tone-forest)] border border-[var(--tone-forest)]/10'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col flex-grow p-6 md:p-8">
                  <span className="text-sm font-semibold text-[var(--tone-muted)] mb-3 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {item.date}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-[var(--tone-heading)] mb-4 leading-tight group-hover:text-[var(--tone-olive)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[var(--tone-muted)] leading-relaxed line-clamp-3 mb-6">
                    {item.excerpt}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <span className="inline-flex items-center text-sm font-bold text-[var(--tone-olive)] group-hover:translate-x-1 transition-transform">
                      {item.type === 'news' ? 'Read Article' : 'Event Details'} 
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
