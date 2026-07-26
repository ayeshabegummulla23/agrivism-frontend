let workerInstance = null
let workerReady = null

async function getWorker() {
  if (workerInstance) return workerInstance
  if (workerReady) return workerReady

  workerReady = (async () => {
    try {
      const { createWorker } = await import('tesseract.js')
      const worker = await createWorker('eng', 1, {
        logger: () => {},
      })
      workerInstance = worker
      return worker
    } catch {
      return null
    }
  })()

  return workerReady
}

export async function extractTextFromImage(file) {
  try {
    const worker = await getWorker()
    if (!worker) return ''

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
    return {
      'Status': 'No text detected — please fill manually',
    }
  }

  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean)
  const full = lines.join(' ')

  const find = (patterns) => {
    for (const p of patterns) {
      const m = full.match(p)
      if (m) return m[1]?.trim() || ''
    }
    return ''
  }

  return {
    'Owner Name': find([/(?:Owner\s*(?:Name)?\s*[:.]?\s*)([A-Za-z\s.]+)/i, /(?:Holder\s*(?:Name)?\s*[:.]?\s*)([A-Za-z\s.]+)/i, /(?:Name\s*[:.]?\s*)([A-Za-z\s.]+)/i]) || 'Not detected',
    'Survey Number': find([/(?:Survey\s*(?:No|Number|\.)\s*[:.]?\s*)([\d\/\.]+)/i, /(?:Sy\.?\s*No\.?\s*[:.]?\s*)([\d\/\.]+)/i, /(\/\d+[\d\/]*)/]) || 'Not detected',
    'Khata Number': find([/(?:Khata\s*(?:No|Number|\.|#)\s*[:.]?\s*)([\d\/\.]+)/i, /(?:Gat\s*(?:No|Number)\s*[:.]?\s*)([\d\/\.]+)/i]) || 'Not detected',
    'Village': find([/(?:Village\s*[:.]?\s*)([A-Za-z\s]+)/i, /(?:Gram\s*[:.]?\s*)([A-Za-z\s]+)/i]) || 'Not detected',
    'District': find([/(?:District\s*[:.]?\s*)([A-Za-z\s]+)/i, /(?:Dist\.?\s*[:.]?\s*)([A-Za-z\s]+)/i]) || 'Not detected',
    'State': find([/(?:State\s*[:.]?\s*)([A-Za-z\s]+)/i, /(?:Pradesh\s*[:.]?\s*)([A-Za-z\s]+)/i]) || 'Not detected',
    'Area': find([/(?:Area\s*[:.]?\s*)([\d\.]+\s*(?:Acres?|Hectares?|Ha|ac|ha))/i, /([\d\.]+\s*(?:Acres?|Hectares?|Ha|ac|ha))/i]) || 'Not detected',
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
    if (parsed[key] && parsed[key] !== 'Not detected' && parsed[key] !== 'No text detected — please fill manually') {
      form[field] = parsed[key]
    }
  }
  return form
}
