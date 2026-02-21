'use client'

import { useState } from 'react'
import { ArrowLeft, Phone, AlertTriangle, Users, Headphones, MessageCircle, Download, ExternalLink, Star, Clock, MapPin, Shield, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function ConsumerProtection() {
  const [searchQuery, setSearchQuery] = useState('')

  const emergencyHelplines = [
    {
      name: "National Consumer Helpline",
      number: "1800-11-4000",
      description: "24/7 consumer complaint registration",
      timing: "24/7",
      category: "General Complaints"
    },
    {
      name: "Consumer Protection Authority",
      number: "1915",
      description: "Consumer grievance redressal",
      timing: "24/7",
      category: "Grievances"
    },
    {
      name: "Banking Ombudsman",
      number: "1800-425-0018",
      description: "Banking related consumer complaints",
      timing: "24/7",
      category: "Banking"
    },
    {
      name: "Insurance Regulatory Authority",
      number: "155255",
      description: "Insurance consumer complaints",
      timing: "24/7",
      category: "Insurance"
    },
    {
      name: "Telecom Consumer Grievance",
      number: "1917",
      description: "Telecom service complaints",
      timing: "24/7",
      category: "Telecom"
    },
    {
      name: "Food Safety Helpline",
      number: "1800-11-2210",
      description: "Food safety and quality complaints",
      timing: "24/7",
      category: "Food Safety"
    },
    {
      name: "Drug Control Helpline",
      number: "1800-11-4444",
      description: "Medicine quality complaints",
      timing: "24/7",
      category: "Medicines"
    },
    {
      name: "Legal Aid Helpline",
      number: "15100",
      description: "Free legal assistance for consumers",
      timing: "24/7",
      category: "Legal Aid"
    }
  ]

  const consumerRights = [
    {
      title: "Right to Safety",
      description: "Protection against hazardous goods and services",
      icon: Shield
    },
    {
      title: "Right to Information",
      description: "Access to information about goods and services",
      icon: Star
    },
    {
      title: "Right to Choice",
      description: "Access to variety of goods and services at competitive prices",
      icon: CheckCircle
    },
    {
      title: "Right to be Heard",
      description: "Consumer interests to receive due consideration",
      icon: MessageCircle
    },
    {
      title: "Right to Redressal",
      description: "Fair settlement of genuine grievances",
      icon: Users
    },
    {
      title: "Right to Consumer Education",
      description: "Acquisition of knowledge and skills to be an informed consumer",
      icon: Star
    }
  ]

  const complaintSteps = [
    {
      step: 1,
      title: "Document Everything",
      description: "Keep receipts, bills, warranties, and communication records",
      icon: CheckCircle
    },
    {
      step: 2,
      title: "Contact Seller First",
      description: "Give the seller a chance to resolve the issue",
      icon: MessageCircle
    },
    {
      step: 3,
      title: "File Consumer Complaint",
      description: "Register complaint with appropriate consumer forum",
      icon: AlertTriangle
    },
    {
      step: 4,
      title: "Seek Legal Help",
      description: "Consult consumer protection lawyer if needed",
      icon: Shield
    }
  ]

  const recentCases = [
    {
      id: 1,
      title: "E-commerce Refund Case",
      description: "Successfully got refund for defective product",
      category: "E-commerce",
      amount: "₹15,000",
      status: "resolved",
      date: "2024-01-15"
    },
    {
      id: 2,
      title: "Banking Fraud Resolution",
      description: "Unauthorized transaction reversed by bank",
      category: "Banking",
      amount: "₹25,000",
      status: "resolved",
      date: "2024-01-12"
    },
    {
      id: 3,
      title: "Insurance Claim Settlement",
      description: "Insurance claim approved after initial rejection",
      category: "Insurance",
      amount: "₹50,000",
      status: "resolved",
      date: "2024-01-10"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-orange-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              </Link>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Consumer Protection</h1>
                <p className="text-xs text-gray-600">Daily transaction safety & rights</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Headphones className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Emergency Section */}
        <Card className="bg-red-50 border-red-200 mb-6">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <div className="flex-1">
                <h2 className="text-xl font-bold text-red-900">Emergency Consumer Helplines</h2>
                <p className="text-sm text-red-700">Get immediate help for consumer issues</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Input
            placeholder="Search consumer rights, helplines, or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Emergency Helplines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {emergencyHelplines.map((helpline, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{helpline.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{helpline.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{helpline.timing}</span>
                      <Badge variant="outline" className="text-xs">{helpline.category}</Badge>
                    </div>
                  </div>
                  <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
                    <Phone className="w-4 h-4 mr-1" />
                    {helpline.number}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Consumer Rights Section */}
        <Tabs defaultValue="rights" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rights">Your Rights</TabsTrigger>
            <TabsTrigger value="complaints">File Complaint</TabsTrigger>
            <TabsTrigger value="cases">Recent Cases</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rights" className="mt-4">
            <div className="grid gap-4">
              {consumerRights.map((right, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <right.icon className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">{right.title}</h4>
                        <p className="text-xs text-gray-600">{right.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="complaints" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>How to File a Consumer Complaint</CardTitle>
                <CardDescription>Follow these steps to protect your consumer rights</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {complaintSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm mb-1">{step.title}</h4>
                      <p className="text-xs text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cases" className="mt-4">
            <div className="space-y-4">
              {recentCases.map((case_) => (
                <Card key={case_.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm mb-1">{case_.title}</h4>
                        <p className="text-xs text-gray-600 mb-2">{case_.description}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Badge variant="outline" className="text-xs">{case_.category}</Badge>
                          <span>{case_.date}</span>
                          <span className="font-semibold">{case_.amount}</span>
                        </div>
                      </div>
                      <Badge 
                        variant={case_.status === 'resolved' ? 'default' : 'secondary'}
                        className={case_.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {case_.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}