const API_BASE = import.meta.env.VITE_API_URL || ''

export async function uploadDocumentForOCR(file) {
  const token = localStorage.getItem('agrivism_token')
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch(`${API_BASE}/api/farm/ocr`, {
    method: 'POST',
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || `OCR failed: ${res.status}`)
  }
  return res.json()
}

export async function detectLocation(data) {
  const token = localStorage.getItem('agrivism_token')
  const res = await fetch(`${API_BASE}/api/farm/detect-location`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || `Detect failed: ${res.status}`)
  }
  return res.json()
}

export function extractFormFromOCR(parsed) {
  const form = {}
  const map = {
    survey_number: 'survey_number',
    khata: 'khata',
    village: 'village',
    district: 'district',
    state: 'state',
    area: 'area',
    soil_type: 'soil_type',
    water_source: 'water_source',
    owner_name: 'owner_name',
  }
  for (const [key, field] of Object.entries(map)) {
    const val = parsed[key]
    if (val && val !== 'Not detected' && val !== 'No text detected') {
      form[field] = val
    }
  }
  return form
}
