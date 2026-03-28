import React from 'react'
import AnimatedCounter from './AnimatedCounter'

type Stat = {
  label: string
  value: number
  suffix?: string
  helper: string
}

const statsData: Stat[] = [
  { label: 'EST.', value: 18, suffix: 'XX', helper: 'Years of district scouting history' },
  { label: 'Groups', value: 50, suffix: '+', helper: 'Active groups across the district' },
  { label: 'Scouts', value: 2000, suffix: '+', helper: 'Young people in the movement' },
  { label: 'District Camps', value: 12, helper: 'Signature camps and large gatherings' },
]

export default function StatsSection(){
  return (
    <section className="relative overflow-hidden bg-[var(--tone-sand)] px-4 py-16 text-[var(--tone-forest)]">
      <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.85)_0%,rgba(255,255,255,0)_72%)]" />
      <div className="absolute left-[-120px] top-10 h-72 w-72 rounded-full bg-[rgba(106,126,84,0.18)] blur-3xl" />
      <div className="absolute bottom-0 right-[-120px] h-80 w-80 rounded-full bg-[rgba(193,169,109,0.18)] blur-3xl" />

      <div className="relative mx-auto max-w-[1360px]">
        <div className="mb-8 max-w-[680px]">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--tone-muted)]">District Metrics</p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight text-[var(--tone-heading)] md:text-5xl">
            Built on service, growth, and steady district pride
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {statsData.map((stat) => (
            <article
              key={stat.label}
              className="rounded-[28px] border border-[rgba(255,255,255,0.55)] bg-[rgba(255,249,239,0.72)] p-6 shadow-[0_18px_45px_rgba(33,49,33,0.12)] backdrop-blur-xl"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--tone-muted)]">{stat.label}</div>
              <div className="mt-4 text-5xl font-light tracking-tight text-[var(--tone-heading)] md:text-6xl">
                <AnimatedCounter target={stat.value} duration={2200} className="inline-block" />
                {stat.suffix ? <span className="ml-1 align-super text-2xl text-[var(--tone-olive)] md:text-3xl">{stat.suffix}</span> : null}
              </div>
              <p className="mt-4 max-w-[24ch] text-sm leading-6 text-[var(--tone-muted)]">{stat.helper}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
