'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Users, Phone, Clock, CheckCircle, AlertTriangle, FileText, MapPin, ChevronRight, Send, Copy, Download, Search, Calendar, Shield, Library, Archive, Globe, GraduationCap, Building } from 'lucide-react'
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

interface LibraryData {
  rightsStrategy: {
    immediate: string[]
    legal: string[]
    constitutional: string[]
    timeline: Record<string, string>
  }
  libraryResources: {
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
    constitutionalCases: number
    legalCases: number
    historicalCases: number
    academicCases: number
    researchCases: number
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

interface LibraryCase {
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

export default function ConstitutionalLibrary() {
  const [activeTab, setActiveTab] = useState('assistant')
  const [libraryData, setLibraryData] = useState<LibraryData | null>(null)
  const [issueTypes, setIssueTypes] = useState<IssueType[]>([])
  const [recentCases, setRecentCases] = useState<LibraryCase[]>([])
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    rightsType: '',
    libraryIssue: '',
    documentType: '',
    location: '',
    description: '',
    evidence: '',
    urgency: 'normal',
    language: 'en',
    libraryInfo: {
      name: '',
      type: '',
      registration: '',
      phone: '',
      email: '',
      address: ''
    },
    documentInfo: {
      title: '',
      author: '',
      publisher: '',
      year: '',
      isbn: ''
    },
    legalStructure: '',
    documents: '',
    legalAction: false
  })

  useEffect(() => {
    fetchIssueTypes()
    fetchRecentCases()
  }, [])

  const fetchIssueTypes = async () => {
    try {
      const response = await fetch('/api/library')
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
      const response = await fetch('/api/library')
      if (response.ok) {
        const data = await response.json()
        setRecentCases(data.data.recentCases)
      }
    } catch (error) {
      console.error('Error fetching recent cases:', error)
    }
  }

  const generateRightsStrategy = async () => {
    if (!formData.rightsType || !formData.libraryInfo.name || !formData.libraryIssue) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/library', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setLibraryData(data.data)
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

  const downloadLibraryPlan = () => {
    if (!libraryData) return
    
    const plan = `
CONSTITUTIONAL LIBRARY PROTECTION PLAN
==================================

Rights Type: ${formData.rightsType}
Library Issue: ${formData.libraryIssue}
Document Type: ${formData.documentType}
Library: ${formData.libraryInfo.name}
Location: ${formData.location}
Urgency: ${formData.urgency}
Generated: ${new Date().toLocaleString()}

IMMEDIATE ACTIONS:
${libraryData.rightsStrategy.immediate.map(action => `• ${action}`).join('\n')}

LEGAL OPTIONS:
${Object.entries(libraryData.legalOptions).map(([key, option]) => `• ${key}: ${option.description} (${option.timeline})`).join('\n')}

CONSTITUTIONAL RIGHTS:
${libraryData.rightsStrategy.constitutional.map(right => `• ${right}`).join('\n')}

TIMELINE:
${Object.entries(libraryData.timeline).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

CONTACTS:
${libraryData.contacts.map(contact => `• ${contact.name}: ${contact.phone}`).join('\n')}

DOCUMENTS NEEDED:
${libraryData.rightsStrategy.legal.map(doc => `• ${doc}`).join('\n')}
    `.trim()

    const blob = new Blob([plan], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Library_Rights_Plan_${formData.rightsType}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getLibraryIcon = (type: string) => {
    switch (type) {
      case 'constitutional_documents': return <BookOpen className="h-5 w-5 text-blue-600" />
      case 'legal_documents': return <FileText className="h-5 w-5 text-green-600" />
      case 'historical_documents': return <Archive className="h-5 w-5 text-purple-600" />
      case 'academic_documents': return <GraduationCap className="h-5 w-5 text-orange-600" />
      case 'research_materials': return <Search className="h-5 w-5 text-gray-600" />
      case 'digital_library': return <Globe className="h-5 w-5 text-red-600" />
      case 'public_access': return <Users className="h-5 w-5 text-pink-600" />
      case 'copyright_protection': return <Shield className="h-5 w-5 text-brown-600" />
      default: return <Library className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'constitutional': return 'text-blue-600 bg-blue-50'
      case 'legal': return 'text-green-600 bg-green-50'
      case 'historical': return 'text-purple-600 bg-purple-50'
      case 'academic': return 'text-orange-600 bg-orange-50'
      case 'research': return 'text-gray-600 bg-gray-50'
      case 'digital': return 'text-red-600 bg-red-50'
      case 'public': return 'text-pink-600 bg-pink-50'
      case 'copyright': return 'text-brown-600 bg-brown-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Library className="h-6 w-6 text-blue-600" />
            Constitutional Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Preserve constitutional knowledge with comprehensive library resources.
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary">Knowledge Preservation</Badge>
            <Badge variant="outline">Constitutional Rights</Badge>
            <Badge variant="outline">Legal Support</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistant">Library Assistant</TabsTrigger>
          <TabsTrigger value="rights">Library Rights</TabsTrigger>
          <TabsTrigger value="cases">Success Stories</TabsTrigger>
          <TabsTrigger value="guide">Library Guide</TabsTrigger>
        </TabsList>

        {/* Library Assistant */}
        <TabsContent value="assistant" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generate Library Rights Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="rightsType">Library Rights Type *</Label>
                    <Select value={formData.rightsType} onValueChange={(value) => setFormData(prev => ({ ...prev, rightsType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select library rights type" />
                      </SelectTrigger>
                      <SelectContent>
                        {issueTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              {getLibraryIcon(type.id)}
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="libraryIssue">Library Issue *</Label>
                    <Input
                      id="libraryIssue"
                      value={formData.libraryIssue}
                      onChange={(e) => setFormData(prev => ({ ...prev, libraryIssue: e.target.value }))}
                      placeholder="Type of library issue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="documentType">Document Type</Label>
                    <Input
                      id="documentType"
                      value={formData.documentType}
                      onChange={(e) => setFormData(prev => ({ ...prev, documentType: e.target.value }))}
                      placeholder="Type of document (book, journal, etc.)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="libraryName">Library Name *</Label>
                    <Input
                      id="libraryName"
                      value={formData.libraryInfo.name}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        libraryInfo: { ...prev.libraryInfo, name: e.target.value }
                      }))}
                      placeholder="Library name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="libraryType">Library Type</Label>
                    <Input
                      id="libraryType"
                      value={formData.libraryInfo.type}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        libraryInfo: { ...prev.libraryInfo, type: e.target.value }
                      }))}
                      placeholder="Library type (public, private, academic)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="libraryRegistration">Library Registration</Label>
                    <Input
                      id="libraryRegistration"
                      value={formData.libraryInfo.registration}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        libraryInfo: { ...prev.libraryInfo, registration: e.target.value }
                      }))}
                      placeholder="Library registration number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="libraryPhone">Library Phone</Label>
                      <Input
                        id="libraryPhone"
                        value={formData.libraryInfo.phone}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          libraryInfo: { ...prev.libraryInfo, phone: e.target.value }
                        }))}
                        placeholder="Library phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="libraryEmail">Library Email</Label>
                      <Input
                        id="libraryEmail"
                        value={formData.libraryInfo.email}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          libraryInfo: { ...prev.libraryInfo, email: e.target.value }
                        }))}
                        placeholder="Library email address"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="libraryAddress">Library Address</Label>
                    <Textarea
                      id="libraryAddress"
                      value={formData.libraryInfo.address}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        libraryInfo: { ...prev.libraryInfo, address: e.target.value }
                      }))}
                      placeholder="Library complete address"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="documentTitle">Document Title</Label>
                    <Input
                      id="documentTitle"
                      value={formData.documentInfo.title}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        documentInfo: { ...prev.documentInfo, title: e.target.value }
                      }))}
                      placeholder="Document title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="documentAuthor">Document Author</Label>
                    <Input
                      id="documentAuthor"
                      value={formData.documentInfo.author}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        documentInfo: { ...prev.documentInfo, author: e.target.value }
                      }))}
                      placeholder="Document author"
                    />
                  </div>
                  <div>
                    <Label htmlFor="documentPublisher">Document Publisher</Label>
                    <Input
                      id="documentPublisher"
                      value={formData.documentInfo.publisher}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        documentInfo: { ...prev.documentInfo, publisher: e.target.value }
                      }))}
                      placeholder="Document publisher"
                    />
                  </div>
                  <div>
                    <Label htmlFor="documentYear">Document Year</Label>
                    <Input
                      id="documentYear"
                      value={formData.documentInfo.year}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        documentInfo: { ...prev.documentInfo, year: e.target.value }
                      }))}
                      placeholder="Document publication year"
                    />
                  </div>
                  <div>
                    <Label htmlFor="legalStructure">Legal Structure</Label>
                    <Select value={formData.legalStructure} onValueChange={(value) => setFormData(prev => ({ ...prev, legalStructure: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="trust">Trust</SelectItem>
                        <SelectItem value="society">Society</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Location of library"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Issue Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the library issue in detail"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="evidence">Evidence</Label>
                    <Textarea
                      id="evidence"
                      value={formData.evidence}
                      onChange={(e) => setFormData(prev => ({ ...prev, evidence: e.target.value }))}
                      placeholder="List any evidence you have (documents, photos, etc.)"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="documents">Documents</Label>
                    <Textarea
                      id="documents"
                      value={formData.documents}
                      onChange={(e) => setFormData(prev => ({ ...prev, documents: e.target.value }))}
                      placeholder="Available library documents and records"
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
                  disabled={loading || !formData.rightsType || !formData.libraryInfo.name || !formData.libraryIssue}
                  className="w-full"
                >
                  {loading ? 'Generating...' : 'Generate Library Rights Strategy'}
                </Button>
              </CardContent>
            </Card>

            {generated && libraryData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Library Rights Protection Strategy</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard('Library strategy copied to clipboard')}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadLibraryPlan}>
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
                        {libraryData.rightsStrategy.immediate.map((action, index) => (
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
                          {Object.entries(libraryData.legalOptions).map(([key, option]) => (
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
                          {libraryData.rightsStrategy.constitutional.map((right, index) => (
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

          {/* Library Resources */}
          {generated && libraryData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Library Resources & Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Library Authorities:</h4>
                    <div className="space-y-2">
                      {libraryData.libraryResources.authorities.map((authority, index) => (
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
                    <h4 className="font-semibold mb-2">Library Organizations:</h4>
                    <div className="space-y-2">
                      {libraryData.libraryResources.organizations.map((org, index) => (
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
                      {libraryData.libraryResources.support.map((support, index) => (
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

        {/* Library Rights */}
        <TabsContent value="rights" className="space-y-6">
          <div className="grid gap-4">
            {issueTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(type.category)}`}>
                        {getLibraryIcon(type.id)}
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

        {/* Library Guide */}
        <TabsContent value="guide" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Library className="h-5 w-5" />
                  Constitutional Basis for Library Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Article 19(1)(a)</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to freedom of speech and expression including library access.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Article 14</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to equality in library access and services.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Article 21</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to life with dignity including library access.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Library Helplines & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">National Library Helpline</h4>
                    <p className="text-sm text-gray-600">011-2338225</p>
                    <Badge variant="outline" className="mt-2">Library Support</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Constitutional Library Helpline</h4>
                    <p className="text-sm text-gray-600">011-2338225</p>
                    <Badge variant="outline" className="mt-2">Constitutional Support</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Digital Library Helpline</h4>
                    <p className="text-sm text-gray-600">011-2338225</p>
                    <Badge variant="outline" className="mt-2">Digital Library Support</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Library Templates & Forms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Constitutional Document Complaint</h4>
                    <p className="text-sm text-gray-600">Complete form for constitutional document complaint</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Copyright Violation Complaint</h4>
                    <p className="text-sm text-gray-600">Form for copyright violation complaint</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Public Access Complaint</h4>
                    <p className="text-sm text-gray-600">Form for public access violation complaint</p>
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