import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ThemeToggle } from '../lib/theme'

export default function Header(){
  return (
    <header className="" style={{ background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="font-semibold text-xl text-white" aria-label="Kilinochchi District Scouts homepage">Kilinochchi Scouts</Link>
        <div className="flex items-center gap-4">
          <nav className="space-x-4 text-white hidden sm:block" aria-label="Primary navigation">
            <NavLink to="/about" className={({isActive})=>isActive? 'underline':''}>About</NavLink>
            <NavLink to="/units" className={({isActive})=>isActive? 'underline':''}>Units</NavLink>
            <NavLink to="/events" className={({isActive})=>isActive? 'underline':''}>Events</NavLink>
            <NavLink to="/news" className={({isActive})=>isActive? 'underline':''}>News</NavLink>
            <NavLink to="/contact" className={({isActive})=>isActive? 'underline':''}>Contact</NavLink>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
