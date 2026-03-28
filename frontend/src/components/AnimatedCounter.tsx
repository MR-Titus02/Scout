import React, { useEffect, useState, useRef } from 'react'

interface AnimatedCounterProps {
  target: number
  duration?: number
  className?: string
}

export default function AnimatedCounter({ target, duration = 2000, className = '' }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const counterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (counterRef.current) {
      observer.observe(counterRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number | null = null
    let animationFrame: number

    const updateCounter = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime

      // Easing function (easeOutExpo)
      const easeOut = progress === duration ? 1 : 1 - Math.pow(2, -10 * progress / duration)
      
      if (progress < duration) {
        setCount(Math.min(target, Math.floor(easeOut * target)))
        animationFrame = requestAnimationFrame(updateCounter)
      } else {
        setCount(target)
      }
    }

    animationFrame = requestAnimationFrame(updateCounter)

    return () => cancelAnimationFrame(animationFrame)
  }, [target, duration, isVisible])

  return (
    <div ref={counterRef} className={className}>
      {count}
    </div>
  )
}
