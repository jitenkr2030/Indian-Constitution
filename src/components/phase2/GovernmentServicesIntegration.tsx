'use client'

import { useState, useEffect } from 'react'
import { Building, Globe, Phone, Clock, CheckCircle, AlertTriangle, FileText, MapPin, Users, ChevronRight, Send, Copy, Download, Shield, Search, Calendar } from 'lucide-react'
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

interface GovServiceData {
  serviceStrategy: {
    immediate: string[]
    digital: string[]
    constitutional: string[]
    timeline: Record<string, string>
  }
  serviceResources: {
    authorities: Array<{ name: string; phone: string; type: string }>
    platforms: Array<{ name: string; url: string; type: string; status: string }>
  }
  digitalOptions: {
    platforms: Array<{
      name: string
      description: string
      status: string
      benefits: string[]
    }>
  }
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
    totalApplications: number
    successRate: number
    averageProcessingTime: number
    digitalAdoption: number
    departments: number
    services: number
    integrationStatus: string
  }
}

interface ServiceType {
  id: string
  name: string
  description: string
  category: string
  urgency: string
  digital: boolean
  timeline: string
  platforms: string[]
  constitutional: string[]
}

interface ServiceApplication {
  id: number
  type: string
  title: string
  department: string
  description: string
  outcome: string
  timeline: string
  date: string
  location: string
  constitutional: string
}

