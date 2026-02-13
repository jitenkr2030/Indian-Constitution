'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, BookOpen, Headphones, Scale, GraduationCap, Shield, Settings, Menu, X, ChevronRight, Mic, Bell, User, MessageCircle, Volume2, Accessibility } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import ArticleDetailModal from '@/components/ArticleDetailModal'
import FundamentalRightsDashboard from '@/components/FundamentalRightsDashboard'
import AmendmentsTracker from '@/components/AmendmentsTracker'
import StudentExamMode from '@/components/StudentExamMode'
import AccessibilitySettings from '@/components/AccessibilitySettings'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
import { useAccessibility } from '@/contexts/AccessibilityContext'
import RTIAssistant from '@/components/phase1/RTIAssistant'
import LegalEmergencyAssistant from '@/components/phase1/LegalEmergencyAssistant'
import ConsumerProtectionHub from '@/components/phase1/ConsumerProtectionHub'
import BankingRightsNavigator from '@/components/phase1/BankingRightsNavigator'
import GovernmentServicesIntegration from '@/components/phase2/GovernmentServicesIntegration'
import WomensRightsEmpowerment from '@/components/phase2/WomensRightsEmpowerment'
import EnvironmentalProtectionCenter from '@/components/phase2/EnvironmentalProtectionCenter'
import DigitalRightsHub from '@/components/phase2/DigitalRightsHub'
import HealthcareRightsNavigator from '@/components/phase3/HealthcareRightsNavigator'
import EducationRightsPortal from '@/components/phase3/EducationRightsPortal'
import HousingRightsCenter from '@/components/phase3/HousingRightsCenter'
import AgricultureFarmerRights from '@/components/phase3/AgricultureFarmerRights'
import CitizenJournalismPlatform from '@/components/phase4/CitizenJournalismPlatform'
import BusinessRightsHub from '@/components/phase4/BusinessRightsHub'
import NRIForeignRights from '@/components/phase4/NRIForeignRights'
import ConstitutionalLibrary from '@/components/phase4/ConstitutionalLibrary'

interface Article {
  id: string
  number: string
  title: string
  category: string
  importance: number
  part: {
    number: number
    title: string
  }
}

interface SearchResult {
  type: 'article' | 'amendment' | 'emergency'
  id: string
  title: string
  content?: string
  description?: string
  category?: string
  number?: string
  year?: number
}

