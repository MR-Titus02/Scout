import React from 'react'

type JourneyCardProps = {
  title: string
  ageCategory?: string
  imageUrl: string
  href?: string
}

export default function JourneyCard({ title, ageCategory, imageUrl, href }: JourneyCardProps){
  return (
    <article className="group relative aspect-square overflow-hidden rounded-[18px] border border-black/10 bg-[var(--tone-forest)] shadow-[0_12px_30px_rgba(24,33,26,0.2)] transition duration-300 hover:-translate-y-1">
      <div className="absolute inset-0">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,24,17,0.92)] via-[rgba(13,24,17,0.4)] to-transparent" />
      </div>
      <div className="relative flex h-full flex-col justify-end p-5 text-white">
        <div className="mt-auto">
          <h3 className="mb-3 text-[1.55rem] font-black uppercase leading-none tracking-tight">{title}</h3>
        </div>
        <div className="flex items-end justify-between gap-3 text-sm">
          {href ? (
            <a href={href} className="inline-flex items-center font-semibold text-white transition hover:text-[var(--tone-gold-soft)]">
              Learn More
            </a>
          ) : <span />}
          {ageCategory ? (
            <span className="rounded-full border border-white/20 bg-black/20 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-white/80">
              {ageCategory}
            </span>
          ) : <span />}
        </div>
      </div>
    </article>
  )
}
