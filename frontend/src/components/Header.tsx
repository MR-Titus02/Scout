import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/news', label: 'News & Events' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const location = useLocation()
  const [isOpen, setIsOpen] = React.useState(false)
  const [visible, setVisible] = React.useState(false)
  const leaveTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  // Close mobile nav on route change
  React.useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Proximity detection: show header when mouse is within 80px of the top
  React.useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 80) {
        if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
        setVisible(true)
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  const handleHeaderMouseLeave = () => {
    // Small delay so the user can move to a nav item without it snapping shut
    leaveTimerRef.current = setTimeout(() => {
      if (!isOpen) setVisible(false)
    }, 300)
  }

  const handleHeaderMouseEnter = () => {
    if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current)
    setVisible(true)
  }

  // Close & hide when a nav link is clicked on mobile
  const handleNavClick = () => {
    setIsOpen(false)
    setVisible(false)
  }

  return (
    <>
      {/* Invisible hover-trigger strip at the very top of the screen */}
      <div
        className="fixed inset-x-0 top-0 z-[49] h-5"
        onMouseEnter={() => setVisible(true)}
      />

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
        onMouseEnter={handleHeaderMouseEnter}
        onMouseLeave={handleHeaderMouseLeave}
      >
        <a href="#main" className="skip-link">Skip to content</a>
        <div className="w-full px-4 pt-3 pb-2 md:px-8">
          <div className="relative flex items-center justify-between gap-4 rounded-[22px] border border-white/15 bg-[rgba(10,26,18,0.92)] px-5 py-3 shadow-[0_16px_48px_rgba(0,0,0,0.35)] backdrop-blur-2xl text-white">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0" onClick={handleNavClick}>
              <img
                src="https://picsum.photos/seed/scoutlogo/80"
                alt="Kilinochchi Scout"
                className="h-10 w-auto object-contain rounded-lg"
              />
              <div>
                <div className="text-sm font-bold leading-tight text-white">Kilinochchi District</div>
                <div className="text-[11px] leading-tight text-white/55">Scout Association</div>
              </div>
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              onClick={() => setIsOpen(v => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white sm:hidden transition-colors hover:bg-white/20"
            >
              <span className="sr-only">Menu</span>
              <span className="flex flex-col gap-[5px]">
                <span className={`block h-0.5 w-4 rounded-full bg-white transition-all duration-300 ${isOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
                <span className={`block h-0.5 w-4 rounded-full bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 w-4 rounded-full bg-white transition-all duration-300 ${isOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
              </span>
            </button>

            {/* Nav */}
            <nav className={`${isOpen ? 'absolute left-0 right-0 top-[calc(100%+0.75rem)] block' : 'hidden'} sm:static sm:block`}>
              <ul className={`flex flex-col gap-1 rounded-[20px] border border-white/15 bg-[rgba(10,26,18,0.95)] p-4 text-sm font-semibold shadow-2xl backdrop-blur-2xl sm:flex-row sm:items-center sm:gap-1 sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none`}>
                {navItems.map((item) => (
                  <li key={item.label}>
                    <NavLink
                      to={item.to}
                      onClick={handleNavClick}
                      className={({ isActive }) =>
                        `block rounded-full px-4 py-2 transition-all duration-200 ${
                          isActive
                            ? 'bg-[var(--tone-olive)] text-white shadow-md'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
