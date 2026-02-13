'use client'

import { useState, useEffect } from 'react'
import { Heart, Shield, Users, Phone, Clock, CheckCircle, AlertTriangle, FileText, MapPin, ChevronRight, Send, Copy, Download, Search, Calendar } from 'lucide-react'
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

interface WomenRightsData {
  rightsStrategy: {
    immediate: string[]
    legal: string[]
    constitutional: string[]
    timeline: Record<string, string>
  }
  rightsResources: {
    helplines: Array<{ name: string; phone: string; type: string; is247?: boolean }>
    organizations: Array<{ name: string; phone: string; type: string }>
    legal: Array<{ name: string; phone: string; type: string }>
    shelters: Array<{ name: string; phone: string; type: string }>
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
    totalCases: number
    successRate: number
    averageResolutionTime: number
    protectionOrders: number
    helplineCalls: number
    shelters: number
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

interface RightsCase {
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

export default function WomensRightsEmpowerment() {
  const [activeTab, setActiveTab] = useState('assistant')
  const [rightsData, setRightsData] = useState<WomenRightsData | null>(null)
  const [rightsTypes, setRightsTypes] = useState<RightsType[]>([])
  const [recentCases, setRecentCases] = useState<RightsCase[]>([])
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    rightsType: '',
    incidentType: '',
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
      relation: '',
      phone: '',
      address: ''
    },
    location: '',
    description: '',
    urgency: 'normal',
    language: 'en',
    evidence: '',
    legalAction: false
  })

  useEffect(() => {
    fetchRightsTypes()
    fetchRecentCases()
  }, [])

