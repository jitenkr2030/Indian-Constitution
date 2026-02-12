'use client'

import { useState, useEffect } from 'react'
import { FileText, Search, Clock, CheckCircle, AlertTriangle, Phone, Globe, Building, Users, BookOpen, ChevronRight, Send, Download, Copy } from 'lucide-react'
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

interface RTIData {
  rtiApplication: {
    applicationNumber: string
    urgency: string
    content: string
    wordCount: number
    estimatedDays: number
  }
  departmentInfo: {
    address: string
    phone: string
    email: string
    website: string
    cpio: string
    firstAppellate: string
    fees: string
  }
  submissionGuidelines: {
    timeline: string
    fees: string
    documents: string[]
    submission: string
  }
  appealProcess: {
    firstAppeal: any
    secondAppeal: any
    complaint: any
  }
  sampleApplications: any[]
  constitutionalReferences: any
}

interface Department {
  name: string
  category: string
  level: string
  address: string
  phone: string
  email: string
  website: string
  jurisdiction: string
}

interface SuccessStory {
  id: number
  title: string
  department: string
  category: string
  impact: string
  timeline: string
  constitutionalReference: string
  date: string
}

export default function RTIAssistant() {
  const [activeTab, setActiveTab] = useState('generator')
  const [rtiData, setRtiData] = useState<RTIData | null>(null)
  const [departments, setDepartments] = useState<Department[]>([])
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([])
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)

  const [formData, setFormData] = useState({
    applicantName: '',
    applicantAddress: '',
    departmentName: '',
    subject: '',
    description: '',
    periodFrom: '',
    periodTo: '',
    language: 'en',
    urgency: 'normal'
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    fetchDepartments()
    fetchSuccessStories()
  }, [])

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/rti')
      if (response.ok) {
        const data = await response.json()
        setDepartments(data.data.departments)
        setSuccessStories(data.data.successStories)
      }
    } catch (error) {
      console.error('Error fetching departments:', error)
    }
  }

  const fetchSuccessStories = async () => {
    try {
      const response = await fetch('/api/rti')
      if (response.ok) {
        const data = await response.json()
        setSuccessStories(data.data.successStories)
      }
    } catch (error) {
      console.error('Error fetching success stories:', error)
    }
  }

  const generateRTI = async () => {
    if (!formData.applicantName || !formData.applicantAddress || !formData.departmentName || !formData.subject) {
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/rti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const data = await response.json()
        setRtiData(data.data)
        setGenerated(true)
      }
    } catch (error) {
      console.error('Error generating RTI:', error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadRTI = () => {
    if (!rtiData?.rtiApplication.content) return
    
    const blob = new Blob([rtiData.rtiApplication.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `RTI_Application_${rtiData.rtiApplication.applicationNumber}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || dept.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-blue-600" />
            RTI Assistant - Right to Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Generate RTI applications, track departments, and learn about your constitutional right to information.
          </p>
          <div className="flex gap-2 mt-4">
            <Badge variant="secondary">Constitutional Right</Badge>
            <Badge variant="outline">Article 19(1)(a)</Badge>
            <Badge variant="outline">RTI Act 2005</Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="generator">RTI Generator</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="success">Success Stories</TabsTrigger>
          <TabsTrigger value="guide">Guide</TabsTrigger>
        </TabsList>

        {/* RTI Generator */}
        <TabsContent value="generator" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generate RTI Application</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="applicantName">Applicant Name *</Label>
                    <Input
                      id="applicantName"
                      value={formData.applicantName}
                      onChange={(e) => setFormData(prev => ({ ...prev, applicantName: e.target.value }))}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="applicantAddress">Applicant Address *</Label>
                    <Textarea
                      id="applicantAddress"
                      value={formData.applicantAddress}
                      onChange={(e) => setFormData(prev => ({ ...prev, applicantAddress: e.target.value }))}
                      placeholder="Enter your complete address"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="departmentName">Department *</Label>
                    <Select value={formData.departmentName} onValueChange={(value) => setFormData(prev => ({ ...prev, departmentName: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.name} value={dept.name}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="Brief description of information required"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Detailed description of information required"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="periodFrom">Period From</Label>
                      <Input
                        id="periodFrom"
                        value={formData.periodFrom}
                        onChange={(e) => setFormData(prev => ({ ...prev, periodFrom: e.target.value }))}
                        placeholder="DD/MM/YYYY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="periodTo">Period To</Label>
                      <Input
                        id="periodTo"
                        value={formData.periodTo}
                        onChange={(e) => setFormData(prev => ({ ...prev, periodTo: e.target.value }))}
                        placeholder="DD/MM/YYYY"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
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
                    <div>
                      <Label htmlFor="urgency">Urgency</Label>
                      <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal (30 days)</SelectItem>
                          <SelectItem value="priority">Priority (10 days)</SelectItem>
                          <SelectItem value="urgent">Urgent (5 days)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={generateRTI} 
                  disabled={loading || !formData.applicantName || !formData.applicantAddress || !formData.departmentName || !formData.subject}
                  className="w-full"
                >
                  {loading ? 'Generating...' : 'Generate RTI Application'}
                </Button>
              </CardContent>
            </Card>

            {generated && rtiData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Generated RTI Application</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => copyToClipboard(rtiData.rtiApplication.content)}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={downloadRTI}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Application No: {rtiData.rtiApplication.applicationNumber}</Badge>
                      <Badge variant="outline">Urgency: {rtiData.rtiApplication.urgency}</Badge>
                      <Badge variant="outline">Est. Days: {rtiData.rtiApplication.estimatedDays}</Badge>
                    </div>
                    <ScrollArea className="h-64 w-full border rounded-md p-4">
                      <pre className="text-sm whitespace-pre-wrap">{rtiData.rtiApplication.content}</pre>
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Department Information */}
          {generated && rtiData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Department Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Phone: {rtiData.departmentInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">Website: <a href={rtiData.departmentInfo.website} className="text-blue-600 hover:underline">{rtiData.departmentInfo.website}</a></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm">CPIO: {rtiData.departmentInfo.cpio}</span>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Submission Guidelines:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Timeline: {rtiData.submissionGuidelines.timeline}</li>
                      <li>• Fees: {rtiData.submissionGuidelines.fees}</li>
                      <li>• Documents: {rtiData.submissionGuidelines.documents.join(', ')}</li>
                      <li>• Submission: {rtiData.submissionGuidelines.submission}</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Departments */}
        <TabsContent value="departments" className="space-y-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="central">Central</SelectItem>
                <SelectItem value="state">State</SelectItem>
                <SelectItem value="judiciary">Judiciary</SelectItem>
                <SelectItem value="local">Local</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {filteredDepartments.map((dept) => (
              <Card key={dept.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{dept.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{dept.jurisdiction}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Badge variant="outline">{dept.category}</Badge>
                        <Badge variant="outline">{dept.level}</Badge>
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
        <TabsContent value="success" className="space-y-6">
          <div className="grid gap-4">
            {successStories.map((story) => (
              <Card key={story.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{story.title}</h3>
                      <p className="text-sm text-gray-600">{story.department}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{story.category}</Badge>
                      <Badge variant="outline">{story.timeline}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{story.impact}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Constitutional: {story.constitutionalReference}</span>
                    <span>Date: {story.date}</span>
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
                  <BookOpen className="h-5 w-5" />
                  Constitutional Basis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Article 19(1)(a)</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to freedom of speech and expression includes the right to information.
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">RTI Act, 2005</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Statutory framework providing mechanism for citizens to access government information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Appeal Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-200 pl-4">
                    <h4 className="font-semibold">First Appeal</h4>
                    <p className="text-sm text-gray-600">File within 30 days of CPIO response</p>
                  </div>
                  <div className="border-l-4 border-green-200 pl-4">
                    <h4 className="font-semibold">Second Appeal</h4>
                    <p className="text-sm text-gray-600">File within 90 days of First Appellate Authority decision</p>
                  </div>
                  <div className="border-l-4 border-orange-200 pl-4">
                    <h4 className="font-semibold">Complaint</h4>
                    <p className="text-sm text-gray-600">File if no response or unsatisfactory response</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Sample Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Government Schemes Information</h4>
                    <p className="text-sm text-gray-600 mt-1">Complete list of schemes with eligibility criteria</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <h4 className="font-medium">Police Investigation Report</h4>
                    <p className="text-sm text-gray-600 mt-1">Status of FIR and investigation progress</p>
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