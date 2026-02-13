'use client'

import { useState, useEffect } from 'react'
import { Tractor, Users, Phone, Clock, CheckCircle, AlertTriangle, FileText, MapPin, ChevronRight, Send, Copy, Download, Search, Calendar, Shield, Sprout, Land, Seedling } from 'lucide-react'
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

interface AgricultureData {
  rightsStrategy: {
    immediate: string[]
    legal: string[]
    constitutional: string[]
    timeline: Record<string, string>
  }
  agricultureResources: {
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
    farmerRightsCases: number
    landRightsCases: number
    cropInsuranceCases: number
    subsidyCases: number
    marketAccessCases: number
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

interface AgricultureCase {
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

export default function AgricultureFarmerRights() {
  const [activeTab, setActiveTab] = useState('assistant')
  const [agricultureData, setAgricultureData] = useState<AgricultureData | null>(null)
  const [issueTypes, setIssueTypes] = useState<IssueType[]>([])
  const [recentCases, setRecentCases] = useState<AgricultureCase[]>([])
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    rightsType: '',
    agricultureIssue: '',
    landType: '',
    location: '',
    description: '',
    evidence: '',
    urgency: 'normal',
    language: 'en',
    farmerInfo: {
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      address: ''
    },
    landownerInfo: {
      name: '',
      phone: '',
      address: ''
    },
    cropDetails: {
      type: '',
      season: '',
      area: '',
      yield: ''
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
      const response = await fetch('/api/agriculture')
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
      const response = await fetch('/api/agriculture')
      if (response.ok) {
        const data = await response.json()
        setRecentCases(data.data.recentCases)
      }
    } catch (error) {
      console.error('Error fetching recent cases:', error)
    }
  }

  const generateRightsStrategy = async () => {
    if (!formData.rightsType || !formData.farmerInfo.name || !formData.agricultureIssue) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/agriculture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setAgricultureData(data.data)
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

  const downloadAgriculturePlan = () => {
    if (!agricultureData) return
    
    const plan = `
AGRICULTURE RIGHTS PROTECTION PLAN
==================================

Rights Type: ${formData.rightsType}
Agriculture Issue: ${formData.agricultureIssue}
Land Type: ${formData.landType}
Farmer: ${formData.farmerInfo.name}
Location: ${formData.location}
Urgency: ${formData.urgency}
Generated: ${new Date().toLocaleString()}

IMMEDIATE ACTIONS:
${agricultureData.rightsStrategy.immediate.map(action => `• ${action}`).join('\n')}

LEGAL OPTIONS:
${Object.entries(agricultureData.legalOptions).map(([key, option]) => `• ${key}: ${option.description} (${option.timeline})`).join('\n')}

CONSTITUTIONAL RIGHTS:
${agricultureData.rightsStrategy.constitutional.map(right => `• ${right}`).join('\n')}

TIMELINE:
${Object.entries(agricultureData.timeline).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

CONTACTS:
${agricultureData.contacts.map(contact => `• ${contact.name}: ${contact.phone}`).join('\n')}

DOCUMENTS NEEDED:
${agricultureData.rightsStrategy.legal.map(doc => `• ${doc}`).join('\n')}
    `.trim()

    const blob = new Blob([plan], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Agriculture_Rights_Plan_${formData.rightsType}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getAgricultureIcon = (type: string) => {
    switch (type) {
      case 'farmer_rights': return <Tractor className="h-5 w-5 text-green-600" />
      case 'land_rights': return <Land className="h-5 w-5 text-brown-600" />
      case 'crop_insurance': return <Shield className="h-5 w-5 text-blue-600" />
      case 'agricultural_subsidies': return <Seedling className="h-5 w-5 text-purple-600" />
      case 'market_access': return <MapPin className="h-5 w-5 text-orange-600" />
      case 'agricultural_labor': return <Users className="h-5 w-5 text-red-600" />
      case 'agricultural_technology': return <Sprout className="h-5 w-5 text-pink-600" />
      case 'environmental_protection': return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      default: return <Tractor className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'rights': return 'text-green-600 bg-green-50'
      case 'insurance': return 'text-blue-600 bg-blue-50'
      case 'subsidy': return 'text-purple-600 bg-purple-50'
      case 'market': return 'text-orange-600 bg-orange-50'
      case 'labor': return 'text-red-600 bg-red-50'
      case 'technology': return 'text-pink-600 bg-pink-50'
      case 'environment': return 'text-yellow-600 bg-yellow-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tractor className="h-6 w-6 text-green-600" />
            Agriculture & Farmer Rights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Protect and promote agriculture and farmer rights with constitutional protection and legal assistance.
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary">Large Population Segment</Badge>
            <Badge variant="outline">Constitutional Rights</Badge>
            <Badge variant="outline">Legal Support</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistant">Agriculture Assistant</TabsTrigger>
          <TabsTrigger value="rights">Agriculture Rights</TabsTrigger>
          <TabsTrigger value="cases">Success Stories</TabsTrigger>
          <TabsTrigger value="guide">Agriculture Guide</TabsTrigger>
        </TabsList>

        {/* Agriculture Assistant */}
        <TabsContent value="assistant" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generate Agriculture Rights Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="rightsType">Agriculture Rights Type *</Label>
                    <Select value={formData.rightsType} onValueChange={(value) => setFormData(prev => ({ ...prev, rightsType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select agriculture rights type" />
                      </SelectTrigger>
                      <SelectContent>
                        {issueTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              {getAgricultureIcon(type.id)}
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="agricultureIssue">Agriculture Issue *</Label>
                    <Input
                      id="agricultureIssue"
                      value={formData.agricultureIssue}
                      onChange={(e) => setFormData(prev => ({ ...prev, agricultureIssue: e.target.value }))}
                      placeholder="Type of agriculture issue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="landType">Land Type</Label>
                    <Input
                      id="landType"
                      value={formData.landType}
                      onChange={(e) => setFormData(prev => ({ ...prev, landType: e.target.value }))}
                      placeholder="Type of agricultural land"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Location of agricultural land"
                    />
                  </div>
                  <div>
                    <Label htmlFor="farmerName">Farmer Name *</Label>
                    <Input
                      id="farmerName"
                      value={formData.farmerInfo.name}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        farmerInfo: { ...prev.farmerInfo, name: e.target.value }
                      }))}
                      placeholder="Farmer's full name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="farmerPhone">Farmer Phone</Label>
                      <Input
                        id="farmerPhone"
                        value={formData.farmerInfo.phone}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          farmerInfo: { ...prev.farmerInfo, phone: e.target.value }
                        }))}
                        placeholder="Farmer's phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="farmerEmail">Farmer Email</Label>
                      <Input
                        id="farmerEmail"
                        value={formData.farmerInfo.email}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          farmerInfo: { ...prev.farmerInfo, email: e.target.value }
                        }))}
                        placeholder="Farmer's email address"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="farmerAddress">Farmer Address</Label>
                    <Textarea
                      id="farmerAddress"
                      value={formData.farmerInfo.address}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        farmerInfo: { ...prev.farmerInfo, address: e.target.value }
                      }))}
                      placeholder="Farmer's complete address"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="farmerAge">Farmer Age</Label>
                      <Input
                        id="farmerAge"
                        value={formData.farmerInfo.age}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          farmerInfo: { ...prev.farmerInfo, age: e.target.value }
                        }))}
                        placeholder="Farmer's age"
                      />
                    </div>
                    <div>
                      <Label htmlFor="farmerGender">Farmer Gender</Label>
                      <Select value={formData.farmerInfo.gender} onValueChange={(value) => setFormData(prev => ({ 
                        ...prev, 
                        farmerInfo: { ...prev.farmerInfo, gender: value }
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
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Input
                      id="cropType"
                      value={formData.cropDetails.type}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        cropDetails: { ...prev.cropDetails, type: e.target.value }
                      }))}
                      placeholder="Type of crop cultivated"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cropSeason">Crop Season</Label>
                    <Input
                      id="cropSeason"
                      value={formData.cropDetails.season}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        cropDetails: { ...prev.cropDetails, season: e.target.value }
                      }))}
                      placeholder="Growing season"
                    />
                  </div>
                  <div>
                    <Label htmlFor="landownerName">Landowner Name</Label>
                    <Input
                      id="landownerName"
                      value={formData.landownerInfo.name}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        landownerInfo: { ...prev.landownerInfo, name: e.target.value }
                      }))}
                      placeholder="Landowner's name (if applicable)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="landownerPhone">Landowner Phone</Label>
                    <Input
                      id="landownerPhone"
                      value={formData.landownerInfo.phone}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        landownerInfo: { ...prev.landownerInfo, phone: e.target.value }
                      }))}
                      placeholder="Landowner's phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Issue Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the agriculture issue in detail"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="evidence">Evidence</Label>
                    <Textarea
                      id="evidence"
                      value={formData.evidence}
                      onChange={(e) => setFormData(prev => ({ ...prev, evidence: e.target.value }))}
                      placeholder="List any evidence you have (photos, documents, etc.)"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="documents">Documents</Label>
                    <Textarea
                      id="documents"
                      value={formData.documents}
                      onChange={(e) => setFormData(prev => ({ ...prev, documents: e.target.value }))}
                      placeholder="Available agriculture documents and records"
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
                  disabled={loading || !formData.rightsType || !formData.farmerInfo.name || !formData.agricultureIssue}
                  className="w-full"
                >
                  {loading ? 'Generating...' : 'Generate Agriculture Rights Strategy'}
                </Button>
              </CardContent>
            </Card>

            {generated && agricultureData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Agriculture Rights Protection Strategy</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard('Agriculture strategy copied to clipboard')}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadAgriculturePlan}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-800">Immediate Actions:</h4>
                      <ul className="mt-2 space-y-1">
                        {agricultureData.rightsStrategy.immediate.map((action, index) => (
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
                          {Object.entries(agricultureData.legalOptions).map(([key, option]) => (
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
                          {agricultureData.rightsStrategy.constitutional.map((right, index) => (
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

          {/* Agriculture Resources */}
          {generated && agricultureData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Agriculture Resources & Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Agriculture Authorities:</h4>
                    <div className="space-y-2">
                      {agricultureData.agricultureResources.authorities.map((authority, index) => (
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
                    <h4 className="font-semibold mb-2">Agriculture Organizations:</h4>
                    <div className="space-y-2">
                      {agricultureData.agricultureResources.organizations.map((org, index) => (
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
                      {agricultureData.agricultureResources.support.map((support, index) => (
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

        {/* Agriculture Rights */}
        <TabsContent value="rights" className="space-y-6">
          <div className="grid gap-4">
            {issueTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(type.category)}`}>
                        {getAgricultureIcon(type.id)}
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

        {/* Agriculture Guide */}
        <TabsContent value="guide" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tractor className="h-5 w-5" />
                  Constitutional Basis for Agriculture Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Article 21</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to livelihood through agriculture and related activities.
                    </p>
                  </div>
                  <div className="p-4 bg-brown-50 rounded-lg">
                    <h4 className="font-semibold text-brown-800">Article 19(1)(g)</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to practice any profession, including agriculture.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Article 14</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to equality in agricultural opportunities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Agriculture Helplines & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Agriculture Department Helpline</h4>
                    <p className="text-sm text-gray-600">011-2338225</p>
                    <Badge variant="outline" className="mt-2">Agriculture Support</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Farmer Support Helpline</h4>
                    <p className="text-sm text-gray-600">1800-11-3377</p>
                    <Badge variant="outline" className="mt-2">Farmer Rights</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Crop Insurance Helpline</h4>
                    <p className="text-sm text-gray-600">1800-11-3377</p>
                    <Badge variant="outline" className="mt-2">Crop Insurance</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Agriculture Templates & Forms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Farmer Rights Complaint</h4>
                    <p className="text-sm text-gray-600">Complete form for farmer rights violation complaint</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Land Rights Complaint</h4>
                    <p className="text-sm text-gray-600">Form for land rights violation complaint</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Crop Insurance Claim</h4>
                    <p className="text-sm text-gray-600">Form for crop insurance claim</p>
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