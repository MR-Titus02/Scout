import React from 'react'
import { Link } from 'react-router-dom'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/units', label: 'Sections' },
  { to: '/news', label: 'News & Events' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer(){
  return (
    <footer className="bg-[#0A1A12] pt-20 pb-10 text-white relative overflow-hidden border-t border-white/10">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--tone-olive)] rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--tone-gold)] rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
      
      <div className="max-w-[1360px] mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <img
                src="https://picsum.photos/seed/scoutlogo/80"
                alt="Kilinochchi Scout"
                className="h-12 w-auto object-contain"
              />
              <div>
                <h3 className="text-xl font-black uppercase tracking-wider text-white">Kilinochchi District</h3>
                <p className="text-sm font-semibold tracking-widest text-[var(--tone-gold-soft)] uppercase">Scout Association</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-md font-medium mb-8">
              Empowering youth through adventure, leadership, and community service. Join us in shaping the leaders of tomorrow and building a stronger district together.
            </p>
            <div className="flex gap-4">
              {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map(social => (
                <a key={social} href="#" className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/50 transition-all">
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 tracking-wide text-white">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-white/60 hover:text-[var(--tone-gold-soft)] transition-colors text-sm font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 tracking-wide text-white">Stay Updated</h4>
            <p className="text-white/60 text-sm mb-4 font-medium">Subscribe to our newsletter for the latest updates and events.</p>
            <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--tone-gold)] focus:ring-1 focus:ring-[var(--tone-gold)] transition-all"
              />
              <button className="w-full bg-[var(--tone-olive)] hover:bg-[var(--tone-forest)] text-white font-bold py-3 rounded-lg text-sm transition-colors shadow-lg">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs font-medium">
            &copy; {new Date().getFullYear()} Kilinochchi District Scout Association. All rights reserved.
          </p>
          <div className="flex gap-6 text-white/40 text-xs font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
