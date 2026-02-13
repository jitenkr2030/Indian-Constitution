'use client'

import { useState, useEffect } from 'react'
import { Heart, Phone, Clock, CheckCircle, AlertTriangle, FileText, MapPin, Users, ChevronRight, Send, Copy, Download, Search, Calendar, Shield, Activity, Stethoscope } from 'lucide-react'
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

interface HealthcareData {
  rightsStrategy: {
    immediate: string[]
    legal: string[]
    constitutional: string[]
    timeline: Record<string, string>
  }
  healthcareResources: {
    authorities: Array<{ name: string; phone: string; type: string }>
    organizations: Array<{ name: string; phone: string; type: string }>
    legal: Array<{ name: string; phone: string; type: string }>
    helplines: Array<{ name: string; phone: string; type: string; is247?: boolean }>
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
    emergencyCases: number
    negligenceCases: number
    patientRightsCases: number
    insuranceClaims: number
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

interface HealthcareCase {
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

export default function HealthcareRightsNavigator() {
  const [activeTab, setActiveTab] = useState('assistant')
  const [healthcareData, setHealthcareData] = useState<HealthcareData | null>(null)
  const [issueTypes, setIssueTypes] = useState<IssueType[]>([])
  const [recentCases, setRecentCases] = useState<HealthcareCase[]>([])
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    rightsType: '',
    healthcareIssue: '',
    hospitalName: '',
    patientInfo: {
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      address: ''
    },
    medicalDetails: {
      condition: '',
      treatment: '',
      doctor: '',
      date: ''
    },
    urgency: 'normal',
    language: 'en',
    location: '',
    insuranceInfo: {
      provider: '',
      policy: '',
      number: ''
    },
    medicalRecords: '',
    legalAction: false
  })

  useEffect(() => {
    fetchIssueTypes()
    fetchRecentCases()
  }, [])

  const fetchIssueTypes = async () => {
    try {
      const response = await fetch('/api/healthcare')
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
      const response = await fetch('/api/healthcare')
      if (response.ok) {
        const data = await response.json()
        setRecentCases(data.data.recentCases)
      }
    } catch (error) {
      console.error('Error fetching recent cases:', error)
    }
  }

  const generateRightsStrategy = async () => {
    if (!formData.rightsType || !formData.patientInfo.name || !formData.healthcareIssue) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/healthcare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setHealthcareData(data.data)
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

  const downloadHealthcarePlan = () => {
    if (!healthcareData) return
    
    const plan = `
HEALTHCARE RIGHTS PROTECTION PLAN
==================================

Rights Type: ${formData.rightsType}
Healthcare Issue: ${formData.healthcareIssue}
Hospital: ${formData.hospitalName}
Patient: ${formData.patientInfo.name}
Location: ${formData.location}
Urgency: ${formData.urgency}
Generated: ${new Date().toLocaleString()}

IMMEDIATE ACTIONS:
${healthcareData.rightsStrategy.immediate.map(action => `• ${action}`).join('\n')}

LEGAL OPTIONS:
${Object.entries(healthcareData.legalOptions).map(([key, option]) => `• ${key}: ${option.description} (${option.timeline})`).join('\n')}

CONSTITUTIONAL RIGHTS:
${healthcareData.rightsStrategy.constitutional.map(right => `• ${right}`).join('\n')}

TIMELINE:
${Object.entries(healthcareData.timeline).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

CONTACTS:
${healthcareData.contacts.map(contact => `• ${contact.name}: ${contact.phone}`).join('\n')}

DOCUMENTS NEEDED:
${healthcareData.rightsStrategy.legal.map(doc => `• ${doc}`).join('\n')}
    `.trim()

    const blob = new Blob([plan], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Healthcare_Rights_Plan_${formData.rightsType}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getHealthcareIcon = (type: string) => {
    switch (type) {
      case 'emergency_care': return <Stethoscope className="h-5 w-5 text-red-600" />
      case 'medical_negligence': return <AlertTriangle className="h-5 w-5 text-orange-600" />
      case 'patient_rights': return <Users className="h-5 w-5 text-blue-600" />
      case 'insurance_rights': return <Shield className="h-5 w-5 text-green-600" />
      case 'public_health': return <Heart className="h-5 w-5 text-purple-600" />
      case 'mental_health': return <Activity className="h-5 w-5 text-pink-600" />
      case 'pharmaceutical_rights': return <FileText className="h-5 w-5 text-gray-600" />
      case 'rural_healthcare': return <MapPin className="h-5 w-5 text-brown-600" />
      default: return <Heart className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'emergency': return 'text-red-600 bg-red-50'
      case 'legal': return 'text-orange-600 bg-orange-50'
      case 'rights': return 'text-blue-600 bg-blue-50'
      case 'insurance': return 'text-green-600 bg-green-50'
      case 'public': return 'text-purple-600 bg-purple-50'
      case 'mental': return 'text-pink-600 bg-pink-50'
      case 'pharmaceutical': return 'text-gray-600 bg-gray-50'
      case 'rural': return 'text-brown-600 bg-brown-50'
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
            Healthcare Rights Navigator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Protect and promote healthcare rights with constitutional protection and legal assistance.
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary">Essential Public Service</Badge>
            <Badge variant="outline">Constitutional Rights</Badge>
            <Badge variant="outline">Legal Support</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistant">Health Assistant</TabsTrigger>
          <TabsTrigger value="issues">Health Issues</TabsTrigger>
          <TabsTrigger value="cases">Success Stories</TabsTrigger>
          <TabsTrigger value="guide">Health Guide</TabsTrigger>
        </TabsList>

        {/* Health Assistant */}
        <TabsContent value="assistant" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generate Healthcare Rights Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="rightsType">Healthcare Rights Type *</Label>
                    <Select value={formData.rightsType} onValueChange={(value) => setFormData(prev => ({ ...prev, rightsType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select healthcare rights type" />
                      </SelectTrigger>
                      <SelectContent>
                        {issueTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              {getHealthcareIcon(type.id)}
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="healthcareIssue">Healthcare Issue *</Label>
                    <Input
                      id="healthcareIssue"
                      value={formData.healthcareIssue}
                      onChange={(e) => setFormData(prev => ({ ...prev, healthcareIssue: e.target.value }))}
                      placeholder="Type of healthcare issue"
                    />
                  </div>
                  <div>
                    <Label htmlFor="hospitalName">Hospital Name</Label>
                    <Input
                      id="hospitalName"
                      value={formData.hospitalName}
                      onChange={(e) => setFormData(prev => ({ ...prev, hospitalName: e.target.value }))}
                      placeholder="Hospital or healthcare facility name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="patientName">Patient Name *</Label>
                    <Input
                      id="patientName"
                      value={formData.patientInfo.name}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        patientInfo: { ...prev.patientInfo, name: e.target.value }
                      }))}
                      placeholder="Patient's full name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientPhone">Patient Phone</Label>
                      <Input
                        id="patientPhone"
                        value={formData.patientInfo.phone}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          patientInfo: { ...prev.patientInfo, phone: e.target.value }
                        }))}
                        placeholder="Patient's phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientEmail">Patient Email</Label>
                      <Input
                        id="patientEmail"
                        value={formData.patientInfo.email}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          patientInfo: { ...prev.patientInfo, email: e.target.value }
                        }))}
                        placeholder="Patient's email address"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="patientAddress">Patient Address</Label>
                    <Textarea
                      id="patientAddress"
                      value={formData.patientInfo.address}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        patientInfo: { ...prev.patientInfo, address: e.target.value }
                      }))}
                      placeholder="Patient's complete address"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="patientAge">Patient Age</Label>
                      <Input
                        id="patientAge"
                        value={formData.patientInfo.age}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          patientInfo: { ...prev.patientInfo, age: e.target.value }
                        }))}
                        placeholder="Patient's age"
                      />
                    </div>
                    <div>
                      <Label htmlFor="patientGender">Patient Gender</Label>
                      <Select value={formData.patientInfo.gender} onValueChange={(value) => setFormData(prev => ({ 
                        ...prev, 
                        patientInfo: { ...prev.patientInfo, gender: value }
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
                    <Label htmlFor="condition">Medical Condition</Label>
                    <Input
                      id="condition"
                      value={formData.medicalDetails.condition}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        medicalDetails: { ...prev.medicalDetails, condition: e.target.value }
                      }))}
                      placeholder="Medical condition or diagnosis"
                    />
                  </div>
                  <div>
                    <Label htmlFor="treatment">Treatment Received</Label>
                    <Input
                      id="treatment"
                      value={formData.medicalDetails.treatment}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        medicalDetails: { ...prev.medicalDetails, treatment: e.target.value }
                      }))}
                      placeholder="Treatment received or prescribed"
                    />
                  </div>
                  <div>
                    <Label htmlFor="doctor">Treating Doctor</Label>
                    <Input
                      id="doctor"
                      value={formData.medicalDetails.doctor}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        medicalDetails: { ...prev.medicalDetails, doctor: e.target.value }
                      }))}
                      placeholder="Name of treating doctor"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Location of healthcare facility"
                    />
                  </div>
                  <div>
                    <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                    <Input
                      id="insuranceProvider"
                      value={formData.insuranceInfo.provider}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        insuranceInfo: { ...prev.insuranceInfo, provider: e.target.value }
                      }))}
                      placeholder="Insurance provider name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="medicalRecords">Medical Records</Label>
                    <Textarea
                      id="medicalRecords"
                      value={formData.medicalRecords}
                      onChange={(e) => setFormData(prev => ({ ...prev, medicalRecords: e.target.value }))}
                      placeholder="Available medical records and documents"
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
                  disabled={loading || !formData.rightsType || !formData.patientInfo.name || !formData.healthcareIssue}
                  className="w-full"
                >
                  {loading ? 'Generating...' : 'Generate Healthcare Rights Strategy'}
                </Button>
              </CardContent>
            </Card>

            {generated && healthcareData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Healthcare Rights Protection Strategy</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard('Healthcare strategy copied to clipboard')}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadHealthcarePlan}>
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
                        {healthcareData.rightsStrategy.immediate.map((action, index) => (
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
                          {Object.entries(healthcareData.legalOptions).map(([key, option]) => (
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
                          {healthcareData.rightsStrategy.constitutional.map((right, index) => (
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

          {/* Healthcare Resources */}
          {generated && healthcareData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Healthcare Resources & Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Healthcare Authorities:</h4>
                    <div className="space-y-2">
                      {healthcareData.healthcareResources.authorities.map((authority, index) => (
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
                    <h4 className="font-semibold mb-2">Healthcare Organizations:</h4>
                    <div className="space-y-2">
                      {healthcareData.healthcareResources.organizations.map((org, index) => (
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
                    <h4 className="font-semibold mb-2">Emergency Helplines:</h4>
                    <div className="space-y-2">
                      {healthcareData.healthcareResources.helplines.map((helpline, index) => (
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
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Health Issues */}
        <TabsContent value="issues" className="space-y-6">
          <div className="grid gap-4">
            {issueTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(type.category)}`}>
                        {getHealthcareIcon(type.id)}
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

        {/* Health Guide */}
        <TabsContent value="guide" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Constitutional Basis for Healthcare Rights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-800">Article 21</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to health and medical care - ensures access to quality healthcare services.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Article 47</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      State duty to improve public health and nutrition levels.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Article 14</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to equality in healthcare access and treatment.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Healthcare Helplines & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">National Health Helpline</h4>
                    <p className="text-sm text-gray-600">1800-11-2247</p>
                    <Badge variant="outline" className="mt-2">24/7 Available</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Emergency Medical Services</h4>
                    <p className="text-sm text-gray-600">108</p>
                    <Badge variant="outline" className="mt-2">Emergency</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Mental Health Helpline</h4>
                    <p className="text-sm text-gray-600">1800-599-6669</p>
                    <Badge variant="outline" className="mt-2">Crisis Support</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Healthcare Templates & Forms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Emergency Medical Complaint</h4>
                    <p className="text-sm text-gray-600">Complete form for emergency medical care complaint</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Medical Negligence Complaint</h4>
                    <p className="text-sm text-gray-600">Form for medical negligence complaint</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Patient Rights Complaint</h4>
                    <p className="text-sm text-gray-600">Form for patient rights violation complaint</p>
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