'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AccessibilityContextType {
  theme: 'light' | 'dark' | 'system'
  fontSize: 'small' | 'medium' | 'large' | 'extra-large'
  highContrast: boolean
  reducedMotion: boolean
  screenReader: boolean
  ttsEnabled: boolean
  ttsVoice: string
  ttsSpeed: number
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setFontSize: (size: 'small' | 'medium' | 'large' | 'extra-large') => void
  setHighContrast: (highContrast: boolean) => void
  setReducedMotion: (reducedMotion: boolean) => void
  setScreenReader: (screenReader: boolean) => void
  setTtsEnabled: (ttsEnabled: boolean) => void
  setTtsVoice: (voice: string) => void
  setTtsSpeed: (speed: number) => void
  speakText: (text: string) => void
  stopSpeaking: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider')
  }
  return context
}

interface AccessibilityProviderProps {
  children: ReactNode
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'extra-large'>('medium')
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [screenReader, setScreenReader] = useState(false)
  const [ttsEnabled, setTtsEnabled] = useState(false)
  const [ttsVoice, setTtsVoice] = useState('tongtong')
  const [ttsSpeed, setTtsSpeed] = useState(1.0)

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      // System theme
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (isDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }, [theme])

  // Apply font size to document
  useEffect(() => {
    const root = document.documentElement
    root.style.fontSize = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '20px'
    }[fontSize]
  }, [fontSize])

  // TTS functions
  const speakText = (text: string) => {
    if (!ttsEnabled) return
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = ttsSpeed
    utterance.volume = 1
    
    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
  }

  const value: AccessibilityContextType = {
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
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}