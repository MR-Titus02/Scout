import React from 'react'

type JourneyCardProps = {
  title: string
  description: string
  imageUrl: string
  href?: string
}

export default function JourneyCard({ title, description, imageUrl, href }: JourneyCardProps){
  return (
    <article className="group relative min-h-[300px] overflow-hidden rounded-[18px] border border-black/10 bg-[var(--tone-forest)] shadow-[0_12px_30px_rgba(24,33,26,0.2)] transition duration-300 hover:-translate-y-1">
      <div className="absolute inset-0">
        <img src={imageUrl} alt={title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,24,17,0.92)] via-[rgba(13,24,17,0.4)] to-transparent" />
      </div>
      <div className="relative flex h-full flex-col justify-end p-5 text-white">
        <h3 className="text-[1.9rem] font-black uppercase leading-none tracking-tight">{title}</h3>
        <p className="mt-2 max-w-[24ch] text-sm leading-5 text-white/82">{description}</p>
        {href ? (
          <a href={href} className="mt-4 inline-flex items-center gap-2 self-start text-sm font-semibold text-white transition hover:text-[var(--tone-gold-soft)]">
            Learn More
            <span aria-hidden>+</span>
          </a>
        ) : null}
      </div>
    </article>
  )
}
