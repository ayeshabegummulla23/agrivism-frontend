import { useState, useCallback } from 'react'
import en from './en.json'
import hi from './hi.json'
import te from './te.json'
import ta from './ta.json'
import { languages } from './languages'
import LanguageContext from './LanguageContext'

const translations = { en, hi, te, ta }

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('agrivisim-lang') || 'en'
  })

  const changeLang = useCallback((code) => {
    setLang(code)
    localStorage.setItem('agrivisim-lang', code)
  }, [])

  const t = useCallback((path) => {
    const keys = path.split('.')
    let result = translations[lang]
    for (const key of keys) {
      result = result?.[key]
    }
    return result || path
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}
