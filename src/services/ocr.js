import { createWorker } from 'tesseract.js'

export async function extractTextFromImage(file) {
  const worker = await createWorker('eng')
  const url = URL.createObjectURL(file)
  const { data } = await worker.recognize(url)
  URL.revokeObjectURL(url)
  await worker.terminate()
  return data.text
}

export function parseRORData(text) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  const full = lines.join(' ')

  const find = (patterns) => {
    for (const p of patterns) {
      const m = full.match(p)
      if (m) return m[1]?.trim() || ''
    }
    return ''
  }

  const surveyNumber = find([
    /(?:Survey\s*(?:No|Number|\.)\s*[:.]?\s*)([\d\/\.]+)/i,
    /(?:Sy\.?\s*No\.?\s*[:.]?\s*)([\d\/\.]+)/i,
    /(?:S\.?\s*No\.?\s*[:.]?\s*)([\d\/\.]+)/i,
    /(\/\d+[\d\/]*)/,
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
    /(?:Applicant\s*[:.]?\s*)([A-Za-z\s.]+)/i,
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
  if (parsed['Survey Number'] && parsed['Survey Number'] !== 'Not detected') {
    form.survey_number = parsed['Survey Number']
  }
  if (parsed['Khata Number'] && parsed['Khata Number'] !== 'Not detected') {
    form.khata = parsed['Khata Number']
  }
  if (parsed['Village'] && parsed['Village'] !== 'Not detected') {
    form.village = parsed['Village']
  }
  if (parsed['District'] && parsed['District'] !== 'Not detected') {
    form.district = parsed['District']
  }
  if (parsed['State'] && parsed['State'] !== 'Not detected') {
    form.state = parsed['State']
  }
  if (parsed['Area'] && parsed['Area'] !== 'Not detected') {
    form.area = parsed['Area']
  }
  return form
}
