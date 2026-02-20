import React from 'react'
import { getUnits } from '../lib/api'
import ScoutCard from '../components/ScoutCard'

export default function Units(){
  const [units, setUnits] = React.useState<any[]>([])

  React.useEffect(()=>{ getUnits().then(setUnits) }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Units</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {units.map(u => (
          <div key={u.id} className="p-4 border rounded">
            <h3 className="font-semibold">{u.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{u.type}</p>
            <div className="space-y-2">
              {(u.scouts || []).map((s:any)=> <ScoutCard key={s.scout_id} name={s.display_name} unit={u.name} rank={s.rank} photo={s.profile_photo_url} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
