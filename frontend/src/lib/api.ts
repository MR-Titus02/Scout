import units from '../data/units.json'
import events from '../data/events.json'
import news from '../data/news.json'
import scouts from '../data/scouts.public.json'
import type { UnitDTO, EventDTO, NewsDTO, ScoutPublicDTO } from './contracts'

const SIMULATED_LATENCY = 200

function delay<T>(v:T, ms = SIMULATED_LATENCY){
  return new Promise<T>(res => setTimeout(()=>res(v), ms))
}

export async function getUnits(): Promise<UnitDTO[]>{
  // clone to avoid caller mutating seed
  return delay(JSON.parse(JSON.stringify(units)))
}

export async function getEvents(): Promise<EventDTO[]>{
  return delay(JSON.parse(JSON.stringify(events)))
}

export async function getNews(): Promise<NewsDTO[]>{
  return delay(JSON.parse(JSON.stringify(news)))
}

export async function searchScouts(query: { name?: string; unit?: string; rank?: string }): Promise<ScoutPublicDTO[]>{
  const q = (query.name || '').toLowerCase()
  const results = (scouts as ScoutPublicDTO[]).filter(s => {
    return (!q || s.display_name.toLowerCase().includes(q)) && (!query.unit || s.unit_id === query.unit) && (!query.rank || s.rank === query.rank)
  })
  return delay(results)
}
