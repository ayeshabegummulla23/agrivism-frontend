import { createWorker } from 'tesseract.js'

let workerInstance = null

async function getWorker() {
  if (workerInstance) return workerInstance
  try {
    workerInstance = await createWorker('eng', 1, {
      logger: () => {},
    })
    return workerInstance
  } catch {
    return null
  }
}

export async function extractTextFromImage(file) {
  const worker = await getWorker()
  if (!worker) return ''

  try {
    const url = URL.createObjectURL(file)
    const { data } = await worker.recognize(url)
    URL.revokeObjectURL(url)
    return data?.text || ''
  } catch {
    return ''
  }
}

export function parseRORData(text) {
  if (!text || !text.trim()) {
    return { 'Status': 'No text detected' }
  }

  const full = text.replace(/\n/g, ' ').replace(/\s+/g, ' ')

  const find = (patterns) => {
    for (const p of patterns) {
      const m = full.match(p)
      if (m && m[1]) return m[1].trim()
    }
    return ''
  }

  const surveyNumber = find([
    /(?:Survey\s*(?:No|Number|\.)\s*[:.]?\s*)([\d\/\.]+)/i,
    /(?:Sy\.?\s*No\.?\s*[:.]?\s*)([\d\/\.]+)/i,
    /(?:S\.?\s*No\.?\s*[:.]?\s*)([\d\/\.]+)/i,
    /(?:Survey\s*)([\d\/]+[\d\/]*)/i,
  ])

  const khata = find([
    /(?:Khata\s*(?:No|Number|\.|#)\s*[:.]?\s*)([\d\/\.]+)/i,
    /(?:Gat\s*(?:No|Number)\s*[:.]?\s*)([\d\/\.]+)/i,
    /(?:Patta\s*(?:No|Number)\s*[:.]?\s*)([\d\/\.]+)/i,
  ])

  const village = find([
    /(?:Village\s*[:.]?\s*)([A-Za-z\s]+)/i,
    /(?:Gram\s*[:.]?\s*)([A-Za-z\s]+)/i,
    /(?:Mauza\s*[:.]?\s*)([A-Za-z\s]+)/i,
  ])

  const district = find([
    /(?:District\s*[:.]?\s*)([A-Za-z\s]+)/i,
    /(?:Dist\.?\s*[:.]?\s*)([A-Za-z\s]+)/i,
    /(?:Zilla\s*[:.]?\s*)([A-Za-z\s]+)/i,
  ])

  const state = find([
    /(?:State\s*[:.]?\s*)([A-Za-z\s]+)/i,
    /(?:Pradesh\s*[:.]?\s*)([A-Za-z\s]+)/i,
  ])

  const area = find([
    /(?:Area\s*[:.]?\s*)([\d\.]+\s*(?:Acres?|Hectares?|Ha|ac|ha))/i,
    /([\d\.]+\s*(?:Acres?|Hectares?|Ha|ac|ha))/i,
  ])

  const ownerName = find([
    /(?:Owner\s*(?:Name)?\s*[:.]?\s*)([A-Za-z\s.]+)/i,
    /(?:Holder\s*(?:Name)?\s*[:.]?\s*)([A-Za-z\s.]+)/i,
    /(?:Name\s*[:.]?\s*)([A-Za-z\s.]+)/i,
  ])

  return {
    'Owner Name': ownerName || 'Not detected',
    'Survey Number': surveyNumber || 'Not detected',
    'Khata Number': khata || 'Not detected',
    'Village': village || 'Not detected',
    'District': district || 'Not detected',
    'State': state || 'Not detected',
    'Area': area || 'Not detected',
  }
}

export function extractFormFromOCR(parsed) {
  const form = {}
  const map = {
    'Survey Number': 'survey_number',
    'Khata Number': 'khata',
    'Village': 'village',
    'District': 'district',
    'State': 'state',
    'Area': 'area',
  }
  for (const [key, field] of Object.entries(map)) {
    const val = parsed[key]
    if (val && val !== 'Not detected' && val !== 'No text detected') {
      form[field] = val
    }
  }
  return form
}
