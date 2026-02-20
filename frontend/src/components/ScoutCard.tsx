import React from 'react'

type Props = {
  name: string
  unit: string
  rank?: string
  photo?: string
}

function Avatar({ name, photo }: { name: string; photo?: string }){
  if(photo) return <img src={photo} alt={`Photo of ${name}`} loading="lazy" className="img-cover" />
  // simple SVG fallback avatar
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" fill="#9CA3AF" />
        <path d="M3 21a9 9 0 0118 0" fill="#D1D5DB" />
      </svg>
    </div>
  )
}

export default function ScoutCard({ name, unit, rank, photo }: Props){
  return (
    <article className="border rounded p-3 flex gap-3 items-center card-surface" role="article" aria-label={`Scout ${name}`}>
      <div className="w-16 h-16 rounded overflow-hidden" aria-hidden={photo? 'false':'true'}>
        <Avatar name={name} photo={photo} />
      </div>
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-sm muted">{unit} {rank ? `· ${rank}` : ''}</div>
      </div>
    </article>
  )
}
