// TypeScript contracts mirroring eventual backend DTOs.
export interface ScoutPublicDTO {
  scout_id: string // KIL-YYYY-XXXXX
  display_name: string
  unit_id: string
  rank?: string
  profile_photo_url?: string
  bio?: string
  public_achievements?: Array<{ badge_id: string; name: string; awarded_on?: string }>
}

export interface UnitDTO {
  id: string
  name: string
  type: string
  scouts?: ScoutPublicDTO[]
}

export interface EventDTO {
  id: string
  title: string
  start_date: string
  end_date: string
  location?: string
}

export interface NewsDTO { id: string; title: string; date: string; body?: string }
