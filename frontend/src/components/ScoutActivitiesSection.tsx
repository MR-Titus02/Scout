import React from 'react'
import SectionHeading from './SectionHeading'

const activities = [
  {
    title: 'Outdoor Camping',
    description: 'Learn survival skills, teamwork, and independence in the heart of nature.',
    imageUrl: 'https://picsum.photos/seed/camping/600/400',
    icon: '⛺'
  },
  {
    title: 'Community Service',
    description: 'Give back to the district through organized volunteer programs and clean-ups.',
    imageUrl: 'https://picsum.photos/seed/service/600/400',
    icon: '🤝'
  },
  {
    title: 'Badge Achievement',
    description: 'Challenge yourself to earn badges across various disciplines and skills.',
    imageUrl: 'https://picsum.photos/seed/badges/600/400',
    icon: '🏅'
  },
  {
    title: 'Leadership Training',
    description: 'Develop essential leadership qualities to guide and inspire others.',
    imageUrl: 'https://picsum.photos/seed/leadership/600/400',
    icon: '⭐'
  }
]

export default function ScoutActivitiesSection() {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-12 flex flex-col items-center text-center">
          <SectionHeading 
            title="Scout Activities" 
            subtitle="Engage in a variety of programs designed to build character, fitness, and active citizenship." 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.map((activity, index) => (
            <article key={index} className="group relative overflow-hidden rounded-[24px] bg-[var(--tone-paper)] shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={activity.imageUrl} 
                  alt={activity.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="p-6 relative">
                <div className="absolute -top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg border border-gray-100 group-hover:-translate-y-2 transition-transform duration-300">
                  {activity.icon}
                </div>
                <h3 className="text-xl font-bold text-[var(--tone-heading)] mb-2 group-hover:text-[var(--tone-olive)] transition-colors">{activity.title}</h3>
                <p className="text-[var(--tone-muted)] text-sm leading-relaxed">{activity.description}</p>
                <button className="mt-4 text-[var(--tone-olive)] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <span>&rarr;</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
