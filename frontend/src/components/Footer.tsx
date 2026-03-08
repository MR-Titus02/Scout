import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-[var(--primary)] text-white text-sm mt-auto">
      <div className="container mx-auto p-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-[#e3cc74]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 8h-6L12 2zm0 20v-8M7 12c0 2.2 1.8 4 4 4s4-1.8 4-4-1.8-4-4-4-4 1.8-4 4zm-5 0l5 5V7l-5 5zm17 0l-5 5V7l5 5z" />
            </svg>
            <div>
              <div className="font-bold font-serif text-base">Kilinochchi District</div>
              <div className="text-xs">Sri Lanka Scout Association</div>
            </div>
        </div>
        
        <div className="text-center font-semibold max-w-sm mx-auto">
          Be Prepared<br/>
          <span className="font-normal text-xs opacity-90 mt-1 block">
            To contribute to the education of young people through a value system based on the Scout Promise and Law, building a better world where people are self-fulfilled as individuals and play a constructive role in society.
          </span>
        </div>

        <div className="flex justify-end">
          <a href="/about" className="bg-[#cc9d5e] text-[#4d3215] hover:bg-[#b08750] px-4 py-2 font-bold rounded flex items-center gap-2 transition">
            About us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
