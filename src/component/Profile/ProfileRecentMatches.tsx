import React from 'react'

export const ProfileRecentMatches = () => {
  const stats = [
    { name: 'Total Matches', stat: '21' },
    { name: 'Recent Match', stat: {'opponent':'John D', 'score':'4-6, 3-6', 'result':'Loss'} },
    { name: 'Win-Loss', stat: '12-9' },
  ]
  return (
    <div>
    <h3 className="text-base font-semibold leading-6 text-gray-900">2024 Spring Season</h3>
    <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
      {stats.map((item) => (
        <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">{item.name}</dt>
          {typeof item.stat === 'string' && <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{item.stat}</dd>}
        </div>
      ))}
    </dl>
  </div>
  )
}
