import React from 'react'
import SectionHeading from './SectionHeading'

type NewsItem = {
  id: string
  title: string
  date: string
  excerpt?: string
  tag?: string
  imageUrl: string
}

const AUTO_ADVANCE_MS = 12000
const CAROUSEL_GAP_PX = 16

function getVisibleCount(width: number){
  if (width >= 1280) {
    return 3
  }

  if (width >= 768) {
    return 2
  }

  return 1
}

export default function NewsEventsSection({ items }: { items: NewsItem[] }){
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [visibleCount, setVisibleCount] = React.useState(() =>
    typeof window === 'undefined' ? 3 : getVisibleCount(window.innerWidth)
  )
  const [transitionEnabled, setTransitionEnabled] = React.useState(true)

  React.useEffect(() => {
    const updateVisibleCount = () => setVisibleCount(getVisibleCount(window.innerWidth))

    updateVisibleCount()
    window.addEventListener('resize', updateVisibleCount)

    return () => {
      window.removeEventListener('resize', updateVisibleCount)
    }
  }, [])

  React.useEffect(() => {
    if (!items.length || items.length <= visibleCount) {
      return
    }

    const intervalId = window.setInterval(() => {
      setTransitionEnabled(true)
      setCurrentIndex((value) => value + 1)
    }, AUTO_ADVANCE_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [items.length, visibleCount])

  React.useEffect(() => {
    if (!items.length) {
      return
    }

    setCurrentIndex((value) => Math.min(value, items.length - 1))
  }, [items.length, visibleCount])

  if (!items.length) {
    return <p className="px-4 py-10 text-center text-[var(--tone-muted)]">Loading news and events...</p>
  }

  const shouldLoop = items.length > visibleCount
  const loopItems = shouldLoop ? [...items, ...items.slice(0, visibleCount)] : items

  const goNext = () => {
    if (!shouldLoop) {
      return
    }

    setTransitionEnabled(true)
    setCurrentIndex((value) => value + 1)
  }

  const goPrev = () => {
    if (!shouldLoop) {
      return
    }

    if (currentIndex === 0) {
      setTransitionEnabled(false)
      setCurrentIndex(items.length)

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransitionEnabled(true)
          setCurrentIndex(items.length - 1)
        })
      })

      return
    }

    setTransitionEnabled(true)
    setCurrentIndex((value) => value - 1)
  }

  const handleTransitionEnd = () => {
    if (!shouldLoop || currentIndex < items.length) {
      return
    }

    setTransitionEnabled(false)
    setCurrentIndex(0)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTransitionEnabled(true)
      })
    })
  }

  const activeDot = shouldLoop ? currentIndex % items.length : currentIndex

  return (
    <section className="overflow-hidden bg-[var(--tone-paper)] px-4 py-12">
      <div className="mx-auto max-w-[1360px]">
        <div className="mb-6 flex items-end justify-between gap-4">
          <SectionHeading
            title="News & Events"
            subtitle="District stories and announcements that step forward one card at a time for easier reading."
          />
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(48,94,99,0.18)] text-[var(--tone-olive)] transition hover:bg-[rgba(48,94,99,0.08)]"
              aria-label="Previous news items"
            >
              &lt;
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(48,94,99,0.18)] text-[var(--tone-olive)] transition hover:bg-[rgba(48,94,99,0.08)]"
              aria-label="Next news items"
            >
              &gt;
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-4"
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(calc(${currentIndex} * -1 * ((100% - (${visibleCount} - 1) * ${CAROUSEL_GAP_PX}px) / ${visibleCount} + ${CAROUSEL_GAP_PX}px)))`,
              transition: transitionEnabled ? 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
            }}
          >
            {loopItems.map((item, index) => (
              <article
                key={`${item.id}-${index}`}
                className="group relative min-h-[270px] flex-none overflow-hidden rounded-[18px] border border-black/10 bg-[var(--tone-forest)] shadow-[0_12px_30px_rgba(19,32,36,0.18)]"
                style={{
                  width: `calc((100% - (${visibleCount} - 1) * ${CAROUSEL_GAP_PX}px) / ${visibleCount})`,
                }}
              >
                <img src={item.imageUrl} alt={item.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,20,24,0.92)] via-[rgba(10,20,24,0.42)] to-transparent" />
                <div className="relative flex h-full flex-col justify-between p-4 text-white">
                  <span className="inline-flex w-fit rounded-full bg-[var(--tone-gold-soft)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--tone-forest)]">
                    {item.tag || 'News'}
                  </span>
                  <div>
                    <p className="mb-2 text-xs text-white/75">{item.date}</p>
                    <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
                    <p className="mt-2 text-sm leading-5 text-white/82">
                      {item.excerpt || 'Explore this activity and join with your local unit.'}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setTransitionEnabled(true)
                setCurrentIndex(index)
              }}
              aria-label={`Show news item ${index + 1}`}
              className={`h-2.5 rounded-full transition ${index === activeDot ? 'w-8 bg-[var(--tone-olive)]' : 'w-2.5 bg-[rgba(48,94,99,0.2)] hover:bg-[rgba(48,94,99,0.35)]'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
