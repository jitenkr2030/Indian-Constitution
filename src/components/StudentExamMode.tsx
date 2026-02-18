'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

interface StudentExamModeProps {
  language: string
  onArticleClick: (id: string) => void
}

export default function StudentExamMode({ language, onArticleClick }: StudentExamModeProps) {
  const [selectedQuiz, setSelectedQuiz] = useState('')
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const quizzes = [
    {
      id: 'upsc-prelims',
      title: 'UPSC Prelims',
      description: 'Constitution and Polity for UPSC Preliminary Examination',
      questions: 50,
      duration: '60 minutes',
      difficulty: 'Medium'
    },
    {
      id: 'judiciary-exam',
      title: 'Judiciary Exam',
      description: 'Constitutional law for judicial service examinations',
      questions: 100,
      duration: '120 minutes',
      difficulty: 'Hard'
    },
    {
      id: 'school-civics',
      title: 'School Civics',
      description: 'Basic constitution for school students (Class 6-12)',
      questions: 25,
      duration: '30 minutes',
      difficulty: 'Easy'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Student Exam Mode</h1>
        <p className="text-gray-600">Prepare for exams with constitutional quizzes</p>
      </div>

      <div className="grid gap-6">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
                  <p className="text-gray-600 mb-4">{quiz.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">{quiz.questions} Questions</Badge>
                    <Badge variant="outline">{quiz.duration}</Badge>
                    <Badge variant={quiz.difficulty === 'Easy' ? 'secondary' : quiz.difficulty === 'Medium' ? 'default' : 'destructive'}>
                      {quiz.difficulty}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  Start Quiz
                </Button>
                <Button variant="outline">
                  Practice Mode
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Study Resources */}
      <Card>
        <CardHeader>
          <CardTitle>Study Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            <Button variant="outline" className="justify-start">
              <CheckCircle className="h-4 w-4 mr-2" />
              Important Articles List
            </Button>
            <Button variant="outline" className="justify-start">
              <Clock className="h-4 w-4 mr-2" />
              Previous Year Questions
            </Button>
            <Button variant="outline" className="justify-start">
              <XCircle className="h-4 w-4 mr-2" />
              Common Mistakes to Avoid
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}