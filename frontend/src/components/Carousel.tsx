import React from 'react'

type Slide = { src: string; alt?: string }

export default function Carousel({ slides, interval = 4000 }: { slides: Slide[]; interval?: number }){
  const [index, setIndex] = React.useState(0)
  const [paused, setPaused] = React.useState(false)
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  React.useEffect(()=>{
    if(prefersReduced) return
    if(paused) return
    const id = setInterval(()=> setIndex(i => (i+1) % slides.length), interval)
    return ()=> clearInterval(id)
  }, [slides.length, interval, paused, prefersReduced])

  const go = (i:number) => setIndex((i + slides.length) % slides.length)

  return (
    <div className="relative" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
      <div className="w-full overflow-hidden rounded">
        <div className="flex transition-transform duration-700" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((s, i) => (
            <div key={i} className="w-full flex-shrink-0" style={{ minWidth: '100%' }}>
              <img src={s.src} alt={s.alt || ''} className="w-full h-56 sm:h-72 md:h-96 object-cover" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* controls */}
      <button aria-label="Previous slide" onClick={()=>go(index-1)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 text-black rounded-full p-2 shadow hover:bg-white">
        ‹
      </button>
      <button aria-label="Next slide" onClick={()=>go(index+1)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 text-black rounded-full p-2 shadow hover:bg-white">
        ›
      </button>

      {/* indicators */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex gap-2">
        {slides.map((_, i)=> (
          <button key={i} onClick={()=>go(i)} aria-current={i===index} className={`w-3 h-3 rounded-full ${i===index? 'bg-white':'bg-white/50'}`} aria-label={`Slide ${i+1}`}></button>
        ))}
      </div>
    </div>
  )
}
