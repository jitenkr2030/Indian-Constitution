'use client'

import { useState } from 'react'
import { X, Search, FileText, Book, Scale, Shield, Users, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ArticleDetailModalProps {
  articleId: string | null
  language: string
  onClose: () => void
}

export default function ArticleDetailModal({ articleId, language, onClose }: ArticleDetailModalProps) {
  const [activeTab, setActiveTab] = useState('content')
  const [searchQuery, setSearchQuery] = useState('')

  if (!articleId) return null

  // Mock article data
  const article = {
    id: articleId,
    number: articleId,
    title: `Article ${articleId}`,
    titleEn: `Article ${articleId}`,
    titleHi: `अनुच्छेद ${articleId}`,
    titleTa: `பிரிவு ${articleId}`,
    content: `This is the content of Article ${articleId}. It contains important constitutional provisions...`,
    category: 'fundamental_rights',
    importance: 1,
    part: {
      number: 3,
      title: 'Fundamental Rights',
      titleEn: 'Fundamental Rights',
      titleHi: 'मौलिक अधिकार',
      titleTa: 'அடிபட்ட உரிமைகள்'
    },
    simplifiedExplanation: {
      title: `Understanding Article ${articleId}`,
      content: `Article ${articleId} ensures...`,
      examples: ['Example 1', 'Example 2'],
      dos: ['Do this', 'Do that'],
      donts: ['Don\'t do this', 'Don\'t do that']
    },
    relatedCases: [],
    amendments: []
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">
              {language === 'hi' ? article.titleHi || article.titleEn : 
               language === 'ta' ? article.titleTa || article.titleEn : article.titleEn}
            </h2>
            <p className="text-gray-600 mt-1">
              Part {article.part.number} - {article.part.titleEn}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4 p-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="simplified">Simplified</TabsTrigger>
              <TabsTrigger value="cases">Cases</TabsTrigger>
              <TabsTrigger value="amendments">Amendments</TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 p-6">
              <TabsContent value="content" className="space-y-4">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{article.content}</p>
                </div>
              </TabsContent>

              <TabsContent value="simplified" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{article.simplifiedExplanation.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{article.simplifiedExplanation.content}</p>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Examples:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {article.simplifiedExplanation.examples.map((example, index) => (
                          <li key={index} className="text-gray-700">{example}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-green-600">Do's:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {article.simplifiedExplanation.dos.map((item, index) => (
                            <li key={index} className="text-gray-700">{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-red-600">Don'ts:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {article.simplifiedExplanation.donts.map((item, index) => (
                            <li key={index} className="text-gray-700">{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cases" className="space-y-4">
                {article.relatedCases && article.relatedCases.length > 0 ? (
                  <div className="space-y-3">
                    {article.relatedCases.map((caseItem, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{caseItem.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{caseItem.year} • {caseItem.court}</p>
                          <p className="text-sm mt-2">{caseItem.summary}</p>
                        </CardContent>
                      </Card>
                    ))
                  }
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Scale className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">No related cases found</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="amendments" className="space-y-4">
                {article.amendments && article.amendments.length > 0 ? (
                  <div className="space-y-3">
                    {article.amendments.map((amendment, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h3 className="font-semibold">Amendment {amendment.number}</h3>
                          <p className="text-sm text-gray-600 mt-1">{amendment.year}</p>
                          <p className="text-sm mt-2">{amendment.description}</p>
                        </CardContent>
                      </Card>
                    ))
                  }
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-gray-500">No amendments found</p>
                  </div>
                )}
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </div>
    </div>
  )
}