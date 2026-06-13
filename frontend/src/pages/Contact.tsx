import React, { useState } from 'react'

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    // Simulate API call
    setTimeout(() => setStatus('success'), 1500)
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-100 flex flex-col items-center justify-center text-center h-full min-h-[400px] transition-all duration-500">
        <div className="w-16 h-16 bg-[rgba(15,76,35,0.1)] text-[var(--tone-olive)] rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[var(--tone-heading)] mb-2">Message Sent!</h3>
        <p className="text-[var(--tone-muted)] mb-8 max-w-sm">
          Thank you for reaching out to the Kilinochchi District Scout Association. We'll get back to you as soon as possible.
        </p>
        <button 
          onClick={() => setStatus('idle')}
          className="btn-primary"
        >
          Send Another Message
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-gray-100 transition-all duration-500 h-full">
      <h2 className="text-2xl font-bold text-[var(--tone-heading)] mb-2">Send us a Message</h2>
      <p className="text-[var(--tone-muted)] mb-8">Fill out the form below and we'll be in touch shortly.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
          <input 
            type="text" 
            id="name" 
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--tone-olive)] focus:border-transparent transition-all"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
          <input 
            type="email" 
            id="email" 
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--tone-olive)] focus:border-transparent transition-all"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
          <select 
            id="subject" 
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--tone-olive)] focus:border-transparent transition-all"
          >
            <option value="">Select a subject...</option>
            <option value="general">General Inquiry</option>
            <option value="join">Joining Scouts</option>
            <option value="events">Event Information</option>
            <option value="feedback">Website Feedback</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-bold text-gray-700 mb-2">Message</label>
          <textarea 
            id="message" 
            rows={5}
            required
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--tone-olive)] focus:border-transparent transition-all resize-y"
            placeholder="How can we help you?"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={status === 'submitting'}
          className={`btn-primary w-full justify-center ${status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}

function ContactInfoCard({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div className="flex gap-4 p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[rgba(15,76,35,0.06)] text-[var(--tone-olive)] flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">{title}</h4>
        <div className="text-[var(--tone-heading)] font-medium leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  )
}

export default function Contact() {
  return (
    <main className="w-full bg-[var(--tone-page)] text-slate-900 pb-24 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#0A1A12] px-4 py-20 text-center md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(48,94,99,0.3)_0%,transparent_70%)]" />
        <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--tone-gold)] to-transparent opacity-30" />
        
        <div className="relative z-10 mx-auto max-w-[800px] pt-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold tracking-widest uppercase mb-6 shadow-sm backdrop-blur-md">
            Get In Touch
          </span>
          <h1 className="text-4xl font-black uppercase tracking-tight text-white md:text-6xl mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-white/70 font-medium leading-relaxed max-w-2xl mx-auto">
            Have questions about joining, upcoming events, or district operations? We're here to help. Reach out using the form or our official contact details below.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="px-4 py-12 md:py-20 -mt-10 relative z-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Left Column: Contact Details */}
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-3xl font-black text-[var(--tone-heading)] mb-6">Official Contacts</h2>
                <p className="text-[var(--tone-muted)] leading-relaxed mb-8">
                  The Kilinochchi District Scout Association headquarters is open during regular operational hours. For urgent matters, please contact the District Commissioner or Secretary directly.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <ContactInfoCard 
                  title="Headquarters" 
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                >
                  <p>District Scout Headquarters,</p>
                  <p>A9 Road, Kilinochchi,</p>
                  <p>Sri Lanka</p>
                </ContactInfoCard>

                <ContactInfoCard 
                  title="Email Us" 
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  <p><a href="mailto:info@kilinochchiscouts.lk" className="hover:text-[var(--tone-olive)] transition-colors">info@kilinochchiscouts.lk</a> <span className="text-gray-400 text-xs ml-2">(General)</span></p>
                  <p className="mt-1"><a href="mailto:dc@kilinochchiscouts.lk" className="hover:text-[var(--tone-olive)] transition-colors">dc@kilinochchiscouts.lk</a> <span className="text-gray-400 text-xs ml-2">(Commissioner)</span></p>
                </ContactInfoCard>

                <ContactInfoCard 
                  title="Call Us" 
                  icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                >
                  <p>+94 77 123 4567 <span className="text-gray-400 text-xs ml-2">(District Commissioner)</span></p>
                  <p className="mt-1">+94 71 987 6543 <span className="text-gray-400 text-xs ml-2">(District Secretary)</span></p>
                </ContactInfoCard>
              </div>

              {/* Social Media Hub */}
              <div className="mt-6 p-8 rounded-3xl bg-[var(--tone-olive)] text-white shadow-lg overflow-hidden relative">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <h3 className="text-xl font-bold mb-6 relative z-10">Connect With Us</h3>
                <div className="flex flex-wrap gap-4 relative z-10">
                  <a href="#" className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 backdrop-blur-sm font-semibold text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    Facebook
                  </a>
                  <a href="#" className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors border border-white/10 backdrop-blur-sm font-semibold text-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div>
              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
