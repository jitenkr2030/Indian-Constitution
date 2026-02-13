'use client'

import { useState, useEffect } from 'react'
import { Mic, Users, Phone, Clock, CheckCircle, AlertTriangle, FileText, MapPin, ChevronRight, Send, Copy, Download, Search, Calendar, Shield, Newspaper, Camera, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface JournalismData {
  rightsStrategy: {
    immediate: string[]
    legal: string[]
    constitutional: string[]
    timeline: Record<string, string>
  }
  journalismResources: {
    authorities: Array<{ name: string; phone: string; type: string }>
    organizations: Array<{ name: string; phone: string; type: string }>
    legal: Array<{ name: string; phone: string; type: string }>
    support: Array<{ name: string; phone: string; type: string }>
  }
  legalOptions: Record<string, {
    description: string
    timeline: string
    success: number
    cost: string
    effort: string
  }>
  actionPlan: {
    immediate: string[]
    short: string[]
    long: string[]
  }
  timeline: Record<string, string>
  checklists: Record<string, string[]>
  templates: Array<{
    id: number
    title: string
    type: string
    template: string
    fields: string[]
  }>
  contacts: Array<{ name: string; phone: string; type: string }>
  statistics: {
    totalComplaints: number
    successRate: number
    averageResolutionTime: number
    pressFreedomCases: number
    mediaRightsCases: number
    journalistProtectionCases: number
    citizenJournalismCases: number
    contentCreationCases: number
    lastUpdated: string
  }
  constitutionalBasis: {
    primary: { article: string; title: string; description: string }
    secondary: { article: string; title: string; description: string }
    landmark: { case: string; title: string; description: string }
    legislation: { act: string; title: string; description: string }
  }
}

interface IssueType {
  id: string
  name: string
  description: string
  category: string
  urgency: string
  constitutional: string[]
  legal: string[]
  timeline: string
}

interface JournalismCase {
  id: number
  type: string
  title: string
  description: string
  outcome: string
  timeline: string
  date: string
  location: string
  constitutional: string
}

export default function CitizenJournalismPlatform() {
  const [activeTab, setActiveTab] = useState('assistant')
  const [journalismData, setJournalismData] = useState<JournalismData | null>(null)
  const [issueTypes, setIssueTypes] = useState<IssueType[]>([])
  const [recentCases, setRecentCases] = useState<JournalismCase[]>([])
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    rightsType: '',
    journalismIssue: '',
    mediaType: '',
    location: '',
    description: '',
    evidence: '',
    urgency: 'normal',
    language: 'en',
    journalistInfo: {
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      address: ''
    },
    mediaDetails: {
      platform: '',
      outlet: '',
      type: '',
      date: ''
    },
    publicationInfo: {
      name: '',
      date: '',
      type: '',
      location: ''
    },
    documents: '',
    legalAction: false
  })

  useEffect(() => {
    fetchIssueTypes()
    fetchRecentCases()
  }, [])

  const fetchIssueTypes = async () => {
    try {
      const response = await fetch('/api/journalism')
      if (response.ok) {
        const data = await response.json()
        setIssueTypes(data.data.issueTypes)
        setRecentCases(data.data.recentCases)
      }
    } catch (error) {
      console.error('Error fetching issue types:', error)
    }
  }

  const fetchRecentCases = async () => {
    try {
      const response = await fetch('/api/journalism')
      if (response.ok) {
        const data = await response.json()
        setRecentCases(data.data.recentCases)
      }
    } catch (error) {
      console.error('Error fetching recent cases:', error)
    }
  }

  const generateRightsStrategy = async () => {
    if (!formData.rightsType || !formData.journalistInfo.name || !formData.journalismIssue) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/journalism', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setJournalismData(data.data)
        setGenerated(true)
      }
    } catch (error) {
      console.error('Error generating rights strategy:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadJournalismPlan = () => {
    if (!journalismData) return
    
    const plan = `
CITIZEN JOURNALISM PROTECTION PLAN
==================================

Rights Type: ${formData.rightsType}
Journalism Issue: ${formData.journalismIssue}
Media Type: ${formData.mediaType}
Journalist: ${formData.journalistInfo.name}
Location: ${formData.location}
Urgency: ${formData.urgency}
Generated: ${new Date().toLocaleString()}

IMMEDIATE ACTIONS:
${journalismData.rightsStrategy.immediate.map(action => `• ${action}`).join('\n')}

LEGAL OPTIONS:
${Object.entries(journalismData.legalOptions).map(([key, option]) => `• ${key}: ${option.description} (${option.timeline})`).join('\n')}

CONSTITUTIONAL RIGHTS:
${journalismData.rightsStrategy.constitutional.map(right => `• ${right}`).join('\n')}

TIMELINE:
${Object.entries(journalismData.timeline).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

CONTACTS:
${journalismData.contacts.map(contact => `• ${contact.name}: ${contact.phone}`).join('\n')}

DOCUMENTS NEEDED:
${journalismData.rightsStrategy.legal.map(doc => `• ${doc}`).join('\n')}
    `.trim()

    const blob = new Blob([plan], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Journalism_Rights_Plan_${formData.rightsType}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getJournalismIcon = (type: string) => {
    switch (type) {
      case 'press_freedom': return <Newspaper className="h-5 w-5 text-blue-600" />
      case 'media_rights': return <Camera className="h-5 w-5 text-green-600" />
      case 'journalist_protection': return <Shield className="h-5 w-5 text-purple-600" />
      case 'citizen_journalism': return <Users className="h-5 w-5 text-orange-600" />
      case 'content_creation': return <FileText className="h-5 w-5 text-gray-600" />
      case 'media_ethics': return <AlertTriangle className="h-5 w-5 text-red-600" />
      case 'whistleblowing': return <Mic className="h-5 w-5 text-pink-600" />
      case 'community_media': return <Globe className="h-5 w-5 text-brown-600" />
      default: return <Newspaper className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'rights': return 'text-blue-600 bg-blue-50'
      case 'media': return 'text-green-600 bg-green-50'
      case 'protection': return 'text-purple-600 bg-purple-50'
      case 'community': return 'text-orange-600 bg-orange-50'
      case 'digital': return 'text-gray-600 bg-gray-50'
      case 'ethics': return 'text-red-600 bg-red-50'
      case 'whistleblowing': return 'text-pink-600 bg-pink-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Newspaper className="h-6 w-6 text-blue-600" />
            Citizen Journalism Platform
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Empower citizen journalism with constitutional protection and legal assistance.
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary">Community Engagement</Badge>
            <Badge variant="outline">Constitutional Rights</Badge>
            <Badge variant="outline">Legal Support</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistant">Journalism Assistant</TabsTrigger>
          <TabsTrigger value="rights">Journalism Rights</TabsTrigger>
          <TabsTrigger value="cases">Success Stories</TabsTrigger>
          <TabsTrigger value="guide">Journalism Guide</TabsTrigger>
        </TabsList>

        {/* Journalism Assistant */}
        <TabsContent value="assistant" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generate Journalism Rights Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="rightsType">Journalism Rights Type *</Label>
                    <Select value={formData.rightsType} onValueChange={(value) => setFormData(prev => ({ ...prev, rightsType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select journalism rights type" />
                      </SelectTrigger>
                      <SelectContent>
                        {issueTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              {getJournalismIcon(type.id)}
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="journalismIssue">Journalism Issue *</Label>
                    <Input
                      id="journalismIssue"
                      value={formData.journalismIssue}
                      onChange={(e) => setFormData(prev => ({ ...prev, journalismIssue: e.target.value }))}
                      placeholder="Type of journalism issue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mediaType">Media Type</Label>
                    <Input
                      id="mediaType"
                      value={formData.mediaType}
                      onChange={(e) => setFormData(prev => ({ ...prev, mediaType: e.target.value }))}
                      placeholder="Type of media (print, digital, broadcast)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="journalistName">Journalist Name *</Label>
                    <Input
                      id="journalistName"
                      value={formData.journalistInfo.name}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        journalistInfo: { ...prev.journalistInfo, name: e.target.value }
                      }))}
                      placeholder="Journalist's full name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="journalistPhone">Journalist Phone</Label>
                      <Input
                        id="journalistPhone"
                        value={formData.journalistInfo.phone}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          journalistInfo: { ...prev.journalistInfo, phone: e.target.value }
                        }))}
                        placeholder="Journalist's phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="journalistEmail">Journalist Email</Label>
                      <Input
                        id="journalistEmail"
                        value={formData.journalistInfo.email}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          journalistInfo: { ...prev.journalistInfo, email: e.target.value }
                        }))}
                        placeholder="Journalist's email address"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="journalistAddress">Journalist Address</Label>
                    <Textarea
                      id="journalistAddress"
                      value={formData.journalistInfo.address}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        journalistInfo: { ...prev.journalistInfo, address: e.target.value }
                      }))}
                      placeholder="Journalist's complete address"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="journalistAge">Journalist Age</Label>
                      <Input
                        id="journalistAge"
                        value={formData.journalistInfo.age}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          journalistInfo: { ...prev.journalistInfo, age: e.target.value }
                        }))}
                        placeholder="Journalist's age"
                      />
                    </div>
                    <div>
                      <Label htmlFor="journalistGender">Journalist Gender</Label>
                      <Select value={formData.journalistInfo.gender} onValueChange={(value) => setFormData(prev => ({ 
                        ...prev, 
                        journalistInfo: { ...prev.journalistInfo, gender: value }
                      }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="platform">Media Platform</Label>
                    <Input
                      id="platform"
                      value={formData.mediaDetails.platform}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        mediaDetails: { ...prev.mediaDetails, platform: e.target.value }
                      }))}
                      placeholder="Media platform or outlet"
                    />
                  </div>
                  <div>
                    <Label htmlFor="outlet">Media Outlet</Label>
                    <Input
                      id="outlet"
                      value={formData.mediaDetails.outlet}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        mediaDetails: { ...prev.mediaDetails, outlet: e.target.value }
                      }))}
                      placeholder="Media outlet name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="publicationName">Publication Name</Label>
                    <Input
                      id="publicationName"
                      value={formData.publicationInfo.name}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        publicationInfo: { ...prev.publicationInfo, name: e.target.value }
                      }))}
                      placeholder="Publication name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Location of journalism activity"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Issue Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the journalism issue in detail"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="evidence">Evidence</Label>
                    <Textarea
                      id="evidence"
                      value={formData.evidence}
                      onChange={(e) => setFormData(prev => ({ ...prev, evidence: e.target.value }))}
                      placeholder="List any evidence you have (photos, videos, documents, etc.)"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="documents">Documents</Label>
                    <Textarea
                      id="documents"
                      value={formData.documents}
                      onChange={(e) => setFormData(prev => ({ ...prev, documents: e.target.value }))}
                      placeholder="Available journalism documents and records"
                      rows={2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="urgency">Urgency Level</Label>
                      <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">Urgent - Immediate action needed</SelectItem>
                          <SelectItem value="priority">Priority - Fast response needed</SelectItem>
                          <SelectItem value="normal">Normal - Standard timeline</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select value={formData.language} onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">हिंदी</SelectItem>
                          <SelectItem value="ta">தமிழ்</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={generateRightsStrategy} 
                  disabled={loading || !formData.rightsType || !formData.journalistInfo.name || !formData.journalismIssue}
                  className="w-full"
                >
                  {loading ? 'Generating...' : 'Generate Journalism Rights Strategy'}
                </Button>
              </CardContent>
            </Card>

            {generated && journalismData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Journalism Rights Protection Strategy</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard('Journalism strategy copied to clipboard')}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadJournalismPlan}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-800">Immediate Actions:</h4>
                      <ul className="mt-2 space-y-1">
                        {journalismData.rightsStrategy.immediate.map((action, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Legal Options:</h4>
                        <div className="space-y-2">
                          {Object.entries(journalismData.legalOptions).map(([key, option]) => (
                            <div key={key} className="p-2 border rounded">
                              <div className="font-medium text-sm capitalize">{key}</div>
                              <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">{option.timeline}</Badge>
                                <Badge variant="outline" className="text-xs">{option.success}% success</Badge>
                                <Badge variant="outline" className="text-xs">{option.cost} cost</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Constitutional Rights:</h4>
                        <div className="space-y-2">
                          {journalismData.rightsStrategy.constitutional.map((right, index) => (
                            <div key={index} className="p-2 border rounded">
                              <div className="font-medium text-sm">{right}</div>
                              <p className="text-xs text-gray-600 mt-1">Constitutional protection</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Journalism Resources */}
          {generated && journalismData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Journalism Resources & Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Journalism Authorities:</h4>
                    <div className="space-y-2">
                      {journalismData.journalismResources.authorities.map((authority, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <div className="font-medium text-sm">{authority.name}</div>
                            <div className="text-xs text-gray-600">{authority.type}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">{authority.phone}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Journalism Organizations:</h4>
                    <div className="space-y-2">
                      {journalismData.journalismResources.organizations.map((org, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <div className="font-medium text-sm">{org.name}</div>
                            <div className="text-xs text-gray-600">{org.type}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">{org.phone}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Support Services:</h4>
                    <div className="space-y-2">
                      {journalismData.journalismResources.support.map((support, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <div className="font-medium text-sm">{support.name}</div>
                            <div className="text-xs text-gray-600">{support.type}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">{support.phone}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Journalism Rights */}
        <TabsContent value="rights" className="space-y-6">
          <div className="grid gap-4">
            {issueTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(type.category)}`}>
                        {getJournalismIcon(type.id)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{type.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Badge variant={type.urgency === 'high' ? 'destructive' : 'secondary'}>{type.category}</Badge>
                          <Badge variant="outline">{type.timeline}</Badge>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Success Stories */}
        <TabsContent value="cases" className="space-y-6">
          <div className="grid gap-4">
            {recentCases.map((case_) => (
              <Card key={case_.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{case_.title}</h3>
                      <p className="text-sm text-gray-600">{case_.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={case_.outcome === 'success' ? 'default' : 'secondary'}>
                        {case_.outcome}
                      </Badge>
                      <Badge variant="outline">{case_.timeline}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Type: {case_.type}</span>
                    <span>Date: {case_.date}</span>
                    <span>Location: {case_.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Journalism Guide */}
        <TabsContent value="guide" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5" />
                  Constitutional Basis for Journalism Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Article 19(1)(a)</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to freedom of speech and expression including press freedom.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Article 19(1)(b)</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to assemble peacefully and form associations.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Article 14</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to equality in journalism and media.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Journalism Helplines & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Press Council Helpline</h4>
                    <p className="text-sm text-gray-600">011-2338225</p>
                    <Badge variant="outline" className="mt-2">Press Support</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Journalist Support Helpline</h4>
                    <p className="text-sm text-gray-600">011-2338225</p>
                    <Badge variant="outline" className="mt-2">Journalist Support</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Media Rights Helpline</h4>
                    <p className="text-sm text-gray-600">011-2338225</p>
                    <Badge variant="outline" className="mt-2">Media Support</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Journalism Templates & Forms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Press Freedom Complaint</h4>
                    <p className="text-sm text-gray-600">Complete form for press freedom violation complaint</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Journalist Protection Complaint</h4>
                    <p className="text-sm text-gray-600">Form for journalist rights violation complaint</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Media Ethics Complaint</h4>
                    <p className="text-sm text-gray-600">Form for media ethics violation complaint</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}