export default function GovernmentServicesIntegration() {
  const [activeTab, setActiveTab] = useState('assistant')
  const [serviceData, setServiceData] = useState<GovServiceData | null>(null)
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([])
  const [recentApplications, setRecentApplications] = useState<ServiceApplication[]>([])
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    serviceType: '',
    department: '',
    applicationData: {
      name: '',
      email: '',
      phone: '',
      address: '',
      dob: '',
      gender: '',
      occupation: ''
    },
    documents: [],
    urgency: 'normal',
    language: 'en',
    location: ''
  })

  useEffect(() => {
    fetchServiceTypes()
    fetchRecentApplications()
  }, [])

  const fetchServiceTypes = async () => {
    try {
      const response = await fetch('/api/gov-services')
      if (response.ok) {
        const data = await response.json()
        setServiceTypes(data.data.serviceTypes)
        setRecentApplications(data.data.recentApplications)
      }
    } catch (error) {
      console.error('Error fetching service types:', error)
    }
  }

  const fetchRecentApplications = async () => {
    try {
      const response = await fetch('/api/gov-services')
      if (response.ok) {
        const data = await response.json()
        setRecentApplications(data.data.recentApplications)
      }
    } catch (error) {
      console.error('Error fetching recent applications:', error)
    }
  }

  const generateServiceStrategy = async () => {
    if (!formData.serviceType || !formData.department || !formData.applicationData.name) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/gov-services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setServiceData(data.data)
        setGenerated(true)
      }
    } catch (error) {
      console.error('Error generating service strategy:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadServicePlan = () => {
    if (!serviceData) return
    
    const plan = `
GOVERNMENT SERVICE APPLICATION PLAN
==================================

Service Type: ${formData.serviceType}
Department: ${formData.department}
Applicant: ${formData.applicationData.name}
Location: ${formData.location}
Urgency: ${formData.urgency}
Generated: ${new Date().toLocaleString()}

IMMEDIATE ACTIONS:
${serviceData.serviceStrategy.immediate.map(action => `• ${action}`).join('\n')}

DIGITAL OPTIONS:
${serviceData.digitalOptions.platforms.map(platform => `• ${platform.name}: ${platform.description}`).join('\n')}

CONSTITUTIONAL RIGHTS:
${serviceData.serviceStrategy.constitutional.map(right => `• ${right}`).join('\n')}

TIMELINE:
${Object.entries(serviceData.timeline).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

CONTACTS:
${serviceData.contacts.map(contact => `• ${contact.name}: ${contact.phone}`).join('\n')}

DOCUMENTS NEEDED:
${serviceData.serviceStrategy.immediate.map(doc => `• ${doc}`).join('\n')}
    `.trim()

    const blob = new Blob([plan], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Gov_Service_Plan_${formData.serviceType}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'aadhaar': return <Users className="h-5 w-5" />
      case 'passport': return <Globe className="h-5 w-5" />
      case 'pan': return <FileText className="h-5 w-5" />
      case 'driving_license': return <Shield className="h-5 w-5" />
      case 'voter_id': return <Calendar className="h-5 w-5" />
      default: return <Building className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'identity': return 'text-blue-600 bg-blue-50'
      case 'travel': return 'text-green-600 bg-green-50'
      case 'financial': return 'text-purple-600 bg-purple-50'
      case 'transport': return 'text-orange-600 bg-orange-50'
      case 'electoral': return 'text-red-600 bg-red-50'
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
            Government Services Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Access and manage government services digitally with constitutional protection and legal assistance.
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary">Digital India</Badge>
            <Badge variant="outline">Constitutional Rights</Badge>
            <Badge variant="outline">Legal Support</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistant">Service Assistant</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="guide">Guide</TabsTrigger>
        </TabsList>

        {/* Service Assistant */}
        <TabsContent value="assistant" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generate Service Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="serviceType">Service Type *</Label>
                    <Select value={formData.serviceType} onValueChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              {getServiceIcon(type.id)}
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="department">Department *</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                      placeholder="Government department"
                    />
                  </div>
                  <div>
                    <Label htmlFor="applicantName">Applicant Name *</Label>
                    <Input
                      id="applicantName"
                      value={formData.applicationData.name}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        applicationData: { ...prev.applicationData, name: e.target.value }
                      }))}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={formData.applicationData.email}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          applicationData: { ...prev.applicationData, email: e.target.value }
                        }))}
                        placeholder="Your email address"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={formData.applicationData.phone}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          applicationData: { ...prev.applicationData, phone: e.target.value }
                        }))}
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      id="address"
                      value={formData.applicationData.address}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        applicationData: { ...prev.applicationData, address: e.target.value }
                      }))}
                      placeholder="Your complete address"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Your location"
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
                  onClick={generateServiceStrategy} 
                  disabled={loading || !formData.serviceType || !formData.department || !formData.applicationData.name}
                  className="w-full"
                >
                  {loading ? 'Generating...' : 'Generate Service Strategy'}
                </Button>
              </CardContent>
            </Card>

            {generated && serviceData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Service Strategy</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard('Service strategy copied to clipboard')}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadServicePlan}>
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
                        {serviceData.serviceStrategy.immediate.map((action, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Digital Options:</h4>
                        <div className="space-y-2">
                          {serviceData.digitalOptions.platforms.map((platform, index) => (
                            <div key={index} className="p-2 border rounded">
                              <div className="font-medium text-sm">{platform.name}</div>
                              <p className="text-xs text-gray-600 mt-1">{platform.description}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">{platform.status}</Badge>
                                {platform.benefits.slice(0, 2).map((benefit, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">{benefit}</Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Constitutional Rights:</h4>
                        <div className="space-y-2">
                          {serviceData.serviceStrategy.constitutional.map((right, index) => (
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

          {/* Service Resources */}
          {generated && serviceData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Service Resources & Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Government Authorities:</h4>
                    <div className="space-y-2">
                      {serviceData.serviceResources.authorities.map((authority, index) => (
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
                    <h4 className="font-semibold mb-2">Digital Platforms:</h4>
                    <div className="space-y-2">
                      {serviceData.serviceResources.platforms.map((platform, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <div className="font-medium text-sm">{platform.name}</div>
                            <div className="text-xs text-gray-600">{platform.type}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-gray-500" />
                            <a href={platform.url} className="text-sm text-blue-600 hover:underline" target="_blank">
                              Visit Platform
                            </a>
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

        {/* Services */}
        <TabsContent value="services" className="space-y-6">
          <div className="grid gap-4">
            {serviceTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(type.category)}`}>
                        {getServiceIcon(type.id)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{type.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Badge variant={type.digital ? 'default' : 'secondary'}>{type.category}</Badge>
                          <Badge variant="outline">{type.timeline}</Badge>
                          {type.digital && <Badge variant="destructive">Digital</Badge>}
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

        {/* Applications */}
        <TabsContent value="applications" className="space-y-6">
          <div className="grid gap-4">
            {recentApplications.map((app) => (
              <Card key={app.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{app.title}</h3>
                      <p className="text-sm text-gray-600">{app.department}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={app.outcome === 'success' ? 'default' : 'secondary'}>
                        {app.outcome}
                      </Badge>
                      <Badge variant="outline">{app.timeline}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{app.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Type: {app.type}</span>
                    <span>Date: {app.date}</span>
                    <span>Location: {app.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Guide */}
        <TabsContent value="guide" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Constitutional Basis for Government Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Article 14</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to equality - ensures equal access to government services for all citizens.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Article 21</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to life and personal liberty - includes right to efficient government services.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Digital India Initiative</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Flagship program for digital transformation of government services.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Service Helplines & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">National Government Portal</h4>
                    <p className="text-sm text-gray-600">1800-300-1947</p>
                    <Badge variant="outline" className="mt-2">All Services</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Digital India Helpline</h4>
                    <p className="text-sm text-gray-600">1800-300-1947</p>
                    <Badge variant="outline" className="mt-2">Digital Services</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Common Service Centers</h4>
                    <p className="text-sm text-gray-600">1800-300-1947</p>
                    <Badge variant="outline" className="mt-2">Offline Support</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Service Templates & Forms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Aadhaar Enrollment Form</h4>
                    <p className="text-sm text-gray-600">Complete form for UIDAI enrollment</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Passport Application Form</h4>
                    <p className="text-sm text-gray-600">Standard passport application template</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">PAN Application Form</h4>
                    <p className="text-sm text-gray-600">Form 49A for PAN application</p>
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