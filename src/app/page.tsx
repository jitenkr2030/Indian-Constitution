'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, Book, MessageCircle, Globe, Shield, GraduationCap, AlertTriangle, Settings, Menu, X, ChevronRight, Headphones, FileText, Scale, Users, HelpCircle, Calendar, ShoppingCart, Building, Heart, TreePine, Briefcase, Plane, BookOpen, Gavel, Database, Archive } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { AccessibilityPanel } from '@/components/accessibility/AccessibilityPanel'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const quickActions = [
    {
      icon: Book,
      title: "Browse Constitution",
      description: "Read complete Constitution with parts & articles",
      color: "bg-blue-500",
      href: "/browse"
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "AI-powered search in English & Hindi",
      color: "bg-green-500",
      href: "/search"
    },
    {
      icon: MessageCircle,
      title: "AI Assistant",
      description: "Ask questions about your rights",
      color: "bg-purple-500",
      href: "/assistant"
    },
    {
      icon: Shield,
      title: "Fundamental Rights",
      description: "Know your constitutional rights",
      color: "bg-red-500",
      href: "/rights"
    },
    {
      icon: ShoppingCart,
      title: "Consumer Protection",
      description: "Daily transaction protection & rights",
      color: "bg-orange-500",
      href: "/consumer"
    },
    {
      icon: Building,
      title: "Banking Rights",
      description: "Financial security and assistance",
      color: "bg-blue-500",
      href: "/banking"
    },
    {
      icon: Users,
      title: "Women's Empowerment",
      description: "Gender equality and rights",
      color: "bg-pink-500",
      href: "/women"
    },
    {
      icon: TreePine,
      title: "Environment",
      description: "Environmental protection & climate action",
      color: "bg-green-500",
      href: "/environment"
    }
  ]

  const extendedActions = [
    {
      icon: Heart,
      title: "Healthcare Rights",
      description: "Medical rights and healthcare access",
      color: "bg-red-500",
      href: "/healthcare"
    },
    {
      icon: GraduationCap,
      title: "Education Rights",
      description: "Educational opportunities & rights",
      color: "bg-indigo-500",
      href: "/education"
    },
    {
      icon: Building,
      title: "Housing Rights",
      description: "Shelter and property protection",
      color: "bg-blue-500",
      href: "/housing"
    },
    {
      icon: Briefcase,
      title: "Business Support",
      description: "Entrepreneurial & economic empowerment",
      color: "bg-purple-500",
      href: "/business"
    },
    {
      icon: TreePine,
      title: "Agriculture",
      description: "Farmer rights & agricultural development",
      color: "bg-green-500",
      href: "/agriculture"
    },
    {
      icon: MessageCircle,
      title: "Citizen Journalism",
      description: "Press freedom & reporting rights",
      color: "bg-blue-500",
      href: "/journalism"
    },
    {
      icon: Plane,
      title: "NRI Services",
      description: "Global Indian community support",
      color: "bg-indigo-500",
      href: "/nri"
    },
    {
      icon: Gavel,
      title: "Samvidhan Sewak",
      description: "Constitutional protection service",
      color: "bg-orange-500",
      href: "/samvidhan-sewak"
    },
    {
      icon: Database,
      title: "Constitutional Library",
      description: "Advanced knowledge preservation",
      color: "bg-blue-500",
      href: "/constitutional-library"
    }
  ]

  const recentArticles = [
    { id: 1, title: "Article 21 - Right to Life", description: "Protection of life and personal liberty" },
    { id: 2, title: "Article 14 - Equality Before Law", description: "Equality before law and equal protection" },
    { id: 3, title: "Article 19 - Freedom of Speech", description: "Six fundamental freedoms" },
    { id: 4, title: "Consumer Protection Act", description: "Rights for consumers and traders" },
    { id: 5, title: "Banking Regulations", description: "Banking rights and customer protection" },
    { id: 6, title: "Women's Rights", description: "Gender equality and empowerment" },
    { id: 7, title: "Environmental Rights", description: "Environmental protection and sustainability" },
    { id: 8, title: "Healthcare Rights", description: "Medical rights and healthcare access" },
    { id: 9, title: "Education Rights", description: "Educational opportunities and rights" },
    { id: 10, title: "Housing Rights", description: "Shelter and property protection" },
    { id: 11, title: "Business Rights", description: "Entrepreneurial support and rights" },
    { id: 12, title: "Agricultural Rights", description: "Farmer rights and development" },
    { id: 13, title: "Press Freedom", description: "Citizen journalism and reporting rights" },
    { id: 14, title: "NRI Rights", description: "Global Indian community rights" },
    { id: 15, title: "Constitutional Protection", description: "Samvidhan Sewak services" },
    { id: 16, title: "Constitutional Library", description: "Advanced knowledge preservation system" }
  ]

  const features = [
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Available in Hindi, English & regional languages"
    },
    {
      icon: Headphones,
      title: "Text-to-Speech",
      description: "Listen to articles in your preferred language"
    },
    {
      icon: FileText,
      title: "Offline Access",
      description: "Complete Constitution works without internet"
    },
    {
      icon: Scale,
      title: "Case Laws",
      description: "Landmark judgments linked to articles"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-saffron-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-saffron-500 to-green-600 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Indian Constitution</h1>
                <p className="text-xs text-gray-600">भारतीय संविधान</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Globe className="w-4 h-4 mr-1" />
                EN
              </Button>
              <AccessibilityPanel />
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="py-6">
                    <h2 className="text-lg font-semibold mb-4">Menu</h2>
                    <nav className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start">
                        <Book className="w-4 h-4 mr-2" />
                        Browse Constitution
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        AI Assistant
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Fundamental Rights
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Consumer Protection
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Building className="w-4 h-4 mr-2" />
                        Banking Rights
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        Women's Empowerment
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <TreePine className="w-4 h-4 mr-2" />
                        Environment
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Heart className="w-4 h-4 mr-2" />
                        Healthcare
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        Education
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Building className="w-4 h-4 mr-2" />
                        Housing
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Briefcase className="w-4 h-4 mr-2" />
                        Business
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <TreePine className="w-4 h-4 mr-2" />
                        Agriculture
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Journalism
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Plane className="w-4 h-4 mr-2" />
                        NRI Services
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Gavel className="w-4 h-4 mr-2" />
                        Samvidhan Sewak
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Database className="w-4 h-4 mr-2" />
                        Constitutional Library
                      </Button>
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="container mx-auto px-4 py-6 pb-20">
        {/* Hero Section with Search */}
        <section className="text-center mb-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Know Your Rights
            </h2>
            <p className="text-gray-600 text-sm">
              Complete Indian Constitution with AI-powered assistance
            </p>
          </div>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search articles, rights, or ask a question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12 py-3 text-base"
            />
            <Button 
              size="sm" 
              className="absolute right-1 top-1/2 transform -translate-y-1/2"
              onClick={() => console.log('Voice search')}
            >
              <Headphones className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            <Badge variant="secondary" className="text-xs">Article 21</Badge>
            <Badge variant="secondary" className="text-xs">Consumer Rights</Badge>
            <Badge variant="secondary" className="text-xs">Banking Rights</Badge>
            <Badge variant="secondary" className="text-xs">Women's Rights</Badge>
            <Badge variant="secondary" className="text-xs">Environmental Rights</Badge>
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="mb-8">
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Extended Actions Grid */}
        <section className="mb-8">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">More Services</h3>
            <p className="text-sm text-gray-600">Comprehensive support for all citizens</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {extendedActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-3`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Tabs Section */}
        <Tabs defaultValue="recent" className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recently Viewed</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentArticles.slice(0, 8).map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">{article.title}</h4>
                      <p className="text-xs text-gray-600">{article.description}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="bookmarks" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Your Bookmarks</CardTitle>
                <CardDescription className="text-sm">
                  Articles you've saved for quick access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Book className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">No bookmarks yet</p>
                  <p className="text-xs text-gray-400 mt-1">Start browsing and bookmark important articles</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="mt-4">
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-1">{feature.title}</h4>
                        <p className="text-xs text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-4">
            <div className="grid gap-4">
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">Constitutional Articles</h3>
                      <p className="text-sm opacity-90">Complete constitution with all amendments</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-center mt-4">
                    <div>
                      <div className="text-2xl font-bold">448</div>
                      <div className="text-xs opacity-90">Articles</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-xs opacity-90">Schedules</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">105</div>
                      <div className="text-xs opacity-90">Amendments</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">25+</div>
                      <div className="text-xs opacity-90">Years</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">Citizen Services</h3>
                      <p className="text-sm opacity-90">15 comprehensive service modules</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-center mt-4">
                    <div>
                      <div className="text-2xl font-bold">15</div>
                      <div className="text-xs opacity-90">Modules</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">120+</div>
                      <div className="text-xs opacity-90">Helplines</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">300+</div>
                      <div className="text-xs opacity-90">Services</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-xs opacity-90">Complete</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold">Rights Protection</h3>
                      <p className="text-sm opacity-90">Comprehensive rights coverage</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4 text-center mt-4">
                    <div>
                      <div className="text-2xl font-bold">6</div>
                      <div className="text-xs opacity-90">Fundamental</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">20+</div>
                      <div className="text-xs opacity-90">Rights</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-xs opacity-90">Coverage</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-xs opacity-90">Support</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Emergency Helpline Banner */}
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm text-red-900">Emergency Helpline</h3>
                <p className="text-xs text-red-700">Get immediate help for legal emergencies</p>
              </div>
              <Button size="sm" variant="destructive">
                Call Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-5 py-2">
          <Link href="/browse">
            <Button variant="ghost" className="flex flex-col items-center py-2 px-1 h-auto w-full">
              <FileText className="w-5 h-5 mb-1" />
              <span className="text-xs">Browse</span>
            </Button>
          </Link>
          <Button variant="ghost" className="flex flex-col items-center py-2 px-1 h-auto w-full">
            <Search className="w-5 h-5 mb-1" />
            <span className="text-xs">Search</span>
          </Button>
          <Link href="/assistant">
            <Button variant="ghost" className="flex flex-col items-center py-2 px-1 h-auto w-full">
              <MessageCircle className="w-5 h-5 mb-1" />
              <span className="text-xs">AI Chat</span>
            </Button>
          </Link>
          <Link href="/rights">
            <Button variant="ghost" className="flex flex-col items-center py-2 px-1 h-auto w-full">
              <Shield className="w-5 h-5 mb-1" />
              <span className="text-xs">Rights</span>
            </Button>
          </Link>
          <Button variant="ghost" className="flex flex-col items-center py-2 px-1 h-auto w-full">
            <HelpCircle className="w-5 h-5 mb-1" />
            <span className="text-xs">Help</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}