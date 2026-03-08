import React from 'react'
import { getNews } from '../lib/api'

export default function Home(){
  const [news, setNews] = React.useState<any[]>([])

  React.useEffect(()=>{ getNews().then(setNews) }, [])

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-[var(--primary)] text-white" style={{ minHeight: '320px' }}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `url('https://picsum.photos/seed/forest/1920/1080')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blend-mode(multiply) blur(2px)' }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)] via-[var(--primary)]/90 to-transparent"></div>
        
        <div className="container mx-auto px-6 py-16 relative z-10 flex flex-col justify-center h-full">
          <div className="max-w-3xl fade-in pt-8">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">Kilinochchi District Scout Branch</h1>
            <p className="text-xl md:text-2xl text-white/90 font-serif leading-relaxed max-w-2xl text-shadow-sm">Building Tomorrow's Leaders Through Service,<br/>Adventure & Brotherhood</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center slide-up max-w-4xl mx-auto border-b pb-8">
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-[#cc9d5e] mb-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
            <div className="text-3xl font-bold text-[var(--primary)] font-serif">196</div>
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Active Scouts</div>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-[#cc9d5e] mb-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2l1.6 4.9h5.1l-4.1 3 1.6 4.9L10 11.8l-4.2 3 1.6-4.9-4.1-3h5.1L10 2z" clipRule="evenodd" /></svg>
            <div className="text-3xl font-bold text-[var(--primary)] font-serif">342</div>
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Badges Awarded</div>
          </div>
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-[#cc9d5e] mb-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
            <div className="text-3xl font-bold text-[var(--primary)] font-serif">35</div>
            <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Events Organized</div>
          </div>
        </div>
      </section>

      {/* Latest News & Events */}
      <section className="container mx-auto px-4 py-8 mb-16">
        <h2 className="text-center text-3xl font-bold font-serif text-gray-900 mb-8">Latest News & Events</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
          {news.map((item, i) => (
            <article key={item.id} className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 slide-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-[#cceda8]/50 text-[#285e2b] px-3 py-1 rounded-full text-xs font-bold">{item.tag || 'News'}</span>
                <span className="text-xs text-gray-500 font-semibold">{item.date}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.excerpt || item.body || ''}</p>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="/news" className="inline-flex items-center justify-center gap-2 bg-[#adeba2] text-[#1f5c22] hover:bg-[#9de092] transition px-6 py-2 rounded-full font-bold shadow-sm">
            view all
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </div>
      </section>
    </div>
  )
}
