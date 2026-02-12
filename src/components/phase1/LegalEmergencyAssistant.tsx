'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, Phone, Clock, Shield, Scale, FileText, MapPin, Users, ChevronRight, Send, Copy, Download, CheckCircle } from 'lucide-react'
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

interface EmergencyData {
  emergencyProtocol: {
    immediate: string[]
    constitutional: string[]
    timeline: Record<string, string>
    documents: string[]
  }
  legalResources: {
    authorities: Array<{ name: string; phone: string; type: string; 24/7?: boolean }>
    organizations: Array<{ name: string; phone: string; type: string }>
    websites: string[]
  }
  constitutionalRights: Array<{
    article: string
    title: string
    description: string
    application: string
  }>
  actionPlan: {
    immediate: string[]
    short: string[]
    long: string[]
  }
  timeline: Record<string, string>
  checklists: Record<string, string[]>
  contacts: Array<{ name: string; phone: string; type: string }>
}

interface EmergencyType {
  id: string
  name: string
  description: string
  urgency: string
  constitutional: string[]
  hotlines: string[]
  timeline: string
}

interface EmergencyCase {
  id: number
  type: string
  title: string
  description: string
  outcome: string
  location: string
  date: string
  constitutional: string
}

export default function LegalEmergencyAssistant() {
  const [activeTab, setActiveTab] = useState('assistant')
  const [emergencyData, setEmergencyData] = useState<EmergencyData | null>(null)
  const [emergencyTypes, setEmergencyTypes] = useState<EmergencyType[]>([])
  const [recentCases, setRecentCases] = useState<EmergencyCase[]>([])
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    emergencyType: '',
    location: '',
    description: '',
    personalInfo: {
      name: '',
      phone: '',
      address: ''
    },
    urgency: 'normal',
    language: 'en'
  })

  useEffect(() => {
    fetchEmergencyTypes()
    fetchRecentCases()
  }, [])

  const fetchEmergencyTypes = async () => {
    try {
      const response = await fetch('/api/legal-emergency')
      if (response.ok) {
        const data = await response.json()
        setEmergencyTypes(data.data.emergencyTypes)
        setRecentCases(data.data.recentCases)
      }
    } catch (error) {
      console.error('Error fetching emergency types:', error)
    }
  }

  const fetchRecentCases = async () => {
    try {
      const response = await fetch('/api/legal-emergency')
      if (response.ok) {
        const data = await response.json()
        setRecentCases(data.data.recentCases)
      }
    } catch (error) {
      console.error('Error fetching recent cases:', error)
    }
  }

  const generateEmergencyResponse = async () => {
    if (!formData.emergencyType || !formData.location || !formData.description) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/legal-emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setEmergencyData(data.data)
        setGenerated(true)
      }
    } catch (error) {
      console.error('Error generating emergency response:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadEmergencyPlan = () => {
    if (!emergencyData) return
    
    const plan = `
EMERGENCY LEGAL RESPONSE PLAN
========================

Emergency Type: ${formData.emergencyType}
Location: ${formData.location}
Urgency: ${formData.urgency}
Generated: ${new Date().toLocaleString()}

IMMEDIATE ACTIONS:
${emergencyData.emergencyProtocol.immediate.map(action => `• ${action}`).join('\n')}

CONSTITUTIONAL RIGHTS:
${emergencyData.constitutionalRights.map(right => `• ${right.article}: ${right.title}`).join('\n')}

TIMELINE:
${Object.entries(emergencyData.timeline).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

CONTACTS:
${emergencyData.contacts.map(contact => `• ${contact.name}: ${contact.phone}`).join('\n')}

DOCUMENTS NEEDED:
${emergencyData.emergencyProtocol.documents.map(doc => `• ${doc}`).join('\n')}
    `.trim()

    const blob = new Blob([plan], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Emergency_Plan_${formData.emergencyType}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'urgent': return 'text-red-600 bg-red-50'
      case 'priority': return 'text-orange-600 bg-orange-50'
      default: return 'text-blue-600 bg-blue-50'
    }
  }

  const getEmergencyIcon = (type: string) => {
    switch (type) {
      case 'arrest': return <Scale className="h-5 w-5" />
      case 'search': return <Shield className="h-5 w-5" />
      case 'detention': return <AlertTriangle className="h-5 w-5" />
      case 'harassment': return <Users className="h-5 w-5" />
      case 'property': return <MapPin className="h-5 w-5" />
      default: return <AlertTriangle className="h-5 w-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-600" />
            Legal Emergency Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Immediate legal assistance for emergencies. Get constitutional rights, legal resources, and action plans.
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="destructive">Emergency Support</Badge>
            <Badge variant="outline">Constitutional Rights</Badge>
            <Badge variant="outline">24/7 Available</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistant">Emergency Assistant</TabsTrigger>
          <TabsTrigger value="types">Emergency Types</TabsTrigger>
          <TabsTrigger value="cases">Recent Cases</TabsTrigger>
          <TabsTrigger value="guide">Legal Guide</TabsTrigger>
        </TabsList>

        {/* Emergency Assistant */}
        <TabsContent value="assistant" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Get Emergency Assistance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="emergencyType">Emergency Type *</Label>
                    <Select value={formData.emergencyType} onValueChange={(value) => setFormData(prev => ({ ...prev, emergencyType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select emergency type" />
                      </SelectTrigger>
                      <SelectContent>
                        {emergencyTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              {getEmergencyIcon(type.id)}
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="Current location or area"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the emergency situation in detail"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={formData.personalInfo.name}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          personalInfo: { ...prev.personalInfo, name: e.target.value }
                        }))}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.personalInfo.phone}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          personalInfo: { ...prev.personalInfo, phone: e.target.value }
                        }))}
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="urgency">Urgency Level</Label>
                    <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">Urgent - Immediate action required</SelectItem>
                        <SelectItem value="priority">Priority - Fast response needed</SelectItem>
                        <SelectItem value="normal">Normal - Standard timeline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button 
                  onClick={generateEmergencyResponse} 
                  disabled={loading || !formData.emergencyType || !formData.location || !formData.description}
                  className="w-full"
                >
                  {loading ? 'Generating...' : 'Get Emergency Assistance'}
                </Button>
              </CardContent>
            </Card>

            {generated && emergencyData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Emergency Response Plan</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard('Emergency plan copied to clipboard')}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadEmergencyPlan}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className={`p-3 rounded-lg ${getUrgencyColor(formData.urgency)}`}>
                      <h4 className="font-semibold">Immediate Actions Required:</h4>
                      <ul className="mt-2 space-y-1">
                        {emergencyData.emergencyProtocol.immediate.map((action, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Constitutional Rights:</h4>
                        <div className="space-y-2">
                          {emergencyData.constitutionalRights.map((right, index) => (
                            <div key={index} className="p-2 border rounded">
                              <div className="font-medium text-sm">{right.article}: {right.title}</div>
                              <p className="text-xs text-gray-600 mt-1">{right.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Emergency Contacts:</h4>
                        <div className="space-y-2">
                          {emergencyData.contacts.map((contact, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded">
                              <div>
                                <div className="font-medium text-sm">{contact.name}</div>
                                <div className="text-xs text-gray-600">{contact.type}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-gray-500" />
                                <span className="text-sm font-medium">{contact.phone}</span>
                                {contact.type.includes('24/7') && (
                                  <Badge variant="destructive" className="text-xs">24/7</Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Required Documents:</h4>
                        <div className="space-y-1">
                          {emergencyData.emergencyProtocol.documents.map((doc, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <FileText className="h-4 w-4 text-gray-500" />
                              {doc}
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

          {/* Action Plan Timeline */}
          {generated && emergencyData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Action Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(emergencyData.timeline).map(([phase, timeline]) => (
                    <div key={phase} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h4 className="font-medium capitalize">{phase.replace('_', ' ')}</h4>
                        <p className="text-sm text-gray-600">{timeline}</p>
                      </div>
                      <Badge variant="outline">{phase}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Emergency Types */}
        <TabsContent value="types" className="space-y-6">
          <div className="grid gap-4">
            {emergencyTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getUrgencyColor(type.urgency)}`}>
                        {getEmergencyIcon(type.id)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{type.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={type.urgency === 'urgent' ? 'destructive' : 'secondary'}>
                            {type.urgency}
                          </Badge>
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

        {/* Recent Cases */}
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
                      <Badge variant="outline">{case_.location}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Type: {case_.type}</span>
                    <span>Constitutional: {case_.constitutional}</span>
                    <span>Date: {case_.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Legal Guide */}
        <TabsContent value="guide" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Constitutional Rights in Emergencies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-800">Article 21</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to life and personal liberty - protects against arbitrary arrest and detention.
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Article 22</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Protection against arrest and detention - provides procedural safeguards.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Article 14</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to equality - ensures equal protection of laws.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Emergency Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">National Emergency Response</h4>
                    <p className="text-sm text-gray-600">112 - All emergencies</p>
                    <Badge variant="destructive" className="mt-2">24/7 Available</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">National Legal Services Authority</h4>
                    <p className="text-sm text-gray-600">1800-11-1320</p>
                    <Badge variant="outline" className="mt-2">Free Legal Aid</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Women Helpline</h4>
                    <p className="text-sm text-gray-600">1091</p>
                    <Badge variant="destructive" className="mt-2">24/7 Available</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Cyber Cell</h4>
                    <p className="text-sm text-gray-600">011-23381789</p>
                    <Badge variant="outline" className="mt-2">Digital Crimes</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Emergency Checklists
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Before Emergency</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Keep emergency contacts handy</li>
                      <li>• Know your constitutional rights</li>
                      <li>• Carry identification documents</li>
                      <li>• Have family emergency contacts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">During Emergency</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Stay calm and cooperative</li>
                      <li>• Document everything</li>
                      <li>• Call for legal help immediately</li>
                      <li>• Do not make statements without lawyer</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">After Emergency</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Follow up on legal proceedings</li>
                      <li>• Document all violations</li>
                      <li>• Seek compensation if applicable</li>
                      <li>• Join support groups if needed</li>
                    </ul>
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