export default function IndianConstitutionApp() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [aiChatOpen, setAiChatOpen] = useState(false)
  const [aiMessages, setAiMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([])
  const [aiQuestion, setAiQuestion] = useState('')
  const [aiIsTyping, setAiIsTyping] = useState(false)
  const [constitutionData, setConstitutionData] = useState<any[]>([])
  const [dataSeeded, setDataSeeded] = useState(false)
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)
  const [sideMenuOpen, setSideMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('home')
  const tabsRef = useRef<HTMLDivElement>(null)
  
  const { speakText, ttsEnabled } = useAccessibility()

  // Navigation functions
  const navigateToTab = (tab: string) => {
    console.log('Navigating to tab:', tab) // Debug log
    setActiveTab(tab)
    setSideMenuOpen(false)
    
    // Focus search input if navigating to home
    if (tab === 'home') {
      setTimeout(() => {
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLElement
        if (searchInput) {
          searchInput.focus()
        }
      }, 200)
    }
  }

  const handleSearchFocus = () => {
    navigateToTab('home')
    // Focus will happen automatically when tab changes
  }

  const handleAIChat = () => {
    setAiChatOpen(true)
    setSideMenuOpen(false)
  }

  const handleProfile = () => {
    // For now, show accessibility settings as profile
    const accessibilityButton = document.querySelector('[aria-label="Accessibility settings"]') as HTMLElement
    if (accessibilityButton) {
      accessibilityButton.click()
    }
    setSideMenuOpen(false)
  }

  const handleSettings = () => {
    // Open accessibility settings
    const accessibilityButton = document.querySelector('[aria-label="Accessibility settings"]') as HTMLElement
    if (accessibilityButton) {
      accessibilityButton.click()
    }
    setSideMenuOpen(false)
  }

  // Check if data is seeded and load constitution data
  useEffect(() => {
    checkAndSeedData()
    loadConstitutionData()
  }, [])

  // Focus search input when home tab is active
  useEffect(() => {
    if (activeTab === 'home') {
      const timer = setTimeout(() => {
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLElement
        if (searchInput) {
          searchInput.focus()
        }
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [activeTab])

  const checkAndSeedData = async () => {
    try {
      const response = await fetch('/api/constitution')
      if (response.ok) {
        const data = await response.json()
        if (data.data && data.data.length > 0) {
          setDataSeeded(true)
        }
      }
    } catch (error) {
      console.error('Error checking data:', error)
    }
  }

  const seedData = async () => {
    try {
      const response = await fetch('/api/seed', { method: 'POST' })
      if (response.ok) {
        setDataSeeded(true)
        loadConstitutionData()
      }
    } catch (error) {
      console.error('Error seeding data:', error)
    }
  }

  const loadConstitutionData = async () => {
    try {
      const response = await fetch('/api/constitution')
      if (response.ok) {
        const data = await response.json()
        setConstitutionData(data.data || [])
      }
    } catch (error) {
      console.error('Error loading constitution data:', error)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&lang=${selectedLanguage}`)
      if (response.ok) {
        const data = await response.json()
        setSearchResults(data.data.results || [])
      }
    } catch (error) {
      console.error('Error searching:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleAiChat = async () => {
    if (!aiQuestion.trim()) return

    const userMessage = { role: 'user' as const, content: aiQuestion }
    setAiMessages(prev => [...prev, userMessage])
    setAiQuestion('')
    setAiIsTyping(true)

    try {
      const response = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: aiQuestion,
          userId: 'demo-user',
          language: selectedLanguage
        })
      })

      if (response.ok) {
        const data = await response.json()
        setAiMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.data.answer 
        }])
      }
    } catch (error) {
      console.error('Error in AI chat:', error)
      setAiMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }])
    } finally {
      setAiIsTyping(false)
    }
  }

  const features = [
    { icon: BookOpen, title: 'Browse Articles', desc: 'Complete Constitution access', color: 'bg-blue-500' },
    { icon: Search, title: 'Smart Search', desc: 'AI-powered search', color: 'bg-green-500' },
    { icon: Headphones, title: 'Simplified', desc: 'Easy explanations', color: 'bg-purple-500' },
    { icon: Scale, title: 'Case Laws', desc: 'Important judgments', color: 'bg-orange-500' },
    { icon: Shield, title: 'Rights Guide', desc: 'Emergency help', color: 'bg-red-500' },
    { icon: GraduationCap, title: 'Student Mode', desc: 'Exam preparation', color: 'bg-indigo-500' }
  ]

  const recentArticles = [
    { id: '21', title: 'Right to Life', desc: 'Protection of life and personal liberty' },
    { id: '14', title: 'Equality Before Law', desc: 'Equality before law and equal protection' },
    { id: '19', title: 'Freedom of Speech', desc: 'Protection of certain rights regarding freedom' }
  ]

  const emergencyGuides = [
    { title: 'Police Arrest', desc: 'Know your rights when arrested' },
    { title: 'Search & Seizure', desc: 'Rules for search operations' },
    { title: 'Legal Aid', desc: 'Free legal help available' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 via-white-to-green-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4">
                  <button 
                    onClick={() => {
                      console.log('Browse Constitution clicked')
                      navigateToTab('browse')
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-left w-full"
                  >
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <span>Browse Constitution</span>
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Search Articles clicked')
                      handleSearchFocus()
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-left w-full"
                  >
                    <Search className="h-5 w-5 text-green-600" />
                    <span>Search Articles</span>
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Simplified Guide clicked')
                      navigateToTab('rights')
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-left w-full"
                  >
                    <Headphones className="h-5 w-5 text-purple-600" />
                    <span>Simplified Guide</span>
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Case Laws clicked')
                      navigateToTab('amendments')
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-left w-full"
                  >
                    <Scale className="h-5 w-5 text-orange-600" />
                    <span>Case Laws</span>
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Emergency Rights clicked')
                      navigateToTab('rights')
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-left w-full"
                  >
                    <Shield className="h-5 w-5 text-red-600" />
                    <span>Emergency Rights</span>
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Student Mode clicked')
                      navigateToTab('learn')
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-left w-full"
                  >
                    <GraduationCap className="h-5 w-5 text-indigo-600" />
                    <span>Student Mode</span>
                  </button>
                  <hr className="my-2" />
                  <button 
                    onClick={() => {
                      console.log('Profile clicked')
                      handleProfile()
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-left w-full"
                  >
                    <User className="h-5 w-5" />
                    <span>Profile</span>
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Settings clicked')
                      handleSettings()
                    }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 text-left w-full"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">भा</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                संविधान
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Dialog open={aiChatOpen} onOpenChange={setAiChatOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <MessageCircle className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>AI Constitution Assistant</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col h-[400px]">
                  <ScrollArea className="flex-1 p-4 border rounded-md mb-4">
                    {aiMessages.length === 0 ? (
                      <div className="text-center text-gray-500 py-8">
                        <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Ask me anything about the Indian Constitution!</p>
                        <p className="text-sm mt-2">Examples:</p>
                        <ul className="text-sm text-left mt-2 space-y-1">
                          <li>• What are my fundamental rights?</li>
                          <li>• Can police search my phone?</li>
                          <li>• What is Article 21?</li>
                        </ul>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {aiMessages.map((msg, index) => (
                          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-lg ${
                              msg.role === 'user' 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}>
                              {msg.content}
                            </div>
                          </div>
                        ))}
                        {aiIsTyping && (
                          <div className="flex justify-start">
                            <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </ScrollArea>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask about your rights..."
                      value={aiQuestion}
                      onChange={(e) => setAiQuestion(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAiChat()}
                      disabled={aiIsTyping}
                    />
                    <Button onClick={handleAiChat} disabled={aiIsTyping}>
                      {aiIsTyping ? '...' : 'Send'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <AccessibilitySettings>
              <Button variant="ghost" size="icon" className="relative">
                <Accessibility className="h-5 w-5" />
              </Button>
            </AccessibilitySettings>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">
        {/* Hero Section */}
        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
            Indian Constitution
          </h1>
          <p className="text-gray-600 mb-6">Your Rights, Your Voice, Your Constitution</p>
          
          {/* Language Selector */}
          <div className="flex justify-center gap-2 mb-4">
            <Button 
              variant={selectedLanguage === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLanguage('en')}
            >
              English
            </Button>
            <Button 
              variant={selectedLanguage === 'hi' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLanguage('hi')}
            >
              हिंदी
            </Button>
            <Button 
              variant={selectedLanguage === 'ta' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedLanguage('ta')}
            >
              தமிழ்
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-6">
            <Input
              type="text"
              placeholder="Search articles, rights, or ask a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pr-24 h-12 text-base"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                className={`h-8 w-8 ${isListening ? 'bg-red-100' : ''}`}
                onClick={() => setIsListening(!isListening)}
              >
                <Mic className={`h-4 w-4 ${isListening ? 'text-red-600 animate-pulse' : ''}`} />
              </Button>
              <Button size="sm" className="h-8 px-3" onClick={handleSearch} disabled={isSearching}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="max-w-2xl mx-auto mb-6">
              <h3 className="text-lg font-semibold mb-3">Search Results</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {searchResults.map((result, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-sm">
                            {result.number && `${result.type === 'article' ? 'Article' : result.type === 'amendment' ? 'Amendment' : ''} ${result.number}: `}
                            {result.title}
                          </h4>
                          {result.description && (
                            <p className="text-xs text-gray-600 mt-1">{result.description}</p>
                          )}
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="flex justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-3 py-1">
              448 Articles
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              25 Parts
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              12 Schedules
            </Badge>
            <Badge variant="secondary" className="px-3 py-1">
              105 Amendments
            </Badge>
          </div>

          {/* Data Seeding Notice */}
          {!dataSeeded && (
            <Card className="max-w-md mx-auto mb-6 border-orange-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-orange-800 mb-2">Initialize Sample Data</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Click below to load sample constitution data and test the app features.
                </p>
                <Button onClick={seedData} className="w-full">
                  Load Sample Data
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
          <TabsList className="grid w-full grid-cols-21 mb-6">
            <TabsTrigger value="home" data-value="home">Home</TabsTrigger>
            <TabsTrigger value="browse" data-value="browse">Browse</TabsTrigger>
            <TabsTrigger value="rights" data-value="rights">Rights</TabsTrigger>
            <TabsTrigger value="amendments" data-value="amendments">Amendments</TabsTrigger>
            <TabsTrigger value="learn" data-value="learn">Learn</TabsTrigger>
            <TabsTrigger value="rti" data-value="rti">RTI</TabsTrigger>
            <TabsTrigger value="emergency" data-value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="consumer" data-value="consumer">Consumer</TabsTrigger>
            <TabsTrigger value="banking" data-value="banking">Banking</TabsTrigger>
            <TabsTrigger value="gov-services" data-value="gov-services">Gov Services</TabsTrigger>
            <TabsTrigger value="womens-rights" data-value="womens-rights">Women's Rights</TabsTrigger>
            <TabsTrigger value="environment" data-value="environment">Environment</TabsTrigger>
            <TabsTrigger value="digital-rights" data-value="digital-rights">Digital Rights</TabsTrigger>
            <TabsTrigger value="healthcare" data-value="healthcare">Healthcare</TabsTrigger>
            <TabsTrigger value="education" data-value="education">Education</TabsTrigger>
            <TabsTrigger value="housing" data-value="housing">Housing</TabsTrigger>
            <TabsTrigger value="agriculture" data-value="agriculture">Agriculture</TabsTrigger>
            <TabsTrigger value="journalism" data-value="journalism">Journalism</TabsTrigger>
            <TabsTrigger value="business" data-value="business">Business</TabsTrigger>
            <TabsTrigger value="nri" data-value="nri">NRI Rights</TabsTrigger>
            <TabsTrigger value="library" data-value="library">Library</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            {/* Feature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-xs text-gray-600">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Articles */}
            <div>
              <h2 className="text-xl font-bold mb-4">Popular Articles</h2>
              <div className="space-y-3">
                {recentArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold flex items-center gap-2">
                            Article {article.id}
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </h3>
                          <p className="text-sm text-gray-600">{article.desc}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">Important</Badge>
                          {ttsEnabled && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => speakText(`Article ${article.id}: ${article.desc}`)}
                            >
                              <Volume2 className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedArticleId(article.id)}
                          >
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Emergency Guides */}
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                Emergency Rights Guide
              </h2>
              <div className="grid gap-3">
                {emergencyGuides.map((guide, index) => (
                  <Card key={index} className="border-red-200 hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{guide.title}</h3>
                          <p className="text-sm text-gray-600">{guide.desc}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="browse">
            <div>
              <h2 className="text-xl font-bold mb-4">Browse Constitution</h2>
              <div className="space-y-3">
                {constitutionData.length > 0 ? (
                  constitutionData.map((part: any) => (
                    <Card key={part.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <h3 className="font-semibold">Part {part.number} - {part.title}</h3>
                        <p className="text-sm text-gray-600">{part.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{part.articles?.length || 0} Articles</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">No data available. Please load sample data first.</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rights">
            <FundamentalRightsDashboard
              language={selectedLanguage}
              onArticleClick={setSelectedArticleId}
            />
          </TabsContent>

          <TabsContent value="amendments">
            <AmendmentsTracker
              language={selectedLanguage}
              onArticleClick={setSelectedArticleId}
            />
          </TabsContent>

          <TabsContent value="learn">
            <StudentExamMode
              language={selectedLanguage}
              onArticleClick={setSelectedArticleId}
            />
          </TabsContent>

          <TabsContent value="rti">
            <RTIAssistant />
          </TabsContent>

          <TabsContent value="emergency">
            <LegalEmergencyAssistant />
          </TabsContent>

          <TabsContent value="consumer">
            <ConsumerProtectionHub />
          </TabsContent>

          <TabsContent value="banking">
            <BankingRightsNavigator />
          </TabsContent>

          <TabsContent value="gov-services">
            <GovernmentServicesIntegration />
          </TabsContent>

          <TabsContent value="digital-rights">
            <DigitalRightsHub />
          </TabsContent>

          <TabsContent value="healthcare">
            <HealthcareRightsNavigator />
          </TabsContent>

          <TabsContent value="education">
            <EducationRightsPortal />
          </TabsContent>

          <TabsContent value="housing">
            <HousingRightsCenter />
          </TabsContent>

          <TabsContent value="journalism">
            <CitizenJournalismPlatform />
          </TabsContent>

          <TabsContent value="business">
            <BusinessRightsHub />
          </TabsContent>

          <TabsContent value="nri">
            <NRIForeignRights />
          </TabsContent>

          <TabsContent value="library">
            <ConstitutionalLibrary />
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2 px-3"
            onClick={() => {
              console.log('Bottom Browse clicked')
              navigateToTab('browse')
            }}
          >
            <BookOpen className="h-5 w-5" />
            <span className="text-xs">Browse</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2 px-3"
            onClick={() => {
              console.log('Bottom Search clicked')
              handleSearchFocus()
            }}
          >
            <Search className="h-5 w-5" />
            <span className="text-xs">Search</span>
          </Button>
          <Button 
            variant="ghost" 
            className="flex flex-col items-center gap-1 h-auto py-2 px-3"
            onClick={() => {
              console.log('Bottom Rights clicked')
              navigateToTab('rights')
            }}
          >
            <Shield className="h-5 w-5" />
            <span className="text-xs">Rights</span>
          </Button>
        </div>
      </nav>

      {/* Article Detail Modal */}
      <ArticleDetailModal
        articleId={selectedArticleId}
        language={selectedLanguage}
        onClose={() => setSelectedArticleId(null)}
      />

      {/* PWA Install Prompt */}
      <PWAInstallPrompt />
    </div>
  )
}