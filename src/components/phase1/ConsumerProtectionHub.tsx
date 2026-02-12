'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Phone, Shield, Scale, FileText, AlertTriangle, CheckCircle, Building, CreditCard, Home, Globe, ChevronRight, Send, Copy, Download } from 'lucide-react'
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

interface ConsumerData {
  complaintStrategy: {
    immediate: string[]
    legal: string[]
    constitutional: string[]
    timeline: Record<string, string>
  }
  consumerResources: {
    authorities: Array<{ name: string; phone: string; type: string }>
    organizations: Array<{ name: string; phone: string; type: string }>
    websites: string[]
  }
  legalOptions: Record<string, {
    description: string
    timeline: string
    success: number
    cost: string
    effort: string
  }>
  consumerRights: Array<{
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
    compensation: number
    categories: Record<string, number>
  }
}

interface ComplaintType {
  id: string
  name: string
  description: string
  urgency: string
  common: boolean
  timeline: string
}

interface ConsumerCase {
  id: number
  type: string
  title: string
  company: string
  description: string
  outcome: string
  compensation: number
  date: string
  timeline: string
}

export default function ConsumerProtectionHub() {
  const [activeTab, setActiveTab] = useState('assistant')
  const [consumerData, setConsumerData] = useState<ConsumerData | null>(null)
  const [complaintTypes, setComplaintTypes] = useState<ComplaintType[]>([])
  const [recentCases, setRecentCases] = useState<ConsumerCase[]>([])
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    complaintType: '',
    productName: '',
    company: '',
    description: '',
    purchaseDate: '',
    amount: '',
    evidence: '',
    urgency: 'normal',
    category: 'general',
    language: 'en'
  })

  useEffect(() => {
    fetchComplaintTypes()
    fetchRecentCases()
  }, [])

  const fetchComplaintTypes = async () => {
    try {
      const response = await fetch('/api/consumer')
      if (response.ok) {
        const data = await response.json()
        setComplaintTypes(data.data.complaintTypes)
        setRecentCases(data.data.recentCases)
      }
    } catch (error) {
      console.error('Error fetching complaint types:', error)
    }
  }

  const fetchRecentCases = async () => {
    try {
      const response = await fetch('/api/consumer')
      if (response.ok) {
        const data = await response.json()
        setRecentCases(data.data.recentCases)
      }
    } catch (error) {
      console.error('Error fetching recent cases:', error)
    }
  }

  const generateComplaintStrategy = async () => {
    if (!formData.complaintType || !formData.company || !formData.description) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/consumer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setConsumerData(data.data)
        setGenerated(true)
      }
    } catch (error) {
      console.error('Error generating complaint strategy:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadComplaintPlan = () => {
    if (!consumerData) return
    
    const plan = `
CONSUMER COMPLAINT STRATEGY
============================

Complaint Type: ${formData.complaintType}
Company: ${formData.company}
Product: ${formData.productName}
Amount: ${formData.amount}
Urgency: ${formData.urgency}
Generated: ${new Date().toLocaleString()}

IMMEDIATE ACTIONS:
${consumerData.complaintStrategy.immediate.map(action => `• ${action}`).join('\n')}

CONSTITUTIONAL RIGHTS:
${consumerData.consumerRights.map(right => `• ${right.article}: ${right.title}`).join('\n')}

LEGAL OPTIONS:
${Object.entries(consumerData.legalOptions).map(([key, option]) => `• ${key}: ${option.description} (${option.timeline})`).join('\n')}

TIMELINE:
${Object.entries(consumerData.timeline).map(([key, value]) => `• ${key}: ${value}`).join('\n')}

CONTACTS:
${consumerData.contacts.map(contact => `• ${contact.name}: ${contact.phone}`).join('\n')}

DOCUMENTS NEEDED:
${consumerData.complaintStrategy.legal.map(doc => `• ${doc}`).join('\n')}
    `.trim()

    const blob = new Blob([plan], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Consumer_Complaint_Plan_${formData.company}_${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getComplaintIcon = (type: string) => {
    switch (type) {
      case 'product': return <ShoppingCart className="h-5 w-5" />
      case 'service': return <Phone className="h-5 w-5" />
      case 'financial': return <CreditCard className="h-5 w-5" />
      case 'digital': return <Globe className="h-5 w-5" />
      case 'real_estate': return <Home className="h-5 w-5" />
      default: return <AlertTriangle className="h-5 w-5" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'product': return 'text-blue-600 bg-blue-50'
      case 'service': return 'text-green-600 bg-green-50'
      case 'financial': return 'text-purple-600 bg-purple-50'
      case 'digital': return 'text-orange-600 bg-orange-50'
      case 'real_estate': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-green-600" />
            Consumer Protection Hub
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Protect your consumer rights with legal assistance, complaint strategies, and constitutional protections.
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary">Consumer Rights</Badge>
            <Badge variant="outline">Consumer Protection Act 2019</Badge>
            <Badge variant="outline">Legal Support</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistant">Complaint Assistant</TabsTrigger>
          <TabsTrigger value="types">Issue Types</TabsTrigger>
          <TabsTrigger value="cases">Success Stories</TabsTrigger>
          <TabsTrigger value="guide">Consumer Guide</TabsTrigger>
        </TabsList>

        {/* Complaint Assistant */}
        <TabsContent value="assistant" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generate Complaint Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="complaintType">Issue Type *</Label>
                    <Select value={formData.complaintType} onValueChange={(value) => setFormData(prev => ({ ...prev, complaintType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select issue type" />
                      </SelectTrigger>
                      <SelectContent>
                        {complaintTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center gap-2">
                              {getComplaintIcon(type.id)}
                              {type.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="company">Company/Service Provider *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                      placeholder="Company or service provider name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="productName">Product/Service Name</Label>
                    <Input
                      id="productName"
                      value={formData.productName}
                      onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                      placeholder="Product or service name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Issue Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe the consumer issue in detail"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="purchaseDate">Purchase Date</Label>
                      <Input
                        id="purchaseDate"
                        value={formData.purchaseDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, purchaseDate: e.target.value }))}
                        placeholder="DD/MM/YYYY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Amount (₹)</Label>
                      <Input
                        id="amount"
                        value={formData.amount}
                        onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="Amount involved"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="evidence">Evidence/Documentation</Label>
                    <Textarea
                      id="evidence"
                      value={formData.evidence}
                      onChange={(e) => setFormData(prev => ({ ...prev, evidence: e.target.value }))}
                      placeholder="List any evidence or documentation you have"
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
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product">Product</SelectItem>
                          <SelectItem value="service">Service</SelectItem>
                          <SelectItem value="financial">Financial</SelectItem>
                          <SelectItem value="digital">Digital</SelectItem>
                          <SelectItem value="real_estate">Real Estate</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={generateComplaintStrategy} 
                  disabled={loading || !formData.complaintType || !formData.company || !formData.description}
                  className="w-full"
                >
                  {loading ? 'Generating...' : 'Generate Complaint Strategy'}
                </Button>
              </CardContent>
            </Card>

            {generated && consumerData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Complaint Strategy</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard('Complaint strategy copied to clipboard')}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadComplaintPlan}>
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
                        {consumerData.complaintStrategy.immediate.map((action, index) => (
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
                          {consumerData.consumerRights.map((right, index) => (
                            <div key={index} className="p-2 border rounded">
                              <div className="font-medium text-sm">{right.article}: {right.title}</div>
                              <p className="text-xs text-gray-600 mt-1">{right.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Legal Options:</h4>
                        <div className="space-y-2">
                          {Object.entries(consumerData.legalOptions).map(([key, option]) => (
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Legal Resources */}
          {generated && consumerData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Legal Resources & Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Consumer Authorities:</h4>
                    <div className="space-y-2">
                      {consumerData.consumerResources.authorities.map((authority, index) => (
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
                    <h4 className="font-semibold mb-2">Consumer Organizations:</h4>
                    <div className="space-y-2">
                      {consumerData.consumerResources.organizations.map((org, index) => (
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

        {/* Issue Types */}
        <TabsContent value="types" className="space-y-6">
          <div className="grid gap-4">
            {complaintTypes.map((type) => (
              <Card key={type.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(type.category)}`}>
                        {getComplaintIcon(type.id)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{type.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Badge variant={type.common ? 'default' : 'secondary'}>{type.category}</Badge>
                          <Badge variant="outline">{type.timeline}</Badge>
                          {type.common && <Badge variant="destructive">Common</Badge>}
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
                      <p className="text-sm text-gray-600">{case_.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={case_.outcome === 'success' ? 'default' : 'secondary'}>
                        {case_.outcome}
                      </Badge>
                      <Badge variant="outline">{case_.timeline}</Badge>
                      {case_.compensation > 0 && (
                        <Badge variant="destructive">₹{case_.compensation.toLocaleString()}</Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{case_.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Type: {case_.type}</span>
                    <span>Date: {case_.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Consumer Guide */}
        <TabsContent value="guide" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5" />
                  Constitutional Rights for Consumers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Article 14</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to equality - ensures equal treatment for all consumers.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Article 19(1)(g)</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to practice any profession - includes right to engage in lawful trade and business.
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Consumer Protection Act, 2019</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Comprehensive protection of consumer rights with establishment of CCPA.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Consumer Helplines & Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">National Consumer Helpline</h4>
                    <p className="text-sm text-gray-600">1800-11-4030</p>
                    <Badge variant="outline" className="mt-2">Consumer Rights</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Banking Ombudsman</h4>
                    <p className="text-sm text-gray-600">1800-425-0019</p>
                    <Badge variant="outline" className="mt-2">Banking Issues</Badge>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">TRAI Consumer Helpline</h4>
                    <p className="text-sm text-gray-600">1800-11-2804</p>
                    <Badge variant="outline" className="mt-2">Telecom Issues</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Complaint Templates & Forms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Product Defect Complaint</h4>
                    <p className="text-sm text-gray-600">Template for defective product complaints</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Service Quality Complaint</h4>
                    <p className="text-sm text-gray-600">Template for service quality issues</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Banking Complaint</h4>
                    <p className="text-sm text-gray-600">Template for banking service complaints</p>
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