  const fetchRightsTypes = async () => {
    try {
      const response = await fetch('/api/womens-rights')
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
      const response = await fetch('/api/womens-rights')
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
      const response = await fetch('/api/womens-rights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setRightsData(data.data)
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
    if (!rightsData) return
    
    const plan = `
WOMEN'S RIGHTS PROTECTION PLAN
================================

Rights Type: ${formData.rightsType}
Incident Type: ${formData.incidentType}
Victim: ${formData.victimInfo.name}
Location: ${formData.location}
Urgency: ${formData.urgency}
Generated: ${new Date().toLocaleString()}

IMMEDIATE ACTIONS:
${rightsData.rightsStrategy.immediate.map(action => `• ${action}`).join('\n')}

LEGAL OPTIONS:
${Object.entries(rightsData.legalOptions).map(([key, option]) => `• ${key}: ${option.description} (${option.timeline})`).join('\n')}

CONSTITUTIONAL RIGHTS:
${rightsData.rightsStrategy.constitutional.map(right => `• ${right}`).join('\n')}

TIMELINE:
${Object.entries(rightsData.timeline).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

CONTACTS:
${rightsData.contacts.map(contact => `• ${contact.name}: ${contact.phone}`).join('\n')}

DOCUMENTS NEEDED:
${rightsData.rightsStrategy.legal.map(doc => `• ${doc}`).join('\n')}
    `.trim()

    const blob = new Blob([plan], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Womens_Rights_Plan_${formData.rightsType}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getRightsIcon = (type: string) => {
    switch (type) {
      case 'domestic_violence': return <Heart className="h-5 w-5 text-red-600" />
      case 'sexual_harassment': return <Shield className="h-5 w-5 text-orange-600" />
      case 'workplace_discrimination': return <Users className="h-5 w-5 text-blue-600" />
      case 'property_rights': return <FileText className="h-5 w-5 text-green-600" />
      case 'education_rights': return <Calendar className="h-5 w-5 text-purple-600" />
      case 'reproductive_rights': return <Heart className="h-5 w-5 text-pink-600" />
      default: return <Shield className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'safety': return 'text-red-600 bg-red-50'
      case 'employment': return 'text-blue-600 bg-blue-50'
      case 'property': return 'text-green-600 bg-green-50'
      case 'education': return 'text-purple-600 bg-purple-50'
      case 'health': return 'text-pink-600 bg-pink-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-600" />
            Women's Rights Empowerment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Protect and empower women's rights with constitutional protection, legal assistance, and support services.
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="destructive">High Social Impact</Badge>
            <Badge variant="outline">Constitutional Rights</Badge>
            <Badge variant="outline">Legal Support</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistant">Rights Assistant</TabsTrigger>
          <TabsTrigger value="rights">Rights Types</TabsTrigger>
          <TabsTrigger value="cases">Success Stories</TabsTrigger>
          <TabsTrigger value="guide">Women's Guide</TabsTrigger>
        </TabsList>

        {/* Rights Assistant */}
        <TabsContent value="assistant" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generate Rights Protection Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="rightsType">Rights Type *</Label>
                    <Select value={formData.rightsType} onValueChange={(value) => setFormData(prev => ({ ...prev, rightsType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select rights type" />
                      </SelectTrigger>
                      <SelectContent>
                        {rightsTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              {getRightsIcon(type.id)}
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="incidentType">Incident Type</Label>
                    <Select value={formData.incidentType} onValueChange={(value) => setFormData(prev => ({ ...prev, incidentType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physical">Physical Violence</SelectItem>
                        <SelectItem value="emotional">Emotional Abuse</SelectItem>
                        <SelectItem value="financial">Financial Abuse</SelectItem>
                        <SelectItem value="sexual">Sexual Violence</SelectItem>
                        <SelectItem value="digital">Digital Harassment</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
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
                    <Label htmlFor="victimAddress">Victim Address</Label>
                    <Textarea
                      id="victimAddress"
                      value={formData.victimInfo.address}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        victimInfo: { ...prev.victimInfo, address: e.target.value }
                      }))}
                      placeholder="Victim's address"
                      rows={3}
                    />
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
                      placeholder="Incident location"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Incident Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the incident in detail"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="evidence">Evidence</Label>
                    <Textarea
                      id="evidence"
                      value={formData.evidence}
                      onChange={(e) => setFormData(prev => ({ ...prev, evidence: e.target.value }))}
                      placeholder="List any evidence you have"
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
                  {loading ? 'Generating...' : 'Generate Rights Strategy'}
                </Button>
              </CardContent>
            </Card>

            {generated && rightsData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Women's Rights Protection Strategy</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard('Rights strategy copied to clipboard')}>
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
                    <div className="p-3 bg-red-50 rounded-lg">
                      <h4 className="font-semibold text-red-800">Immediate Actions:</h4>
                      <ul className="mt-2 space-y-1">
                        {rightsData.rightsStrategy.immediate.map((action, index) => (
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
                          {Object.entries(rightsData.legalOptions).map(([key, option]) => (
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
                          {rightsData.rightsStrategy.constitutional.map((right, index) => (
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

          {/* Rights Resources */}
          {generated && rightsData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Women's Rights Resources & Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Emergency Helplines:</h4>
                    <div className="space-y-2">
                      {rightsData.rightsResources.helplines.map((helpline, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <div className="font-medium text-sm">{helpline.name}</div>
                            <div className="text-xs text-gray-600">{helpline.type}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium">{helpline.phone}</span>
                            {helpline.is247 && (
                              <Badge variant="destructive" className="text-xs">24/7</Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Support Organizations:</h4>
                    <div className="space-y-2">
                      {rightsData.rightsResources.organizations.map((org, index) => (
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

        {/* Rights Types */}
        <TabsContent value="rights" className="space-y-6">
          <div className="grid gap-4">
            {rightsTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(type.category)}`}>
                        {getRightsIcon(type.id)}
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

        {/* Women's Guide */}
        <TabsContent value="guide" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Constitutional Basis for Women's Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-800">Article 14</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to equality - ensures equal protection and rights for women.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Article 21</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to life with dignity - includes right to live free from violence and discrimination.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Article 15</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Prohibition of discrimination - prohibits discrimination based on gender.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Women's Helplines & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Women Helpline</h4>
                    <p className="text-sm text-gray-600">1091</p>
                    <Badge variant="destructive" className="mt-2">24/7 Available</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">National Commission for Women</h4>
                    <p className="text-sm text-gray-600">011-23372244</p>
                    <Badge variant="outline" className="mt-2">Statutory Body</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Domestic Violence Helpline</h4>
                    <p className="text-sm text-gray-600">181</p>
                    <Badge variant="outline" className="mt-2">Emergency Support</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Women's Rights Templates & Forms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Domestic Violence Complaint</h4>
                    <p className="text-sm text-gray-600">Complete form for domestic violence complaint</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Sexual Harassment Complaint</h4>
                    <p className="text-sm text-gray-600">Workplace sexual harassment complaint form</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Women's Rights Petition</h4>
                    <p className="text-sm text-gray-600">Public interest litigation template</p>
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