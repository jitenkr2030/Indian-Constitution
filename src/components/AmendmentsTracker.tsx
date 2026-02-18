'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FileText, Calendar } from 'lucide-react'

interface AmendmentsTrackerProps {
  language: string
  onArticleClick: (id: string) => void
}

export default function AmendmentsTracker({ language, onArticleClick }: AmendmentsTrackerProps) {
  const amendments = [
    {
      number: '1',
      year: 1951,
      title: 'Land Acquisition Amendment',
      description: 'Amended Article 31 and added Article 31A and 31B'
    },
    {
      number: '42',
      year: 1976,
      title: 'Fundamental Duties',
      description: 'Added Part IV-A with fundamental duties'
    },
    {
      number: '44',
      year: 1978,
      title: 'Right to Property',
      description: 'Removed right to property from fundamental rights'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Constitutional Amendments</h1>
        <p className="text-gray-600">Track changes to the Indian Constitution over time</p>
      </div>

      <div className="grid gap-4">
        {amendments.map((amendment) => (
          <Card key={amendment.number} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold">Amendment {amendment.number}</h3>
                    <Badge variant="outline">{amendment.year}</Badge>
                  </div>
                  <h4 className="font-medium mb-2">{amendment.title}</h4>
                  <p className="text-gray-600">{amendment.description}</p>
                </div>
                <FileText className="h-5 w-5 text-gray-400 mt-1" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}