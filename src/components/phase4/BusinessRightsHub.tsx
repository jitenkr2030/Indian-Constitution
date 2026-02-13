'use client'

import { useState, useEffect } from 'react'
import { Building, Users, Phone, Clock, CheckCircle, AlertTriangle, FileText, MapPin, ChevronRight, Send, Copy, Download, Search, Calendar, Shield, Briefcase, TrendingUp, DollarSign } from 'lucide-react'
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

interface BusinessData {
  rightsStrategy: {
    immediate: string[]
    legal: string[]
    constitutional: string[]
    timeline: Record<string, string>
  }
  businessResources: {
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
    businessRegistrationCases: number
    businessOperationsCases: number
    intellectualPropertyCases: number
    consumerProtectionCases: number
    laborRightsCases: number
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

interface BusinessCase {
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

export default function BusinessRightsHub() {
  const [activeTab, setActiveTab] = useState('assistant')
  const [businessData, setBusinessData] = useState<BusinessData | null>(null)
  const [issueTypes, setIssueTypes] = useState<IssueType[]>([])
  const [recentCases, setRecentCases] = useState<BusinessCase[]>([])
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    rightsType: '',
    businessIssue: '',
    industryType: '',
    location: '',
    description: '',
    evidence: '',
    urgency: 'normal',
    language: 'en',
    businessInfo: {
      name: '',
      type: '',
      registration: '',
      phone: '',
      email: '',
      address: ''
    },
    ownerInfo: {
      name: '',
      phone: '',
      email: '',
      address: ''
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
      const response = await fetch('/api/business')
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
      const response = await fetch('/api/business')
      if (response.ok) {
        const data = await response.json()
        setRecentCases(data.data.recentCases)
      }
    } catch (error) {
      console.error('Error fetching recent cases:', error)
    }
  }

  const generateRightsStrategy = async () => {
    if (!formData.rightsType || !formData.businessInfo.name || !formData.businessIssue) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setBusinessData(data.data)
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

  const downloadBusinessPlan = () => {
    if (!businessData) return
    
    const plan = `
BUSINESS RIGHTS PROTECTION PLAN
==================================

Rights Type: ${formData.rightsType}
Business Issue: ${formData.businessIssue}
Industry Type: ${formData.industryType}
Business: ${formData.businessInfo.name}
Location: ${formData.location}
Urgency: ${formData.urgency}
Generated: ${new Date().toLocaleString()}

IMMEDIATE ACTIONS:
${businessData.rightsStrategy.immediate.map(action => `• ${action}`).join('\n')}

LEGAL OPTIONS:
${Object.entries(businessData.legalOptions).map(([key, option]) => `• ${key}: ${option.description} (${option.timeline})`).join('\n')}

CONSTITUTIONAL RIGHTS:
${businessData.rightsStrategy.constitutional.map(right => `• ${right}`).join('\n')}

TIMELINE:
${Object.entries(businessData.timeline).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

CONTACTS:
${businessData.contacts.map(contact => `• ${contact.name}: ${contact.phone}`).join('\n')}

DOCUMENTS NEEDED:
${businessData.rightsStrategy.legal.map(doc => `• ${doc}`).join('\n')}
    `.trim()

    const blob = new Blob([plan], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Business_Rights_Plan_${formData.rightsType}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getBusinessIcon = (type: string) => {
    switch (type) {
      case 'business_registration': return <Building className="h-5 w-5 text-blue-600" />
      case 'business_operations': return <Briefcase className="h-5 w-5 text-green-600" />
      case 'intellectual_property': return <Shield className="h-5 w-5 text-purple-600" />
      case 'consumer_protection': return <Users className="h-5 w-5 text-orange-600" />
      case 'labor_rights': return <Users className="h-5 w-5 text-red-600" />
      case 'tax_rights': return <DollarSign className="h-5 w-5 text-gray-600" />
      case 'environmental_compliance': return <TrendingUp className="h-5 w-5 text-yellow-600" />
      case 'foreign_investment': return <Globe className="h-5 w-5 text-pink-600" />
      default: return <Building className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'registration': return 'text-blue-600 bg-blue-50'
      case 'operations': return 'text-green-600 bg-green-50'
      case 'ip': return 'text-purple-600 bg-purple-50'
      case 'consumer': return 'text-orange-600 bg-orange-50'
      case 'labor': return 'text-red-600 bg-red-50'
      case 'tax': return 'text-gray-600 bg-gray-50'
      case 'environment': return 'text-yellow-600 bg-yellow-50'
      case 'investment': return 'text-pink-600 bg-pink-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-6 w-6 text-blue-600" />
            Business Rights Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Empower businesses with constitutional protection and legal assistance.
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary">Economic Empowerment</Badge>
            <Badge variant="outline">Constitutional Rights</Badge>
            <Badge variant="outline">Legal Support</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistant">Business Assistant</TabsTrigger>
          <TabsTrigger value="rights">Business Rights</TabsTrigger>
          <TabsTrigger value="cases">Success Stories</TabsTrigger>
          <TabsTrigger value="guide">Business Guide</TabsTrigger>
        </TabsList>

        {/* Business Assistant */}
        <TabsContent value="assistant" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generate Business Rights Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="rightsType">Business Rights Type *</Label>
                    <Select value={formData.rightsType} onValueChange={(value) => setFormData(prev => ({ ...prev, rightsType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business rights type" />
                      </SelectTrigger>
                      <SelectContent>
                        {issueTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              {getBusinessIcon(type.id)}
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="businessIssue">Business Issue *</Label>
                    <Input
                      id="businessIssue"
                      value={formData.businessIssue}
                      onChange={(e) => setFormData(prev => ({ ...prev, businessIssue: e.target.value }))}
                      placeholder="Type of business issue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="industryType">Industry Type</Label>
                    <Input
                      id="industryType"
                      value={formData.industryType}
                      onChange={(e) => setFormData(prev => ({ ...prev, industryType: e.target.value }))}
                      placeholder="Type of industry (manufacturing, services, etc.)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={formData.businessInfo.name}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        businessInfo: { ...prev.businessInfo, name: e.target.value }
                      }))}
                      placeholder="Business name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Input
                      id="businessType"
                      value={formData.businessInfo.type}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        businessInfo: { ...prev.businessInfo, type: e.target.value }
                      }))}
                      placeholder="Business type (private, public, partnership)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessRegistration">Business Registration</Label>
                    <Input
                      id="businessRegistration"
                      value={formData.businessInfo.registration}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        businessInfo: { ...prev.businessInfo, registration: e.target.value }
                      }))}
                      placeholder="Business registration number"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="businessPhone">Business Phone</Label>
                      <Input
                        id="businessPhone"
                        value={formData.businessInfo.phone}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          businessInfo: { ...prev.businessInfo, phone: e.target.value }
                        }))}
                        placeholder="Business phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="businessEmail">Business Email</Label>
                      <Input
                        id="businessEmail"
                        value={formData.businessInfo.email}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          businessInfo: { ...prev.businessInfo, email: e.target.value }
                        }))}
                        placeholder="Business email address"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="businessAddress">Business Address</Label>
                    <Textarea
                      id="businessAddress"
                      value={formData.businessInfo.address}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        businessInfo: { ...prev.businessInfo, address: e.target.value }
                      }))}
                      placeholder="Business complete address"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ownerName">Owner Name</Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerInfo.name}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        ownerInfo: { ...prev.ownerInfo, name: e.target.value }
                      }))}
                      placeholder="Business owner's name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ownerPhone">Owner Phone</Label>
                      <Input
                        id="ownerPhone"
                        value={formData.ownerInfo.phone}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          ownerInfo: { ...prev.ownerInfo, phone: e.target.value }
                        }))}
                        placeholder="Owner's phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="ownerEmail">Owner Email</Label>
                      <Input
                        id="ownerEmail"
                        value={formData.ownerInfo.email}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          ownerInfo: { ...prev.ownerInfo, email: e.target.value }
                        }))}
                        placeholder="Owner's email address"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="legalStructure">Legal Structure</Label>
                    <Select value={formData.legalStructure} onValueChange={(value) => setFormData(prev => ({ ...prev, legalStructure: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="llp">Limited Liability Partnership</SelectItem>
                        <SelectItem value="private_limited">Private Limited</SelectItem>
                        <SelectItem value="public_limited">Public Limited</SelectItem>
                        <SelectItem value="opc">One Person Company</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Location of business"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Issue Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the business issue in detail"
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
                      placeholder="Available business documents and records"
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
                  disabled={loading || !formData.rightsType || !formData.businessInfo.name || !formData.businessIssue}
                  className="w-full"
                >
                  {loading ? 'Generating...' : 'Generate Business Rights Strategy'}
                </Button>
              </CardContent>
            </Card>

            {generated && businessData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Business Rights Protection Strategy</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard('Business strategy copied to clipboard')}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadBusinessPlan}>
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
                        {businessData.rightsStrategy.immediate.map((action, index) => (
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
                          {Object.entries(businessData.legalOptions).map(([key, option]) => (
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
                          {businessData.rightsStrategy.constitutional.map((right, index) => (
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

          {/* Business Resources */}
          {generated && businessData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Business Resources & Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Business Authorities:</h4>
                    <div className="space-y-2">
                      {businessData.businessResources.authorities.map((authority, index) => (
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
                    <h4 className="font-semibold mb-2">Business Organizations:</h4>
                    <div className="space-y-2">
                      {businessData.businessResources.organizations.map((org, index) => (
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
                      {businessData.businessResources.support.map((support, index) => (
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

        {/* Business Rights */}
        <TabsContent value="rights" className="space-y-6">
          <div className="grid gap-4">
            {issueTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(type.category)}`}>
                        {getBusinessIcon(type.id)}
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

        {/* Business Guide */}
        <TabsContent value="guide" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Constitutional Basis for Business Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Article 19(1)(g)</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to practice any profession, trade or business.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Article 14</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to equality in business and profession.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Article 21</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to life with dignity including business activities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Business Helplines & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Business Support Helpline</h4>
                    <p className="text-sm text-gray-600">011-2338225</p>
                    <Badge variant="outline" className="mt-2">Business Support</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Corporate Affairs Helpline</h4>
                    <p className="text-sm text-gray-600">011-2338225</p>
                    <Badge variant="outline" className="mt-2">Corporate Affairs</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">MSME Support Helpline</h4>
                    <p className="text-sm text-gray-600">011-2338225</p>
                    <Badge variant="outline" className="mt-2">MSME Support</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Business Templates & Forms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Business Registration Complaint</h4>
                    <p className="text-sm text-gray-600">Complete form for business registration complaint</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Consumer Protection Complaint</h4>
                    <p className="text-sm text-gray-600">Form for consumer protection violation complaint</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Intellectual Property Complaint</h4>
                    <p className="text-sm text-gray-600">Form for intellectual property violation complaint</p>
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