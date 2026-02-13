'use client'

import { useState, useEffect } from 'react'
import { Globe, Users, Phone, Clock, CheckCircle, AlertTriangle, FileText, MapPin, ChevronRight, Send, Copy, Download, Search, Calendar, Shield, Plane, CreditCard, Home, Briefcase } from 'lucide-react'
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

interface NRIData {
  rightsStrategy: {
    immediate: string[]
    legal: string[]
    constitutional: string[]
    timeline: Record<string, string>
  }
  nriResources: {
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
    nriInvestmentCases: number
    nriPropertyCases: number
    nriBankingCases: number
    nriTaxationCases: number
    nriEducationCases: number
    nriHealthcareCases: number
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

interface NRICase {
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

export default function NRIForeignRights() {
  const [activeTab, setActiveTab] = useState('assistant')
  const [nriData, setNRIData] = useState<NRIData | null>(null)
  const [issueTypes, setIssueTypes] = useState<IssueType[]>([])
  const [recentCases, setRecentCases] = useState<NRICase[]>([])
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    rightsType: '',
    nriIssue: '',
    country: '',
    location: '',
    description: '',
    evidence: '',
    urgency: 'normal',
    language: 'en',
    nriInfo: {
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      address: ''
    },
    propertyInfo: {
      type: '',
      location: '',
      value: '',
      details: ''
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
      const response = await fetch('/api/nri')
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
      const response = await fetch('/api/nri')
      if (response.ok) {
        const data = await response.json()
        setRecentCases(data.data.recentCases)
      }
    } catch (error) {
      console.error('Error fetching recent cases:', error)
    }
  }

  const generateRightsStrategy = async () => {
    if (!formData.rightsType || !formData.nriInfo.name || !formData.nriIssue) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/nri', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setNRIData(data.data)
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

  const downloadNRIPlan = () => {
    if (!nriData) return
    
    const plan = `
NRI & FOREIGN RIGHTS PROTECTION PLAN
==================================

Rights Type: ${formData.rightsType}
NRI Issue: ${formData.nriIssue}
Country: ${formData.country}
NRI: ${formData.nriInfo.name}
Location: ${formData.location}
Urgency: ${formData.urgency}
Generated: ${new Date().toLocaleString()}

IMMEDIATE ACTIONS:
${nriData.rightsStrategy.immediate.map(action => `• ${action}`).join('\n')}

LEGAL OPTIONS:
${Object.entries(nriData.legalOptions).map(([key, option]) => `• ${key}: ${option.description} (${option.timeline})`).join('\n')}

CONSTITUTIONAL RIGHTS:
${nriData.rightsStrategy.constitutional.map(right => `• ${right}`).join('\n')}

TIMELINE:
${Object.entries(nriData.timeline).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

CONTACTS:
${nriData.contacts.map(contact => `• ${contact.name}: ${contact.phone}`).join('\n')}

DOCUMENTS NEEDED:
${nriData.rightsStrategy.legal.map(doc => `• ${doc}`).join('\n')}
    `.trim()

    const blob = new Blob([plan], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `NRI_Rights_Plan_${formData.rightsType}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getNRIIcon = (type: string) => {
    switch (type) {
      case 'nri_investment': return <Briefcase className="h-5 w-5 text-blue-600" />
      case 'nri_property': return <Home className="h-5 w-5 text-green-600" />
      case 'nri_banking': return <CreditCard className="h-5 w-5 text-purple-600" />
      case 'nri_taxation': return <Plane className="h-5 w-5 text-orange-600" />
      case 'nri_education': return <FileText className="h-5 w-5 text-gray-600" />
      case 'nri_healthcare': return <Shield className="h-5 w-5 text-red-600" />
      case 'nri_consular': return <Globe className="h-5 w-5 text-pink-600" />
      case 'nri_retirement': return <Users className="h-5 w-5 text-brown-600" />
      default: return <Globe className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'investment': return 'text-blue-600 bg-blue-50'
      case 'property': return 'text-green-600 bg-green-50'
      case 'banking': return 'text-purple-600 bg-purple-50'
      case 'tax': return 'text-orange-600 bg-orange-50'
      case 'education': return 'text-gray-600 bg-gray-50'
      case 'healthcare': return 'text-red-600 bg-red-50'
      case 'consular': return 'text-pink-600 bg-pink-50'
      case 'retirement': return 'text-brown-600 bg-brown-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-blue-600" />
            NRI & Foreign Rights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Protect NRI and foreign rights with constitutional protection and legal assistance.
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary">Global Indian Community</Badge>
            <Badge variant="outline">Constitutional Rights</Badge>
            <Badge variant="outline">Legal Support</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistant">NRI Assistant</TabsTrigger>
          <TabsTrigger value="rights">NRI Rights</TabsTrigger>
          <TabsTrigger value="cases">Success Stories</TabsTrigger>
          <TabsTrigger value="guide">NRI Guide</TabsTrigger>
        </TabsList>

        {/* NRI Assistant */}
        <TabsContent value="assistant" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generate NRI Rights Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="rightsType">NRI Rights Type *</Label>
                    <Select value={formData.rightsType} onValueChange={(value) => setFormData(prev => ({ ...prev, rightsType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select NRI rights type" />
                      </SelectTrigger>
                      <SelectContent>
                        {issueTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              {getNRIIcon(type.id)}
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="nriIssue">NRI Issue *</Label>
                    <Input
                      id="nriIssue"
                      value={formData.nriIssue}
                      onChange={(e) => setFormData(prev => ({ ...prev, nriIssue: e.target.value }))}
                      placeholder="Type of NRI issue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                      placeholder="Current country of residence"
                    />
                  </div>
                  <div>
                    <Label htmlFor="nriName">NRI Name *</Label>
                    <Input
                      id="nriName"
                      value={formData.nriInfo.name}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        nriInfo: { ...prev.nriInfo, name: e.target.value }
                      }))}
                      placeholder="NRI's full name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nriPhone">NRI Phone</Label>
                      <Input
                        id="nriPhone"
                        value={formData.nriInfo.phone}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          nriInfo: { ...prev.nriInfo, phone: e.target.value }
                        }))}
                        placeholder="NRI's phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nriEmail">NRI Email</Label>
                      <Input
                        id="nriEmail"
                        value={formData.nriInfo.email}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          nriInfo: { ...prev.nriInfo, email: e.target.value }
                        }))}
                        placeholder="NRI's email address"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="nriAddress">NRI Address</Label>
                    <Textarea
                      id="nriAddress"
                      value={formData.nriInfo.address}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        nriInfo: { ...prev.nriInfo, address: e.target.value }
                      }))}
                      placeholder="NRI's complete address"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nriAge">NRI Age</Label>
                      <Input
                        id="nriAge"
                        value={formData.nriInfo.age}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          nriInfo: { ...prev.nriInfo, age: e.target.value }
                        }))}
                        placeholder="NRI's age"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nriGender">NRI Gender</Label>
                      <Select value={formData.nriInfo.gender} onValueChange={(value) => setFormData(prev => ({ 
                        ...prev, 
                        nriInfo: { ...prev.nriInfo, gender: value }
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
                    <Label htmlFor="propertyType">Property Type</Label>
                    <Input
                      id="propertyType"
                      value={formData.propertyInfo.type}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        propertyInfo: { ...prev.propertyInfo, type: e.target.value }
                      }))}
                      placeholder="Type of property (residential, commercial)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyLocation">Property Location</Label>
                    <Input
                      id="propertyLocation"
                      value={formData.propertyInfo.location}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        propertyInfo: { ...prev.propertyInfo, location: e.target.value }
                      }))}
                      placeholder="Property location in India"
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyValue">Property Value</Label>
                    <Input
                      id="propertyValue"
                      value={formData.propertyInfo.value}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        propertyInfo: { ...prev.propertyInfo, value: e.target.value }
                      }))}
                      placeholder="Property value in INR"
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
                        <SelectItem value="huf">Hindu Undivided Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Location in India"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Issue Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the NRI issue in detail"
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
                      placeholder="Available NRI documents and records"
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
                  disabled={loading || !formData.rightsType || !formData.nriInfo.name || !formData.nriIssue}
                  className="w-full"
                >
                  {loading ? 'Generating...' : 'Generate NRI Rights Strategy'}
                </Button>
              </CardContent>
            </Card>

            {generated && nriData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>NRI Rights Protection Strategy</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard('NRI strategy copied to clipboard')}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadNRIPlan}>
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
                        {nriData.rightsStrategy.immediate.map((action, index) => (
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
                          {Object.entries(nriData.legalOptions).map(([key, option]) => (
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
                          {nriData.rightsStrategy.constitutional.map((right, index) => (
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

          {/* NRI Resources */}
          {generated && nriData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  NRI Resources & Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">NRI Authorities:</h4>
                    <div className="space-y-2">
                      {nriData.nriResources.authorities.map((authority, index) => (
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
                    <h4 className="font-semibold mb-2">NRI Organizations:</h4>
                    <div className="space-y-2">
                      {nriData.nriResources.organizations.map((org, index) => (
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
                      {nriData.nriResources.support.map((support, index) => (
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

        {/* NRI Rights */}
        <TabsContent value="rights" className="space-y-6">
          <div className="grid gap-4">
            {issueTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(type.category)}`}>
                        {getNRIIcon(type.id)}
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

        {/* NRI Guide */}
        <TabsContent value="guide" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Constitutional Basis for NRI Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Article 19(1)(g)</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to practice any profession, trade or business including NRIs.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Article 14</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to equality for NRIs and foreign citizens.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Article 21</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to life with dignity including consular protection.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  NRI Helplines & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">NRI Support Helpline</h4>
                    <p className="text-sm text-gray-600">011-2338225</p>
                    <Badge variant="outline" className="mt-2">NRI Support</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">NRI Investment Helpline</h4>
                    <p className="text-sm text-gray-600">011-2338225</p>
                    <Badge variant="outline" className="mt-2">NRI Investment</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">NRI Property Helpline</h4>
                    <p className="text-sm text-gray-600">011-2338225</p>
                    <Badge variant="outline" className="mt-2">NRI Property</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  NRI Templates & Forms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">NRI Investment Complaint</h4>
                    <p className="text-sm text-gray-600">Complete form for NRI investment complaint</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">NRI Property Complaint</h4>
                    <p className="text-sm text-gray-600">Form for NRI property violation complaint</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">NRI Banking Complaint</h4>
                    <p className="text-sm text-gray-600">Form for NRI banking violation complaint</p>
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