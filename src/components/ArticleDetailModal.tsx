'use client'

import { useState, useEffect } from 'react'
import { X, ArrowLeft, Volume2, Bookmark, Share2, FileText, Scale, Calendar, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

interface SimplifiedExplanation {
  title: string
  content: string
  examples?: string
  dos?: string
  donts?: string
}

interface CaseLaw {
  id: string
  title: string
  year: number
  court: string
  summary: string
  landmark: boolean
}

interface Amendment {
  id: string
  number: number
  year: number
  title: string
  description: string
}

interface ArticleDetail {
  id: string
  number: string
  title: string
  content: string
  category: string
  importance: number
  part: {
    number: number
    title: string
  }
  simplifiedExplanation: SimplifiedExplanation | null
  relatedCases: CaseLaw[]
  amendments: Amendment[]
}

interface ArticleDetailModalProps {
  articleId: string | null
  language: string
  onClose: () => void
}

export default function ArticleDetailModal({ articleId, language, onClose }: ArticleDetailModalProps) {
  const [article, setArticle] = useState<ArticleDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'content' | 'simplified' | 'cases' | 'amendments'>('content')

  useEffect(() => {
    if (articleId) {
      fetchArticle()
    }
  }, [articleId, language])

  const fetchArticle = async () => {
    if (!articleId) return

    setLoading(true)
    try {
      const response = await fetch(`/api/articles/${articleId}?lang=${language}`)
      if (response.ok) {
        const data = await response.json()
        setArticle(data.data)
      }
    } catch (error) {
      console.error('Error fetching article:', error)
    } finally {
      setLoading(false)
    }
  }

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      speechSynthesis.speak(utterance)
    }
  }

  if (!articleId) return null

  return (
    <Dialog open={!!articleId} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Article {article?.number}: {article?.title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => speakText(article?.content || '')}>
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="secondary">Part {article?.part.number}</Badge>
            <Badge variant="outline">{article?.category}</Badge>
            {article?.importance && article.importance >= 4 && (
              <Badge variant="default" className="bg-red-500">
                Important
              </Badge>
            )}
          </div>
        </DialogHeader>

        <div className="p-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-4 border-b">
            <Button
              variant={activeTab === 'content' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('content')}
              className="rounded-b-none"
            >
              <FileText className="h-4 w-4 mr-2" />
              Content
            </Button>
            {article?.simplifiedExplanation && (
              <Button
                variant={activeTab === 'simplified' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('simplified')}
                className="rounded-b-none"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Simplified
              </Button>
            )}
            {article?.relatedCases.length > 0 && (
              <Button
                variant={activeTab === 'cases' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('cases')}
                className="rounded-b-none"
              >
                <Scale className="h-4 w-4 mr-2" />
                Case Laws ({article.relatedCases.length})
              </Button>
            )}
            {article?.amendments.length > 0 && (
              <Button
                variant={activeTab === 'amendments' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('amendments')}
                className="rounded-b-none"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Amendments ({article.amendments.length})
              </Button>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <ScrollArea className="max-h-[60vh]">
              {/* Content Tab */}
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Official Text</h3>
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {article?.content}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Simplified Explanation Tab */}
              {activeTab === 'simplified' && article?.simplifiedExplanation && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-blue-600">
                      {article.simplifiedExplanation.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {article.simplifiedExplanation.content}
                    </p>
                  </div>

                  {article.simplifiedExplanation.examples && (
                    <div>
                      <h4 className="font-semibold text-md mb-2 text-green-600">Real-Life Examples</h4>
                      <p className="text-gray-600">{article.simplifiedExplanation.examples}</p>
                    </div>
                  )}

                  {article.simplifiedExplanation.dos && (
                    <div>
                      <h4 className="font-semibold text-md mb-2 text-blue-600">What You Can Do ✅</h4>
                      <p className="text-gray-600">{article.simplifiedExplanation.dos}</p>
                    </div>
                  )}

                  {article.simplifiedExplanation.donts && (
                    <div>
                      <h4 className="font-semibold text-md mb-2 text-red-600">What You Shouldn't Do ❌</h4>
                      <p className="text-gray-600">{article.simplifiedExplanation.donts}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Case Laws Tab */}
              {activeTab === 'cases' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Related Case Laws</h3>
                  {article?.relatedCases.map((case_) => (
                    <Card key={case_.id} className={case_.landmark ? 'border-orange-200' : ''}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold flex items-center gap-2">
                              {case_.title}
                              {case_.landmark && (
                                <Badge variant="default" className="bg-orange-500 text-xs">
                                  Landmark
                                </Badge>
                              )}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {case_.court} • {case_.year}
                            </p>
                            <p className="text-gray-700 mt-2">{case_.summary}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Amendments Tab */}
              {activeTab === 'amendments' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Constitutional Amendments</h3>
                  {article?.amendments.map((amendment) => (
                    <Card key={amendment.id}>
                      <CardContent className="p-4">
                        <h4 className="font-semibold">
                          {amendment.number}th Amendment ({amendment.year})
                        </h4>
                        <h5 className="font-medium text-sm text-gray-600 mt-1">
                          {amendment.title}
                        </h5>
                        <p className="text-gray-700 mt-2">{amendment.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}