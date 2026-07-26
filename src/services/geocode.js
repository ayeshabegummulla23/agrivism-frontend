export async function geocodeLocation(village, district, state) {
  const queries = [
    `${village}, ${district}, ${state}, India`,
    `${village}, ${district}, India`,
    `${district}, ${state}, India`,
  ]

  for (const query of queries) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=in`
      const res = await fetch(url, {
        headers: { 'Accept': 'application/json' },
      })
      const data = await res.json()
      if (data && data.length > 0) {
        return {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
          displayName: data[0].display_name,
        }
      }
    } catch {
      continue
    }
  }

  return null
}

export async function reverseGeocode(lat, lng) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    const res = await fetch(url, {
      headers: { 'Accept': 'application/json' },
    })
    const data = await res.json()
    return data?.display_name || ''
  } catch {
    return ''
  }
}
