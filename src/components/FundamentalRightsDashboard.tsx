'use client'

import { useState, useEffect } from 'react'
import { Shield, AlertTriangle, BookOpen, Phone, Scale, Users, Gavel, Heart, Lightbulb, Flag } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Right {
  id: string
  number: string
  title: string
  content: string
  importance: number
  simplifiedExplanation?: {
    title: string
    content: string
    examples?: string
    dos?: string
    donts?: string
  }
}

interface EmergencyGuide {
  id: string
  title: string
  category: string
  content: string
  helpline?: string
  legalAid?: string
}

interface RightsData {
  rights: {
    right_to_equality: Right[]
    right_to_freedom: Right[]
    right_against_exploitation: Right[]
    right_to_religion: Right[]
    cultural_educational_rights: Right[]
    constitutional_remedies: Right[]
    directive_principles: Right[]
    fundamental_duties: Right[]
  }
  emergencyGuides: EmergencyGuide[]
  stats: {
    totalRights: number
    totalPrinciples: number
    totalDuties: number
    importantRights: number
  }
}

interface FundamentalRightsDashboardProps {
  language: string
  onArticleClick: (articleId: string) => void
}

export default function FundamentalRightsDashboard({ language, onArticleClick }: FundamentalRightsDashboardProps) {
  const [rightsData, setRightsData] = useState<RightsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRightsData()
  }, [language])

  const fetchRightsData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/rights?lang=${language}`)
      if (response.ok) {
        const data = await response.json()
        setRightsData(data.data)
      }
    } catch (error) {
      console.error('Error fetching rights data:', error)
    } finally {
      setLoading(false)
    }
  }

  const rightCategories = [
    {
      key: 'right_to_equality',
      title: 'Right to Equality',
      icon: Scale,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      articles: 'Articles 14-18'
    },
    {
      key: 'right_to_freedom',
      title: 'Right to Freedom',
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      articles: 'Articles 19-22'
    },
    {
      key: 'right_against_exploitation',
      title: 'Right Against Exploitation',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      articles: 'Articles 23-24'
    },
    {
      key: 'right_to_religion',
      title: 'Right to Religion',
      icon: Heart,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      articles: 'Articles 25-28'
    },
    {
      key: 'cultural_educational_rights',
      title: 'Cultural & Educational Rights',
      icon: BookOpen,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      articles: 'Articles 29-30'
    },
    {
      key: 'constitutional_remedies',
      title: 'Constitutional Remedies',
      icon: Gavel,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      articles: 'Articles 32-35'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!rightsData) {
    return (
      <div className="text-center py-12">
        <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500">Unable to load rights data. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{rightsData.stats.totalRights}</div>
            <div className="text-sm text-gray-600">Fundamental Rights</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{rightsData.stats.totalPrinciples}</div>
            <div className="text-sm text-gray-600">Directive Principles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{rightsData.stats.totalDuties}</div>
            <div className="text-sm text-gray-600">Fundamental Duties</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{rightsData.stats.importantRights}</div>
            <div className="text-sm text-gray-600">Important Rights</div>
          </CardContent>
        </Card>
      </div>

      {/* Rights Categories */}
      <Tabs defaultValue="fundamental" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="fundamental">Fundamental Rights</TabsTrigger>
          <TabsTrigger value="principles">Directive Principles</TabsTrigger>
          <TabsTrigger value="duties">Fundamental Duties</TabsTrigger>
        </TabsList>

        <TabsContent value="fundamental" className="space-y-4">
          <div className="grid gap-4">
            {rightCategories.map((category) => {
              const Icon = category.icon
              const rights = rightsData.rights[category.key as keyof typeof rightsData.rights] || []
              
              return (
                <Card key={category.key} className={`${category.borderColor}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${category.bgColor}`}>
                          <Icon className={`h-5 w-5 ${category.color}`} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{category.title}</CardTitle>
                          <p className="text-sm text-gray-600">{category.articles}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{rights.length} Articles</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {rights.slice(0, 3).map((right) => (
                        <div
                          key={right.id}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => onArticleClick(right.id)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-sm">Article {right.number}</h4>
                              {right.importance >= 4 && (
                                <Badge variant="default" className="bg-red-500 text-xs">Important</Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{right.title}</p>
                            {right.simplifiedExplanation && (
                              <p className="text-xs text-gray-500 mt-1">
                                💡 {right.simplifiedExplanation.content.substring(0, 80)}...
                              </p>
                            )}
                          </div>
                          <div className="text-gray-400">
                            <div className="h-4 w-4">→</div>
                          </div>
                        </div>
                      ))}
                      {rights.length > 3 && (
                        <div className="text-center pt-2">
                          <Button variant="ghost" size="sm" className="text-xs">
                            View all {rights.length} articles
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="principles" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                Directive Principles of State Policy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rightsData.rights.directive_principles.map((principle) => (
                  <div
                    key={principle.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onArticleClick(principle.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">Article {principle.number}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{principle.title}</p>
                    </div>
                    <div className="text-gray-400">
                      <div className="h-4 w-4">→</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="duties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5 text-red-600" />
                Fundamental Duties
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rightsData.rights.fundamental_duties.map((duty) => (
                  <div
                    key={duty.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => onArticleClick(duty.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">Article {duty.number}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{duty.title}</p>
                    </div>
                    <div className="text-gray-400">
                      <div className="h-4 w-4">→</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Emergency Help Section */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <AlertTriangle className="h-5 w-5" />
            Emergency Help - Rights Violation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {rightsData.emergencyGuides.map((guide) => (
              <div key={guide.id} className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">{guide.title}</h4>
                <p className="text-sm text-gray-700 mb-3">{guide.content}</p>
                {guide.helpline && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium">Helpline: {guide.helpline}</span>
                  </div>
                )}
                {guide.legalAid && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-600">
                      <strong>Legal Aid:</strong> {guide.legalAid}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}