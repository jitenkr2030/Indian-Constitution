'use client'

import { useState } from 'react'
import { 
  Moon, Sun, Monitor, 
  Type, Volume2, VolumeX, 
  Eye, EyeOff, 
  Accessibility, 
  Settings, X,
  Play, Pause,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { useAccessibility } from '@/contexts/AccessibilityContext'

interface AccessibilitySettingsProps {
  trigger?: React.ReactNode
}

export default function AccessibilitySettings({ trigger }: AccessibilitySettingsProps) {
  const [open, setOpen] = useState(false)
  const {
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
  } = useAccessibility()

  const testTTS = () => {
    speakText("This is a test of the text to speech functionality. The Indian Constitution app is now accessible.")
  }

  const voices = [
    { value: 'tongtong', label: 'Tongtong (温暖亲切)' },
    { value: 'chuichui', label: 'Chuichui (活泼可爱)' },
    { value: 'xiaochen', label: 'Xiaochen (沉稳专业)' },
    { value: 'jam', label: 'Jam (英音绅士)' },
    { value: 'kazi', label: 'Kazi (清晰标准)' },
    { value: 'douji', label: 'Douji (自然流畅)' },
    { value: 'luodo', label: 'Luodo (富有感染力)' }
  ]

  const fontSizes = [
    { value: 'small', label: 'Small', preview: 'Aa' },
    { value: 'medium', label: 'Medium', preview: 'Aa' },
    { value: 'large', label: 'Large', preview: 'Aa' },
    { value: 'extra-large', label: 'Extra Large', preview: 'Aa' }
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon">
            <Accessibility className="h-5 w-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Accessibility className="h-5 w-5" />
            Accessibility Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5" />
                Theme & Display
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Color Theme</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('light')}
                    className="flex items-center gap-2"
                  >
                    <Sun className="h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('dark')}
                    className="flex items-center gap-2"
                  >
                    <Moon className="h-4 w-4" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === 'system' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setTheme('system')}
                    className="flex items-center gap-2"
                  >
                    <Monitor className="h-4 w-4" />
                    System
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">High Contrast</Label>
                  <p className="text-xs text-gray-500">Increase contrast for better visibility</p>
                </div>
                <Switch
                  checked={highContrast}
                  onCheckedChange={setHighContrast}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Reduced Motion</Label>
                  <p className="text-xs text-gray-500">Minimize animations and transitions</p>
                </div>
                <Switch
                  checked={reducedMotion}
                  onCheckedChange={setReducedMotion}
                />
              </div>
            </CardContent>
          </Card>

          {/* Text Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5" />
                Text & Font
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Font Size</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {fontSizes.map((size) => (
                    <Button
                      key={size.value}
                      variant={fontSize === size.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFontSize(size.value as any)}
                      className="flex flex-col items-center gap-1 h-12"
                    >
                      <span className="text-lg">{size.preview}</span>
                      <span className="text-xs">{size.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Screen Reader Mode</Label>
                  <p className="text-xs text-gray-500">Optimize for screen readers</p>
                </div>
                <Switch
                  checked={screenReader}
                  onCheckedChange={setScreenReader}
                />
              </div>
            </CardContent>
          </Card>

          {/* Text-to-Speech Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Text-to-Speech (TTS)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Enable TTS</Label>
                  <p className="text-xs text-gray-500">Read content aloud</p>
                </div>
                <Switch
                  checked={ttsEnabled}
                  onCheckedChange={setTtsEnabled}
                />
              </div>

              {ttsEnabled && (
                <>
                  <div>
                    <Label className="text-sm font-medium">Voice</Label>
                    <Select value={ttsVoice} onValueChange={setTtsVoice}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {voices.map((voice) => (
                          <SelectItem key={voice.value} value={voice.value}>
                            {voice.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-medium">Speech Speed</Label>
                      <span className="text-sm text-gray-500">{ttsSpeed.toFixed(1)}x</span>
                    </div>
                    <Slider
                      value={[ttsSpeed]}
                      onValueChange={(value) => setTtsSpeed(value[0])}
                      min={0.5}
                      max={2.0}
                      step={0.1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0.5x (Slow)</span>
                      <span>1.0x (Normal)</span>
                      <span>2.0x (Fast)</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={testTTS} size="sm" className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Test TTS
                    </Button>
                    <Button onClick={stopSpeaking} size="sm" variant="outline">
                      <Pause className="h-4 w-4 mr-2" />
                      Stop
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setTheme('high-contrast' ? 'light' : 'dark')
                    setHighContrast(!highContrast)
                    setFontSize('large')
                    setTtsEnabled(true)
                  }}
                  className="justify-start"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Enable High Accessibility Mode
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setTheme('system')
                    setHighContrast(false)
                    setReducedMotion(false)
                    setFontSize('medium')
                    setTtsEnabled(false)
                  }}
                  className="justify-start"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status */}
          <div className="flex flex-wrap gap-2">
            <Badge variant={theme === 'dark' ? 'default' : 'secondary'}>
              Theme: {theme}
            </Badge>
            <Badge variant={fontSize === 'medium' ? 'default' : 'secondary'}>
              Font: {fontSize}
            </Badge>
            {highContrast && <Badge variant="default">High Contrast</Badge>}
            {reducedMotion && <Badge variant="default">Reduced Motion</Badge>}
            {ttsEnabled && <Badge variant="default">TTS Enabled</Badge>}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}