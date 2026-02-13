'use client'

import { useState, useEffect } from 'react'
import { Trees, Wind, Droplets, Noise, AlertTriangle, FileText, MapPin, Phone, Clock, CheckCircle, ChevronRight, Send, Copy, Download, Search, Shield } from 'lucide-react'
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

interface EnvironmentalData {
  protectionStrategy: {
    immediate: string[]
    legal: string[]
    constitutional: string[]
    timeline: Record<string, string>
  }
  protectionResources: {
    authorities: Array<{ name: string; phone: string; type: string }>
    organizations: Array<{ name: string; phone: string; type: string }>
    monitoring: Array<{ name: string; phone: string; type: string }>
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
    airQualityIndex: number
    waterQualityIndex: number
    forestCover: number
    biodiversityIndex: number
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

interface EnvironmentalCase {
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

export default function EnvironmentalProtectionCenter() {
  const [activeTab, setActiveTab] = useState('assistant')
  const [environmentalData, setEnvironmentalData] = useState<EnvironmentalData | null>(null)
  const [issueTypes, setIssueTypes] = useState<IssueType[]>([])
  const [recentCases, setRecentCases] = useState<EnvironmentalCase[]>([])
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    issueType: '',
    pollutionType: '',
    location: '',
    description: '',
    evidence: '',
    urgency: 'normal',
    language: 'en',
    reporterInfo: {
      name: '',
      phone: '',
      email: '',
      address: ''
    },
    affectedArea: '',
    impactLevel: 'medium'
  })

  useEffect(() => {
    fetchIssueTypes()
    fetchRecentCases()
  }, [])

  const fetchIssueTypes = async () => {
    try {
      const response = await fetch('/api/environmental')
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
      const response = await fetch('/api/environmental')
      if (response.ok) {
        const data = await response.json()
        setRecentCases(data.data.recentCases)
      }
    } catch (error) {
      console.error('Error fetching recent cases:', error)
    }
  }

  const generateProtectionStrategy = async () => {
    if (!formData.issueType || !formData.location || !formData.description) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/environmental', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setEnvironmentalData(data.data)
        setGenerated(true)
      }
    } catch (error) {
      console.error('Error generating protection strategy:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadProtectionPlan = () => {
    if (!environmentalData) return
    
    const plan = `
ENVIRONMENTAL PROTECTION PLAN
=================================

Issue Type: ${formData.issueType}
Pollution Type: ${formData.pollutionType}
Location: ${formData.location}
Reporter: ${formData.reporterInfo.name}
Impact Level: ${formData.impactLevel}
Urgency: ${formData.urgency}
Generated: ${new Date().toLocaleString()}

IMMEDIATE ACTIONS:
${environmentalData.protectionStrategy.immediate.map(action => `• ${action}`).join('\n')}

LEGAL OPTIONS:
${Object.entries(environmentalData.legalOptions).map(([key, option]) => `• ${key}: ${option.description} (${option.timeline})`).join('\n')}

CONSTITUTIONAL RIGHTS:
${environmentalData.protectionStrategy.constitutional.map(right => `• ${right}`).join('\n')}

TIMELINE:
${Object.entries(environmentalData.timeline).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

CONTACTS:
${environmentalData.contacts.map(contact => `• ${contact.name}: ${contact.phone}`).join('\n')}

DOCUMENTS NEEDED:
${environmentalData.protectionStrategy.legal.map(doc => `• ${doc}`).join('\n')}
    `.trim()

    const blob = new Blob([plan], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Environmental_Protection_Plan_${formData.issueType}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getEnvironmentalIcon = (type: string) => {
    switch (type) {
      case 'air_pollution': return <Wind className="h-5 w-5 text-gray-600" />
      case 'water_pollution': return <Droplets className="h-5 w-5 text-blue-600" />
      case 'soil_pollution': return <Trees className="h-5 w-5 text-brown-600" />
      case 'noise_pollution': return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case 'deforestation': return <Trees className="h-5 w-5 text-green-600" />
      case 'biodiversity_loss': return <Trees className="h-5 w-5 text-green-600" />
      case 'waste_management': return <AlertTriangle className="h-5 w-5 text-red-600" />
      case 'climate_change': return <Wind className="h-5 w-5 text-purple-600" />
      default: return <Shield className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'air': return 'text-gray-600 bg-gray-50'
      case 'water': return 'text-blue-600 bg-blue-50'
      case 'soil': return 'text-brown-600 bg-brown-50'
      case 'noise': return 'text-orange-600 bg-orange-50'
      case 'forest': return 'text-green-600 bg-green-50'
      case 'biodiversity': return 'text-green-600 bg-green-50'
      case 'waste': return 'text-red-600 bg-red-50'
      case 'climate': return 'text-purple-600 bg-purple-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trees className="h-6 w-6 text-green-600" />
            Environmental Protection Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Protect and preserve our environment with constitutional protection, legal assistance, and action plans.
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary">Growing Importance</Badge>
            <Badge variant="outline">Constitutional Rights</Badge>
            <Badge variant="outline">Legal Support</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistant">Protection Assistant</TabsTrigger>
          <TabsTrigger value="issues">Environmental Issues</TabsTrigger>
          <TabsTrigger value="cases">Success Stories</TabsTrigger>
          <TabsTrigger value="guide">Environmental Guide</TabsTrigger>
        </TabsList>

        {/* Protection Assistant */}
        <TabsContent value="assistant" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generate Environmental Protection Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="issueType">Environmental Issue *</Label>
                    <Select value={formData.issueType} onValueChange={(value) => setFormData(prev => ({ ...prev, issueType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select environmental issue" />
                      </SelectTrigger>
                      <SelectContent>
                        {issueTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              {getEnvironmentalIcon(type.id)}
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="pollutionType">Pollution Type</Label>
                    <Input
                      id="pollutionType"
                      value={formData.pollutionType}
                      onChange={(e) => setFormData(prev => ({ ...prev, pollutionType: e.target.value }))}
                      placeholder="Type of pollution (e.g., industrial, vehicular)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Location of environmental issue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reporterName">Reporter Name *</Label>
                    <Input
                      id="reporterName"
                      value={formData.reporterInfo.name}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        reporterInfo: { ...prev.reporterInfo, name: e.target.value }
                      }))}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="reporterPhone">Reporter Phone</Label>
                      <Input
                        id="reporterPhone"
                        value={formData.reporterInfo.phone}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          reporterInfo: { ...prev.reporterInfo, phone: e.target.value }
                        }))}
                        placeholder="Your phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reporterEmail">Reporter Email</Label>
                      <Input
                        id="reporterEmail"
                        value={formData.reporterInfo.email}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          reporterInfo: { ...prev.reporterInfo, email: e.target.value }
                        }))}
                        placeholder="Your email address"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="affectedArea">Affected Area</Label>
                    <Input
                      id="affectedArea"
                      value={formData.affectedArea}
                      onChange={(e) => setFormData(prev => ({ ...prev, affectedArea: e.target.value }))}
                      placeholder="Area affected by environmental issue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Issue Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the environmental issue in detail"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="evidence">Evidence</Label>
                    <Textarea
                      id="evidence"
                      value={formData.evidence}
                      onChange={(e) => setFormData(prev => ({ ...prev, evidence: e.target.value }))}
                      placeholder="List any evidence you have (photos, videos, documents)"
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
                      <Label htmlFor="impactLevel">Impact Level</Label>
                      <Select value={formData.impactLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, impactLevel: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Minimal impact</SelectItem>
                          <SelectItem value="medium">Medium - Moderate impact</SelectItem>
                          <SelectItem value="high">High - Significant impact</SelectItem>
                          <SelectItem value="severe">Severe - Critical impact</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={generateProtectionStrategy} 
                  disabled={loading || !formData.issueType || !formData.location || !formData.description}
                  className="w-full"
                >
                  {loading ? 'Generating...' : 'Generate Protection Strategy'}
                </Button>
              </CardContent>
            </Card>

            {generated && environmentalData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Environmental Protection Strategy</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard('Protection strategy copied to clipboard')}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadProtectionPlan}>
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
                        {environmentalData.protectionStrategy.immediate.map((action, index) => (
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
                          {Object.entries(environmentalData.legalOptions).map(([key, option]) => (
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
                          {environmentalData.protectionStrategy.constitutional.map((right, index) => (
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

          {/* Environmental Resources */}
          {generated && environmentalData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trees className="h-5 w-5" />
                  Environmental Resources & Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Environmental Authorities:</h4>
                    <div className="space-y-2">
                      {environmentalData.protectionResources.authorities.map((authority, index) => (
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
                    <h4 className="font-semibold mb-2">Environmental Organizations:</h4>
                    <div className="space-y-2">
                      {environmentalData.protectionResources.organizations.map((org, index) => (
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

        {/* Environmental Issues */}
        <TabsContent value="issues" className="space-y-6">
          <div className="grid gap-4">
            {issueTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(type.category)}`}>
                        {getEnvironmentalIcon(type.id)}
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

        {/* Environmental Guide */}
        <TabsContent value="guide" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trees className="h-5 w-5" />
                  Constitutional Basis for Environmental Protection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Article 21</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to life and healthy environment - includes right to pollution-free environment.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Article 48A</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Protection and improvement of environment - state duty to protect and improve environment.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Article 14</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to equality - ensures equal environmental protection for all citizens.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Environmental Helplines & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Central Pollution Control Board</h4>
                    <p className="text-sm text-gray-600">011-22301234</p>
                    <Badge variant="outline" className="mt-2">National Authority</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">State Pollution Control Board</h4>
                    <p className="text-sm text-gray-600">011-22301234</p>
                    <Badge variant="outline" className="mt-2">State Authority</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">National Green Tribunal</h4>
                    <p className="text-sm text-gray-600">011-2338225</p>
                    <Badge variant="outline" className="mt-2">Judicial Body</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Environmental Templates & Forms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Air Pollution Complaint</h4>
                    <p className="text-sm text-gray-600">Complete form for air pollution complaint</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Water Pollution Complaint</h4>
                    <p className="text-sm text-gray-600">Form for water pollution violation</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Environmental Violation Report</h4>
                    <p className="text-sm text-gray-600">General environmental violation report form</p>
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