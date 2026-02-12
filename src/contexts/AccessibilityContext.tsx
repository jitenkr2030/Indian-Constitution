'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark' | 'system'
type FontSize = 'small' | 'medium' | 'large' | 'extra-large'

interface AccessibilityContextType {
  theme: Theme
  fontSize: FontSize
  highContrast: boolean
  reducedMotion: boolean
  screenReader: boolean
  ttsEnabled: boolean
  ttsVoice: string
  ttsSpeed: number
  setTheme: (theme: Theme) => void
  setFontSize: (size: FontSize) => void
  setHighContrast: (enabled: boolean) => void
  setReducedMotion: (enabled: boolean) => void
  setScreenReader: (enabled: boolean) => void
  setTtsEnabled: (enabled: boolean) => void
  setTtsVoice: (voice: string) => void
  setTtsSpeed: (speed: number) => void
  speakText: (text: string) => void
  stopSpeaking: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system')
  const [fontSize, setFontSize] = useState<FontSize>('medium')
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [screenReader, setScreenReader] = useState(false)
  const [ttsEnabled, setTtsEnabled] = useState(false)
  const [ttsVoice, setTtsVoice] = useState('tongtong')
  const [ttsSpeed, setTtsSpeed] = useState(1.0)
  const [isSpeaking, setIsSpeaking] = useState(false)

  // Load preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('accessibility-settings')
    if (saved) {
      const settings = JSON.parse(saved)
      setTheme(settings.theme || 'system')
      setFontSize(settings.fontSize || 'medium')
      setHighContrast(settings.highContrast || false)
      setReducedMotion(settings.reducedMotion || false)
      setScreenReader(settings.screenReader || false)
      setTtsEnabled(settings.ttsEnabled || false)
      setTtsVoice(settings.ttsVoice || 'tongtong')
      setTtsSpeed(settings.ttsSpeed || 1.0)
    }
  }, [])

  // Save preferences to localStorage
  useEffect(() => {
    const settings = {
      theme,
      fontSize,
      highContrast,
      reducedMotion,
      screenReader,
      ttsEnabled,
      ttsVoice,
      ttsSpeed
    }
    localStorage.setItem('accessibility-settings', JSON.stringify(settings))
  }, [theme, fontSize, highContrast, reducedMotion, screenReader, ttsEnabled, ttsVoice, ttsSpeed])

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      root.classList.toggle('dark', systemTheme === 'dark')
    } else {
      root.classList.toggle('dark', theme === 'dark')
    }
  }, [theme])

  // Apply font size to document
  useEffect(() => {
    const root = document.documentElement
    const fontSizes = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '20px'
    }
    root.style.fontSize = fontSizes[fontSize]
  }, [fontSize])

  // Apply high contrast
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('high-contrast', highContrast)
  }, [highContrast])

  // Apply reduced motion
  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('reduced-motion', reducedMotion)
  }, [reducedMotion])

  // TTS functionality
  const speakText = async (text: string) => {
    if (!ttsEnabled || !text.trim()) return

    try {
      setIsSpeaking(true)
      
      // Call TTS API
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text.trim(),
          voice: ttsVoice,
          speed: ttsSpeed
        })
      })

      if (response.ok) {
        const audioBlob = await response.blob()
        const audioUrl = URL.createObjectURL(audioBlob)
        const audio = new Audio(audioUrl)
        
        audio.onended = () => {
          setIsSpeaking(false)
          URL.revokeObjectURL(audioUrl)
        }
        
        audio.onerror = () => {
          setIsSpeaking(false)
          URL.revokeObjectURL(audioUrl)
        }
        
        await audio.play()
      } else {
        setIsSpeaking(false)
      }
    } catch (error) {
      console.error('TTS Error:', error)
      setIsSpeaking(false)
    }
  }

  const stopSpeaking = () => {
    // Stop any current speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
    setIsSpeaking(false)
  }

  return (
    <AccessibilityContext.Provider
      value={{
        theme,
        fontSize,
        highContrast,
        reducedMotion,
        screenReader,
        ttsEnabled,
        ttsVoice,
        ttsSpeed,
        setTheme,
        setFontSize,
        setHighContrast,
        setReducedMotion,
        setScreenReader,
        setTtsEnabled,
        setTtsVoice,
        setTtsSpeed,
        speakText,
        stopSpeaking
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}