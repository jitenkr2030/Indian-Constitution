'use client'

import { useState } from 'react'
import { Shield, BookOpen, Search, Users, HelpCircle, ChevronRight, Volume2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

interface FundamentalRightsDashboardProps {
  language: string
  onArticleClick: (id: string) => void
}

export default function FundamentalRightsDashboard({ language, onArticleClick }: FundamentalRightsDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const fundamentalRights = [
    {
      id: '14',
      title: 'Right to Equality',
      titleEn: 'Right to Equality',
      titleHi: 'समानता का अधिकार',
      titleTa: 'சமத்தத்தின் உரிமை',
      description: 'Equality before law and equal protection of laws',
      category: 'equality',
      importance: 1
    },
    {
      id: '19',
      title: 'Freedom of Speech',
      titleEn: 'Freedom of Speech',
      titleHi: 'भाषण की स्वतंत्रता',
      titleTa: 'பேச்சுர் சுதந்திரம்',
      description: 'Protection of certain rights regarding freedom of speech',
      category: 'freedom',
      importance: 1
    },
    {
      id: '21',
      title: 'Right to Life',
      titleEn: 'Right to Life',
      titleHi: 'जीवन का अधिकार',
      titleTa: 'வாழ்க்கின் உரிமை',
      description: 'Protection of life and personal liberty',
      category: 'life',
      importance: 1
    }
  ]

  const categories = [
    { id: 'all', label: 'All Rights', icon: Shield },
    { id: 'equality', label: 'Equality', icon: Users },
    { id: 'freedom', label: 'Freedom', icon: BookOpen },
    { id: 'life', label: 'Life & Liberty', icon: HelpCircle }
  ]

  const filteredRights = fundamentalRights.filter(right => 
    selectedCategory === 'all' || right.category === selectedCategory
  ).filter(right =>
    right.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
    right.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
    right.titleTa.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Fundamental Rights</h1>
        <p className="text-gray-600">Know your constitutional rights and protections</p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search rights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
              <category.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{category.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={selectedCategory} className="space-y-4">
          <div className="grid gap-4">
            {filteredRights.map((right) => (
              <Card key={right.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">
                          {language === 'hi' ? right.titleHi || right.titleEn : 
                           language === 'ta' ? right.titleTa || right.titleEn : right.titleEn}
                        </h3>
                        <Badge variant="outline">Article {right.id}</Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{right.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary">Fundamental Right</Badge>
                        <Badge variant="outline">Part III</Badge>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          onClick={() => onArticleClick(right.id)}
                          className="flex items-center gap-2"
                        >
                          <BookOpen className="h-4 w-4" />
                          Read Article
                        </Button>
                        <Button variant="outline" size="sm">
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredRights.length === 0 && (
            <div className="text-center py-12">
              <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No rights found matching your search</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-orange-50 to-green-50">
        <CardHeader>
          <CardTitle>Emergency Rights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <Button variant="outline" className="justify-start">
              <HelpCircle className="h-4 w-4 mr-2" />
              What to do during police arrest?
            </Button>
            <Button variant="outline" className="justify-start">
              <Shield className="h-4 w-4 mr-2" />
              How to file a legal complaint?
            </Button>
            <Button variant="outline" className="justify-start">
              <Users className="h-4 w-4 mr-2" />
              Get free legal aid
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}