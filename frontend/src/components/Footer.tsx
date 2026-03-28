import React from 'react'
import { Link } from 'react-router-dom'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/units', label: 'Sections' },
  { to: '/news', label: 'News' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer(){
  return (
    <footer className="relative overflow-hidden bg-[var(--tone-deep)] text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[rgba(212,198,152,0.55)] to-transparent" />
      <div className="absolute left-[-120px] top-[-80px] h-64 w-64 rounded-full bg-[rgba(74,94,63,0.4)] blur-3xl" />
      <div className="absolute right-[-80px] bottom-[-120px] h-72 w-72 rounded-full bg-[rgba(193,169,109,0.18)] blur-3xl" />

      <div className="relative mx-auto max-w-[1360px] px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-[620px]">
            <div className="flex items-center gap-4">
              <img
                src="https://picsum.photos/seed/footerlogo/96"
                alt="Kilinochchi Scout logo"
                className="h-16 w-16 rounded-full border border-[var(--tone-gold)] object-cover shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--tone-gold-soft)]">Kilinochchi District</p>
                <h3 className="mt-1 text-2xl font-black uppercase tracking-tight">Scout Association</h3>
              </div>
            </div>

            <p className="mt-6 text-base leading-7 text-white/72">
              A district platform shaped around youth development, public trust, and the scouting spirit of resilience, fellowship,
              and service in northern Sri Lanka.
            </p>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex flex-wrap gap-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/82 transition hover:border-[var(--tone-gold)] hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
              <p className="text-sm text-white/55">Prepared for community, leadership, and growth.</p>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-white/75">f</span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-white/75">t</span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm text-white/75">i</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
