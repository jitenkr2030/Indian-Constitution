'use client'

import { useState, useEffect } from 'react'
import { Shield, Smartphone, Lock, Users, Globe, Phone, Clock, CheckCircle, AlertTriangle, FileText, MapPin, ChevronRight, Send, Copy, Download, Search, Calendar, Monitor } from 'lucide-react'
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

interface DigitalRightsData {
  rightsStrategy: {
    immediate: string[]
    digital: string[]
    constitutional: string[]
    timeline: Record<string, string>
  }
  rightsResources: {
    authorities: Array<{ name: string; phone: string; type: string }>
    organizations: Array<{ name: string; phone: string; type: string }>
    technical: Array<{ name: string; phone: string; type: string }>
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
    dataBreaches: number
    cyberCrimes: number
    accessibilityIssues: number
    internetFreedomViolations: number
    lastUpdated: string
  }
  constitutionalBasis: {
    primary: { article: string; title: string; description: string }
    secondary: { article: string; title: string; description: string }
    landmark: { case: string; title: string; description: string }
    legislation: { act: string; title: string; description: string }
  }
}

interface RightsType {
  id: string
  name: string
  description: string
  category: string
  urgency: string
  constitutional: string[]
  legal: string[]
  timeline: string
}

interface DigitalCase {
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

export default function DigitalRightsHub() {
  const [activeTab, setActiveTab] = useState('assistant')
  const [digitalData, setDigitalData] = useState<DigitalRightsData | null>(null)
  const [rightsTypes, setRightsTypes] = useState<RightsType[]>([])
  const [recentCases, setRecentCases] = useState<DigitalCase[]>([])
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    rightsType: '',
    violationType: '',
    platform: '',
    description: '',
    evidence: '',
    urgency: 'normal',
    language: 'en',
    victimInfo: {
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      address: ''
    },
    perpetratorInfo: {
      name: '',
      platform: '',
      type: '',
      phone: '',
      address: ''
    },
    location: '',
    digitalEvidence: '',
    legalAction: false
  })

  useEffect(() => {
    fetchRightsTypes()
    fetchRecentCases()
  }, [])

  const fetchRightsTypes = async () => {
    try {
      const response = await fetch('/api/digital-rights')
      if (response.ok) {
        const data = await response.json()
        setRightsTypes(data.data.rightsTypes)
        setRecentCases(data.data.recentCases)
      }
    } catch (error) {
      console.error('Error fetching rights types:', error)
    }
  }

  const fetchRecentCases = async () => {
    try {
      const response = await fetch('/api/digital-rights')
      if (response.ok) {
        const data = await response.json()
        setRecentCases(data.data.recentCases)
      }
    } catch (error) {
      console.error('Error fetching recent cases:', error)
    }
  }

  const generateRightsStrategy = async () => {
    if (!formData.rightsType || !formData.victimInfo.name || !formData.description) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/digital-rights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setDigitalData(data.data)
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

  const downloadRightsPlan = () => {
    if (!digitalData) return
    
    const plan = `
DIGITAL RIGHTS PROTECTION PLAN
=================================

Rights Type: ${formData.rightsType}
Violation Type: ${formData.violationType}
Platform: ${formData.platform}
Victim: ${formData.victimInfo.name}
Location: ${formData.location}
Urgency: ${formData.urgency}
Generated: ${new Date().toLocaleString()}

IMMEDIATE ACTIONS:
${digitalData.rightsStrategy.immediate.map(action => `• ${action}`).join('\n')}

DIGITAL OPTIONS:
${digitalData.rightsStrategy.digital.map(action => `• ${action}`).join('\n')}

LEGAL OPTIONS:
${Object.entries(digitalData.legalOptions).map(([key, option]) => `• ${key}: ${option.description} (${option.timeline})`).join('\n')}

CONSTITUTIONAL RIGHTS:
${digitalData.rightsStrategy.constitutional.map(right => `• ${right}`).join('\n')}

TIMELINE:
${Object.entries(digitalData.timeline).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

CONTACTS:
${digitalData.contacts.map(contact => `• ${contact.name}: ${contact.phone}`).join('\n')}

DOCUMENTS NEEDED:
${digitalData.rightsStrategy.digital.map(doc => `• ${doc}`).join('\n')}
    `.trim()

    const blob = new Blob([plan], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Digital_Rights_Plan_${formData.rightsType}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getDigitalIcon = (type: string) => {
    switch (type) {
      case 'data_privacy': return <Lock className="h-5 w-5 text-blue-600" />
      case 'online_harassment': return <Shield className="h-5 w-5 text-orange-600" />
      case 'cyber_crime': return <Monitor className="h-5 w-5 text-red-600" />
      case 'digital_safety': return <Smartphone className="h-5 w-5 text-green-600" />
      case 'internet_freedom': return <Globe className="h-5 w-5 text-purple-600" />
      case 'intellectual_property': return <FileText className="h-5 w-5 text-gray-600" />
      case 'access_rights': return <Users className="h-5 w-5 text-blue-600" />
      case 'platform_accountability': return <Shield className="h-5 w-5 text-gray-600" />
      default: return <Shield className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'privacy': return 'text-blue-600 bg-blue-50'
      case 'safety': return 'text-green-600 bg-green-50'
      case 'security': return 'text-red-600 bg-red-50'
      case 'freedom': return 'text-purple-600 bg-purple-50'
      case 'property': return 'text-gray-600 bg-gray-50'
      case 'accessibility': return 'text-blue-600 bg-blue-50'
      case 'accountability': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-blue-600" />
            Digital Rights Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Protect and promote digital rights with constitutional protection, legal assistance, and cybersecurity support.
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary">Increasingly Needed</Badge>
            <Badge variant="outline">Constitutional Rights</Badge>
            <Badge variant="outline">Digital Security</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistant">Digital Assistant</TabsTrigger>
          <TabsTrigger value="rights">Digital Rights</TabsTrigger>
          <TabsTrigger value="cases">Success Stories</TabsTrigger>
          <TabsTrigger value="guide">Digital Guide</TabsTrigger>
        </TabsList>

        {/* Digital Assistant */}
        <TabsContent value="assistant" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generate Digital Rights Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="rightsType">Digital Rights Type *</Label>
                    <Select value={formData.rightsType} onValueChange={(value) => setFormData(prev => ({ ...prev, rightsType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select digital rights type" />
                      </SelectTrigger>
                      <SelectContent>
                        {rightsTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              {getDigitalIcon(type.id)}
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="violationType">Violation Type</Label>
                    <Select value={formData.violationType} onValueChange={(value) => setFormData(prev => ({ ...prev, violationType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select violation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="privacy">Privacy Violation</SelectItem>
                        <SelectItem value="harassment">Online Harassment</SelectItem>
                        <SelectItem value="cyber_crime">Cyber Crime</SelectItem>
                        <SelectItem value="censorship">Censorship</SelectItem>
                        <SelectItem value="surveillance">Surveillance</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Input
                      id="platform"
                      value={formData.platform}
                      onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
                      placeholder="Digital platform (e.g., Facebook, Twitter, Instagram)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="victimName">Victim Name *</Label>
                    <Input
                      id="victimName"
                      value={formData.victimInfo.name}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        victimInfo: { ...prev.victimInfo, name: e.target.value }
                      }))}
                      placeholder="Victim's name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="victimPhone">Victim Phone</Label>
                      <Input
                        id="victimPhone"
                        value={formData.victimInfo.phone}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          victimInfo: { ...prev.victimInfo, phone: e.target.value }
                        }))}
                        placeholder="Victim's phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="victimEmail">Victim Email</Label>
                      <Input
                        id="victimEmail"
                        value={formData.victimInfo.email}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          victimInfo: { ...prev.victimInfo, email: e.target.value }
                        }))}
                        placeholder="Victim's email address"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="perpetratorName">Perpetrator Name</Label>
                    <Input
                      id="perpetratorName"
                      value={formData.perpetratorInfo.name}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        perpetratorInfo: { ...prev.perpetratorInfo, name: e.target.value }
                      }))}
                      placeholder="Perpetrator's name (if known)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Location of digital rights violation"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Violation Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the digital rights violation in detail"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="digitalEvidence">Digital Evidence</Label>
                    <Textarea
                      id="digitalEvidence"
                      value={formData.digitalEvidence}
                      onChange={(e) => setFormData(prev => ({ ...prev, digitalEvidence: e.target.value }))}
                      placeholder="List any digital evidence (screenshots, logs, URLs)"
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
                  disabled={loading || !formData.rightsType || !formData.victimInfo.name || !formData.description}
                  className="w-full"
                >
                  {loading ? 'Generating...' : 'Generate Digital Rights Strategy'}
                </Button>
              </CardContent>
            </Card>

            {generated && digitalData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Digital Rights Protection Strategy</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard('Digital rights strategy copied to clipboard')}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadRightsPlan}>
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
                        {digitalData.rightsStrategy.immediate.map((action, index) => (
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
                          {Object.entries(digitalData.legalOptions).map(([key, option]) => (
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
                          {digitalData.rightsStrategy.constitutional.map((right, index) => (
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

          {/* Digital Resources */}
          {generated && digitalData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Digital Rights Resources & Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Digital Authorities:</h4>
                    <div className="space-y-2">
                      {digitalData.rightsResources.authorities.map((authority, index) => (
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
                    <h4 className="font-semibold mb-2">Digital Organizations:</h4>
                    <div className="space-y-2">
                      {digitalData.rightsResources.organizations.map((org, index) => (
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
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Digital Rights */}
        <TabsContent value="rights" className="space-y-6">
          <div className="grid gap-4">
            {rightsTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(type.category)}`}>
                        {getDigitalIcon(type.id)}
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

        {/* Digital Guide */}
        <TabsContent value="guide" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Constitutional Basis for Digital Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Article 21</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to life and personal liberty - includes right to digital privacy and online freedom.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Article 19(1)(a)</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to freedom of speech and expression - protects online speech and digital communication.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Article 14</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to equality - ensures equal digital rights and protection for all citizens.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Digital Rights Helplines & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Data Protection Authority</h4>
                    <p className="text-sm text-gray-600">1800-123-4567</p>
                    <Badge variant="outline" className="mt-2">Regulatory Authority</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Cyber Cell</h4>
                    <p className="text-sm text-gray-600">011-23381789</p>
                    <Badge variant="outline" className="mt-2">Cyber Crime</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">CERT-In</h4>
                    <p className="text-sm text-gray-600">1800-425-1519</p>
                    <Badge variant="outline" className="mt-2">Technical Support</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Digital Rights Templates & Forms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Data Privacy Complaint</h4>
                    <p className="text-sm text-gray-600">Complete form for data privacy violation</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Online Harassment Complaint</h4>
                    <p className="text-sm text-gray-600">Form for online harassment complaint</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Cyber Crime Report</h4>
                    <p className="text-sm text-gray-600">Form for cyber crime reporting</p>
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