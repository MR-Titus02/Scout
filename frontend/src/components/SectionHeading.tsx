import React from 'react'

type SectionHeadingProps = {
  title: string
  subtitle?: string
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps){
  return (
    <div className="text-center md:text-left">
      <h2 className="text-[2rem] font-black uppercase tracking-tight text-[var(--tone-heading)] md:text-[2.4rem]">{title}</h2>
      {subtitle ? <p className="mt-2 text-sm text-[var(--tone-muted)]">{subtitle}</p> : null}
    </div>
  )
}
