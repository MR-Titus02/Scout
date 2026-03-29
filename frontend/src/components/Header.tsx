import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { href: '#journey', label: 'Scouting Sections' },
  { to: '/news', label: 'News & Events' },
  { to: '/contact', label: 'Contact' },
]

export default function Header(){
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <header className={isHome ? 'fixed inset-x-0 top-0 z-50' : 'sticky left-0 right-0 top-0 z-50'}>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="mx-auto max-w-[1360px] px-4 pt-4">
        <div className={`relative flex items-center justify-between gap-4 rounded-[22px] border px-4 py-3 shadow-[0_12px_40px_rgba(24,33,26,0.14)] ${isHome ? 'border-white/25 bg-[rgba(24,33,26,0.28)] text-white backdrop-blur-2xl' : 'border-[rgba(55,73,56,0.12)] bg-[rgba(244,239,227,0.82)] text-[var(--tone-forest)] backdrop-blur-2xl'}`}>
          <Link to="/" className="flex items-center gap-3">
            <img
              src="https://picsum.photos/seed/scoutlogo/80"
              alt="Kilinochchi Scout"
              className={`h-10 w-10 rounded-full border object-cover ${isHome ? 'border-white/50' : 'border-[rgba(55,73,56,0.18)]'}`}
            />
            <div>
              <div className={`text-sm font-semibold leading-tight ${isHome ? 'text-white' : 'text-[var(--tone-forest)]'}`}>Kilinochchi District</div>
              <div className={`text-xs leading-tight ${isHome ? 'text-white/78' : 'text-[var(--tone-muted)]'}`}>Scout Association</div>
            </div>
          </Link>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((value) => !value)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border sm:hidden ${isHome ? 'border-white/30 bg-white/10 text-white' : 'border-[rgba(55,73,56,0.12)] bg-[rgba(55,73,56,0.04)] text-[var(--tone-forest)]'}`}
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1">
              <span className={`block h-0.5 w-4 rounded-full ${isHome ? 'bg-white' : 'bg-[var(--tone-forest)]'}`} />
              <span className={`block h-0.5 w-4 rounded-full ${isHome ? 'bg-white' : 'bg-[var(--tone-forest)]'}`} />
              <span className={`block h-0.5 w-4 rounded-full ${isHome ? 'bg-white' : 'bg-[var(--tone-forest)]'}`} />
            </span>
          </button>

          <nav className={`${isOpen ? 'absolute left-0 right-0 top-[calc(100%+0.75rem)] block' : 'hidden'} sm:static sm:block`}>
            <ul className={`flex flex-col gap-2 rounded-[20px] border p-4 text-sm font-semibold shadow-lg sm:flex-row sm:items-center sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none ${isHome ? 'border-[rgba(244,239,227,0.28)] bg-[rgba(244,239,227,0.96)] text-[var(--tone-forest)] backdrop-blur-2xl sm:border-0 sm:bg-transparent sm:text-white' : 'border-[rgba(55,73,56,0.12)] bg-[rgba(244,239,227,0.96)] text-[var(--tone-forest)] backdrop-blur-2xl'}`}>
              {navItems.map((item) => (
                <li key={item.label}>
                  {'to' in item ? (
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `block rounded-full px-4 py-2 transition ${isHome ? (isActive ? 'bg-[var(--tone-olive)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] sm:bg-white/24 sm:text-white sm:ring-1 sm:ring-white/40' : 'text-[var(--tone-forest)] hover:bg-[rgba(74,94,63,0.08)] sm:text-white/88 sm:hover:bg-white/10') : (isActive ? 'bg-[var(--tone-olive)] text-white' : 'text-[var(--tone-forest)] hover:bg-[rgba(74,94,63,0.08)]')}`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-full px-4 py-2 transition ${isHome ? 'text-[var(--tone-forest)] hover:bg-[rgba(74,94,63,0.08)] sm:text-white/88 sm:hover:bg-white/10' : 'text-[var(--tone-forest)] hover:bg-[rgba(74,94,63,0.08)]'}`}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}
