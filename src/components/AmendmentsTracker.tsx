'use client'

import { useState, useEffect } from 'react'
import { Calendar, FileText, TrendingUp, Clock, Filter, Search, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Article {
  id: string
  number: string
  title: string
}

interface Amendment {
  id: string
  number: number
  year: number
  title: string
  description: string
  actName?: string
  articles: Article[]
}

interface TimelineData {
  decade: number
  count: number
  amendments: Amendment[]
}

interface AmendmentsData {
  amendments: Amendment[]
  timeline: TimelineData[]
  stats: {
    total: number
    byDecade: number
    latestYear: number
    earliestYear: number
    thisDecade: number
    lastDecade: number
  }
}

interface AmendmentsTrackerProps {
  language: string
  onArticleClick: (articleId: string) => void
}

export default function AmendmentsTracker({ language, onArticleClick }: AmendmentsTrackerProps) {
  const [amendmentsData, setAmendmentsData] = useState<AmendmentsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDecade, setSelectedDecade] = useState<string>('all')
  const [selectedYear, setSelectedYear] = useState<string>('all')

  useEffect(() => {
    fetchAmendments()
  }, [language])

  const fetchAmendments = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/amendments?lang=${language}`)
      if (response.ok) {
        const data = await response.json()
        setAmendmentsData(data.data)
      }
    } catch (error) {
      console.error('Error fetching amendments:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAmendments = amendmentsData?.amendments.filter(amendment => {
    const matchesSearch = amendment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         amendment.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDecade = selectedDecade === 'all' || 
                          Math.floor(amendment.year / 10) * 10 === parseInt(selectedDecade)
    const matchesYear = selectedYear === 'all' || amendment.year.toString() === selectedYear
    
    return matchesSearch && matchesDecade && matchesYear
  }) || []

  const getDecadeOptions = () => {
    if (!amendmentsData) return []
    const decades = amendmentsData.timeline.map(t => t.decade)
    return decades.sort((a, b) => b - a)
  }

  const getYearOptions = () => {
    if (!amendmentsData) return []
    const years = [...new Set(amendmentsData.amendments.map(a => a.year))]
    return years.sort((a, b) => b - a)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!amendmentsData) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p className="text-gray-500">Unable to load amendments data. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{amendmentsData.stats.total}</div>
            <div className="text-sm text-gray-600">Total Amendments</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{amendmentsData.stats.thisDecade}</div>
            <div className="text-sm text-gray-600">This Decade</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{amendmentsData.stats.lastDecade}</div>
            <div className="text-sm text-gray-600">Last Decade</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{amendmentsData.stats.latestYear}</div>
            <div className="text-sm text-gray-600">Latest Year</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter Amendments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search amendments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedDecade} onValueChange={setSelectedDecade}>
              <SelectTrigger>
                <SelectValue placeholder="Select decade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Decades</SelectItem>
                {getDecadeOptions().map(decade => (
                  <SelectItem key={decade} value={decade.toString()}>
                    {decade}s ({amendmentsData.timeline.find(t => t.decade === decade)?.count || 0})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {getYearOptions().map(year => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('')
                setSelectedDecade('all')
                setSelectedYear('all')
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Timeline View */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          {amendmentsData.timeline.map((timeline) => (
            <Card key={timeline.decade}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {timeline.decade}s
                  </CardTitle>
                  <Badge variant="secondary">{timeline.count} Amendments</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {timeline.amendments
                    .filter(a => searchTerm === '' || 
                         a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         a.description.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((amendment) => (
                    <div
                      key={amendment.id}
                      className="flex items-start justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">
                            {amendment.number}th Amendment ({amendment.year})
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {amendment.articles.length} Articles
                          </Badge>
                        </div>
                        <h5 className="font-medium text-sm text-gray-700 mb-2">
                          {amendment.title}
                        </h5>
                        <p className="text-sm text-gray-600 mb-2">
                          {amendment.description}
                        </p>
                        {amendment.actName && (
                          <p className="text-xs text-gray-500">
                            <strong>Act:</strong> {amendment.actName}
                          </p>
                        )}
                        {amendment.articles.length > 0 && (
                          <div className="mt-3">
                            <p className="text-xs text-gray-500 mb-2">Related Articles:</p>
                            <div className="flex flex-wrap gap-1">
                              {amendment.articles.slice(0, 5).map((article) => (
                                <Button
                                  key={article.id}
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs h-6 px-2"
                                  onClick={() => onArticleClick(article.id)}
                                >
                                  Art. {article.number}
                                </Button>
                              ))}
                              {amendment.articles.length > 5 && (
                                <span className="text-xs text-gray-500 px-2">
                                  +{amendment.articles.length - 5} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 mt-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <ScrollArea className="h-[600px]">
            <div className="space-y-3">
              {filteredAmendments.map((amendment) => (
                <Card key={amendment.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">
                            {amendment.number}th Constitutional Amendment
                          </h4>
                          <Badge variant="outline">{amendment.year}</Badge>
                        </div>
                        <h5 className="font-medium text-sm text-gray-700 mb-2">
                          {amendment.title}
                        </h5>
                        <p className="text-sm text-gray-600 mb-3">
                          {amendment.description}
                        </p>
                        {amendment.actName && (
                          <p className="text-xs text-gray-500 mb-3">
                            <strong>Enabling Act:</strong> {amendment.actName}
                          </p>
                        )}
                        {amendment.articles.length > 0 && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-500">Affects:</span>
                            <div className="flex flex-wrap gap-1">
                              {amendment.articles.map((article) => (
                                <Button
                                  key={article.id}
                                  variant="ghost"
                                  size="sm"
                                  className="text-xs h-6 px-2"
                                  onClick={() => onArticleClick(article.id)}
                                >
                                  {article.title}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Important Amendments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Landmark Amendments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <Card className="border-blue-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-800 mb-1">1st Amendment (1951)</h4>
                <p className="text-sm text-gray-600">
                  Added Ninth Schedule for land reforms and reasonable restrictions on freedom of speech.
                </p>
              </CardContent>
            </Card>
            <Card className="border-green-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-green-800 mb-1">42nd Amendment (1976)</h4>
                <p className="text-sm text-gray-600">
                  Added "Socialist" and "Secular" to Preamble, strengthened central government.
                </p>
              </CardContent>
            </Card>
            <Card className="border-orange-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-orange-800 mb-1">44th Amendment (1978)</h4>
                <p className="text-sm text-gray-600">
                  Limited emergency powers and restored fundamental rights.
                </p>
              </CardContent>
            </Card>
            <Card className="border-purple-200">
              <CardContent className="p-4">
                <h4 className="font-semibold text-purple-800 mb-1">73rd & 74th (1992)</h4>
                <p className="text-sm text-gray-600">
                  Constitutional basis for Panchayati Raj and municipal governance.
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}