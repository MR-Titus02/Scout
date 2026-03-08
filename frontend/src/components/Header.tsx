import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ThemeToggle } from '../lib/theme'

export default function Header(){
  return (
    <header className="border-b" style={{ borderColor: 'var(--primary)' }}>
      <a href="#main" className="skip-link">Skip to content</a>
      {/* Top Bar */}
      <div className="bg-[var(--primary)] text-white text-xs font-semibold px-4 py-2 flex justify-between items-center">
        <div>PDPA Compliant · Safe from Harm</div>
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="cursor-pointer font-bold">English</span>
          <span className="cursor-pointer">Tamil</span>
          <span className="cursor-pointer">Sinhala</span>
        </div>
      </div>
      {/* Main Nav */}
      <div className="bg-[#f0f3eb] text-[#2c3e2e]">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <svg className="w-8 h-8 text-[var(--primary)]" viewBox="0 0 24 24" fill="currentColor">
              {/* Fake Fleur-de-lis logo for now */}
              <path d="M12 2L15 8h-6L12 2zm0 20v-8M7 12c0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4-4 1.8-4 4zm-5 0l5 5V7l-5 5zm17 0l-5 5V7l5 5z" />
            </svg>
            <Link to="/" className="font-bold text-xl font-serif">Kilinochchi Scout</Link>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden sm:flex space-x-6 font-semibold text-lg" aria-label="Primary navigation">
              <NavLink to="/" className={({isActive})=>isActive? 'underline':''}>Home</NavLink>
              <NavLink to="/units" className={({isActive})=>isActive? 'underline':''}>Units</NavLink>
              <NavLink to="/news" className={({isActive})=>isActive? 'underline':''}>News & Events</NavLink>
              <NavLink to="/contact" className={({isActive})=>isActive? 'underline':''}>Contact</NavLink>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
