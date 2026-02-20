import React from 'react'
import { getNews } from '../lib/api'

export default function News(){
  const [news, setNews] = React.useState<any[]>([])
  React.useEffect(()=>{ getNews().then(setNews) }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">News</h1>
      <ul className="space-y-2">
        {news.map(n => (
          <li key={n.id} className="p-2 border rounded">{n.title}<div className="text-sm text-gray-600">{n.date}</div></li>
        ))}
      </ul>
    </div>
  )
}
