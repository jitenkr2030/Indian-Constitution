'use client'

import { ArrowLeft, Phone, AlertTriangle, Users, Headphones, MessageCircle, Download, ExternalLink, Star, Clock, MapPin, Shield, CheckCircle, Building, CreditCard, FileText, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export default function BankingRights() {
  const [searchQuery, setSearchQuery] = useState('')

  const emergencyHelplines = [
    {
      name: "Banking Ombudsman",
      number: "1800-425-0018",
      description: "Banking related consumer complaints",
      timing: "24/7",
      category: "Banking Complaints"
    },
    {
      name: "RBI Customer Service",
      number: "022-22614191",
      description: "Reserve Bank of India customer assistance",
      timing: "9:30 AM - 5:00 PM",
      category: "Regulatory"
    },
    {
      name: "Cyber Crime Cell",
      number: "1930",
      description: "Report banking fraud and cyber crimes",
      timing: "24/7",
      category: "Cyber Security"
    },
    {
      name: "Credit Information Bureau",
      number: "022-66289000",
      description: "Credit report disputes and assistance",
      timing: "9:30 AM - 6:00 PM",
      category: "Credit Issues"
    },
    {
      name: "Banking Code & Standards Board",
      number: "011-23342828",
      description: "Banking ethics and code violations",
      timing: "10:00 AM - 5:00 PM",
      category: "Ethics"
    },
    {
      name: "Deposit Insurance Agency",
      number: "022-22614191",
      description: "Bank deposit insurance queries",
      timing: "9:30 AM - 5:00 PM",
      category: "Insurance"
    },
    {
      name: "Financial Consumer Agency",
      number: "1800-11-0001",
      description: "Financial consumer protection",
      timing: "24/7",
      category: "Consumer Protection"
    },
    {
      name: "Legal Aid for Banking",
      number: "15100",
      description: "Free legal assistance for banking issues",
      timing: "24/7",
      category: "Legal Aid"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              </Link>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Banking Rights</h1>
                <p className="text-xs text-gray-600">Financial security and assistance</p>
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
                <h2 className="text-xl font-bold text-red-900">Emergency Banking Helplines</h2>
                <p className="text-sm text-red-700">Get immediate help for banking issues</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Helplines Grid */}
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

        {/* Banking Rights Info */}
        <Tabs defaultValue="rights" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rights">Your Rights</TabsTrigger>
            <TabsTrigger value="protection">Fraud Protection</TabsTrigger>
            <TabsTrigger value="complaints">File Complaint</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rights" className="mt-4">
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Right to Information</h4>
                      <p className="text-xs text-gray-600">Access to all banking terms and conditions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Right to Fair Treatment</h4>
                      <p className="text-xs text-gray-600">Non-discriminatory banking services</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="protection" className="mt-4">
            <div className="grid gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">Fraud Prevention Tips</h4>
                      <p className="text-xs text-gray-600">Protect yourself from banking fraud</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="complaints" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-medium text-sm mb-2">How to File Banking Complaints</h4>
                <p className="text-xs text-gray-600">Follow the proper channels for banking grievances</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}