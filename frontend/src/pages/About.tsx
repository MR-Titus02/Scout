import React from 'react'
import SectionHeading from '../components/SectionHeading'

type Leader = {
  id: string
  name: string
  role: string
  imageUrl: string
  bio?: string
}

const executiveLeaders: Leader[] = [
  { id: 'pres', name: 'Jane Smith', role: 'President', imageUrl: 'https://i.pravatar.cc/400?img=5' },
  { id: 'dc', name: 'John Doe', role: 'District Commissioner', imageUrl: 'https://i.pravatar.cc/400?img=11' },
  { id: 'ddc', name: 'Robert Brown', role: 'Deputy District Commissioner', imageUrl: 'https://i.pravatar.cc/400?img=12' },
  { id: 'sec', name: 'Emily Davis', role: 'District Secretary', imageUrl: 'https://i.pravatar.cc/400?img=47' },
  { id: 'treas', name: 'Michael Wilson', role: 'District Treasurer', imageUrl: 'https://i.pravatar.cc/400?img=33' },
]

const assistantCommissioners: Leader[] = [
  { id: 'adc1', name: 'David Lee', role: 'ADC - Administration', imageUrl: 'https://i.pravatar.cc/400?img=53' },
  { id: 'adc2', name: 'Sarah Connor', role: 'ADC - Programme', imageUrl: 'https://i.pravatar.cc/400?img=44' },
  { id: 'adc3', name: 'James Taylor', role: 'ADC - Training', imageUrl: 'https://i.pravatar.cc/400?img=60' },
  { id: 'adc4', name: 'Emma White', role: 'ADC - Cub Scouts', imageUrl: 'https://i.pravatar.cc/400?img=32' },
  { id: 'adc5', name: 'William Harris', role: 'ADC - Junior Scouts', imageUrl: 'https://i.pravatar.cc/400?img=68' },
  { id: 'adc6', name: 'Olivia Martin', role: 'ADC - Senior/Rover Scouts', imageUrl: 'https://i.pravatar.cc/400?img=35' },
  { id: 'adc7', name: 'Daniel Clark', role: 'ADC - PR & Media', imageUrl: 'https://i.pravatar.cc/400?img=13' },
  { id: 'adc8', name: 'Sophia Lewis', role: 'ADC - Quartermaster', imageUrl: 'https://i.pravatar.cc/400?img=20' },
  { id: 'adc9', name: 'Matthew Walker', role: 'ADC - Special Events', imageUrl: 'https://i.pravatar.cc/400?img=15' },
  { id: 'adc10', name: 'Isabella Hall', role: 'ADC - Community Dev', imageUrl: 'https://i.pravatar.cc/400?img=10' },
  { id: 'adc11', name: 'Joseph Allen', role: 'ADC - IT & Digital', imageUrl: 'https://i.pravatar.cc/400?img=51' },
]

function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <article className="group relative overflow-hidden rounded-[20px] bg-white shadow-md transition-all duration-500 hover:shadow-2xl">
      <div className="aspect-[3/4] overflow-hidden w-full relative">
        <img
          src={leader.imageUrl}
          alt={leader.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A12] via-[#0A1A12]/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100 group-hover:via-[#0A1A12]/50" />
        
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <div className="transform transition-transform duration-500 group-hover:-translate-y-[90px]">
            <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{leader.name}</h3>
            <p className="text-[11px] font-bold text-[var(--tone-gold-soft)] uppercase tracking-widest drop-shadow-md">{leader.role}</p>
          </div>
          
          <div className="absolute bottom-6 left-6 right-6 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <p className="text-sm text-white/90 leading-relaxed pt-3 border-t border-white/20 line-clamp-3">
              {leader.bio || 'Volunteering to support, guide, and mentor the youth of our district.'}
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function About() {
  return (
    <main className="w-full bg-[var(--tone-page)] text-slate-900 pb-24">
      {/* Hero Section */}
      <section className="relative bg-white px-4 py-20 text-center md:py-28 overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,76,35,0.03)_0%,transparent_70%)]" />
        <div className="relative z-10 mx-auto max-w-[900px] pt-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(15,76,35,0.08)] text-[var(--tone-olive)] text-sm font-bold tracking-widest uppercase mb-6">
            Our District Team
          </span>
          <h1 className="text-4xl font-black uppercase tracking-tight text-[var(--tone-heading)] md:text-6xl mb-6">
            Volunteer Leadership
          </h1>
          <p className="text-lg text-[var(--tone-muted)] font-medium leading-relaxed max-w-3xl mx-auto">
            The Kilinochchi District Scout Association is proudly guided by a dedicated team of volunteers. We are parents, community members, and lifelong scouts committed to preparing young people with skills for life.
          </p>
        </div>
      </section>

      {/* The Scout Promise / Values Anchor */}
      <section className="px-4 -mt-10 relative z-20 mb-20">
        <div className="mx-auto max-w-[1000px] bg-[var(--tone-olive)] text-white rounded-3xl p-8 md:p-12 shadow-[0_20px_50px_rgba(15,76,35,0.2)] flex flex-col md:flex-row items-center gap-8 justify-between">
          <div className="max-w-xl text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--tone-gold-soft)]">Servant Leadership</h2>
            <p className="text-white/90 leading-relaxed text-lg italic">
              "The most worthwhile thing is to try to put happiness into the lives of others." 
              <span className="block mt-3 text-sm not-italic font-bold tracking-wider uppercase opacity-80">— Robert Baden-Powell</span>
            </p>
          </div>
          <div className="flex-shrink-0 mt-4 md:mt-0">
            <a href="#join" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-bold text-[var(--tone-olive)] shadow-md transition hover:bg-[var(--tone-paper)] hover:shadow-lg">
              Volunteer With Us
            </a>
          </div>
        </div>
      </section>

      {/* District Executive Committee Section */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-[1360px]">
          <div className="mb-12 flex flex-col items-center text-center">
            <SectionHeading
              title="District Executive Committee"
              subtitle="Guiding the administrative and operational vision of the district."
            />
          </div>
          
          {/* Executive Committee Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-24">
            {executiveLeaders.map((leader) => (
              <LeaderCard key={leader.id} leader={leader} />
            ))}
          </div>

          <div className="mb-12 flex flex-col items-center text-center mt-12 border-t border-[rgba(15,76,35,0.1)] pt-20">
            <SectionHeading
              title="Assistant District Commissioners"
              subtitle="The dedicated program leaders supporting our diverse scouting sections and initiatives."
            />
          </div>

          {/* ADCs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {assistantCommissioners.map((leader) => (
              <LeaderCard key={leader.id} leader={leader} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
