'use client'

import { useState, useEffect } from 'react'
import { GraduationCap, Clock, CheckCircle, XCircle, Play, RotateCcw, Trophy, Target, BookOpen, Lightbulb } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: string
  explanation: string
  difficulty: string
  category: string
  article?: {
    id: string
    number: string
    title: string
  }
}

interface QuizResult {
  questionId: string
  selectedAnswer: string
  correctAnswer: string
  isCorrect: boolean
  explanation: string
}

interface StudentExamModeProps {
  language: string
  onArticleClick: (articleId: string) => void
}

export default function StudentExamMode({ language, onArticleClick }: StudentExamModeProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: string]: string}>({})
  const [showResults, setShowResults] = useState(false)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [loading, setLoading] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [timeLeft, setTimeLeft] = useState<number>(600) // 10 minutes

  useEffect(() => {
    if (quizStarted && startTime && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            submitQuiz()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [quizStarted, startTime, showResults])

  const startQuiz = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        lang: language,
        limit: '10'
      })
      if (selectedCategory !== 'all') params.append('category', selectedCategory)
      if (selectedDifficulty !== 'all') params.append('difficulty', selectedDifficulty)

      const response = await fetch(`/api/quiz?${params}`)
      if (response.ok) {
        const data = await response.json()
        setQuestions(data.data.questions)
        setQuizStarted(true)
        setStartTime(Date.now())
        setTimeLeft(600)
        setCurrentQuestion(0)
        setSelectedAnswers({})
        setShowResults(false)
      }
    } catch (error) {
      console.error('Error starting quiz:', error)
    } finally {
      setLoading(false)
    }
  }

  const submitQuiz = async () => {
    if (!startTime) return

    const timeSpent = Math.floor((Date.now() - startTime) / 1000)
    const answers = Object.entries(selectedAnswers).map(([questionId, selectedAnswer]) => ({
      questionId,
      selectedAnswer
    }))

    setLoading(true)
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          userId: 'demo-user',
          timeSpent,
          category: selectedCategory
        })
      })

      if (response.ok) {
        const data = await response.json()
        setQuizResults(data.data.results)
        setShowResults(true)
      }
    } catch (error) {
      console.error('Error submitting quiz:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getScore = () => {
    return quizResults.filter(r => r.isCorrect).length
  }

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-blue-600'
    if (percentage >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (!quizStarted) {
    return (
      <div className="space-y-6">
        {/* Quiz Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Constitution Quiz Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="category">Exam Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="UPSC">UPSC Civil Services</SelectItem>
                    <SelectItem value="Judiciary">Judiciary Services</SelectItem>
                    <SelectItem value="State">State Exams</SelectItem>
                    <SelectItem value="CUET">CUET</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={startQuiz} 
                disabled={loading}
                className="flex-1"
              >
                <Play className="h-4 w-4 mr-2" />
                {loading ? 'Loading...' : 'Start Quiz'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Study Materials */}
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notes">Study Notes</TabsTrigger>
            <TabsTrigger value="previous">Previous Questions</TabsTrigger>
            <TabsTrigger value="tips">Exam Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="space-y-4">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    Fundamental Rights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Article 14-18: Right to Equality</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Equality before law, prohibition of discrimination, equality of opportunity.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800">Article 19-22: Right to Freedom</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Freedom of speech, movement, residence, profession with reasonable restrictions.
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Article 32: Constitutional Remedies</h4>
                    <p className="text-sm text-gray-700 mt-1">
                      Right to move Supreme Court for enforcement of fundamental rights.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    Important Amendments
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-800">42nd Amendment (1976)</h4>
                    <p className="text-sm text-gray-700">
                      Added "Socialist", "Secular" to Preamble, made DPSP justiciable.
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800">44th Amendment (1978)</h4>
                    <p className="text-sm text-gray-700">
                      Limited emergency powers, restored fundamental rights.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="previous" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Previous Year Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>UPSC 2023</Badge>
                    <Badge variant="outline">Medium</Badge>
                  </div>
                  <h4 className="font-semibold mb-2">
                    Which article deals with Right to Constitutional Remedies?
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Options: (A) Article 31 (B) Article 32 (C) Article 33 (D) Article 34
                  </p>
                  <p className="text-sm font-medium text-green-600">Answer: Article 32</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>Judiciary 2022</Badge>
                    <Badge variant="outline">Hard</Badge>
                  </div>
                  <h4 className="font-semibold mb-2">
                    The concept of 'Basic Structure' was introduced in which case?
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Options: (A) Kesavananda Bharati (B) Golaknath (C) Minerva Mills (D) Shankari Prasad
                  </p>
                  <p className="text-sm font-medium text-green-600">Answer: Kesavananda Bharati</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Exam Preparation Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-blue-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Focus on Important Articles</h4>
                      <p className="text-sm text-gray-600">
                        Prioritize Articles 14, 19, 21, 32 - they're frequently asked.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-green-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Understand Landmark Cases</h4>
                      <p className="text-sm text-gray-600">
                        Know Kesavananda Bharati, Minerva Mills, S.R. Bommai cases.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Amendments Timeline</h4>
                      <p className="text-sm text-gray-600">
                        Remember key amendments: 1st, 42nd, 44th, 73rd, 74th, 101st.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-orange-600">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Practice Regularly</h4>
                      <p className="text-sm text-gray-600">
                        Take daily quizzes and review previous year questions.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  if (showResults) {
    const score = getScore()
    const total = questions.length
    const percentage = Math.round((score / total) * 100)
    
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Trophy className={`h-16 w-16 ${percentage >= 60 ? 'text-yellow-500' : 'text-gray-400'}`} />
            </div>
            <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
            <div className={`text-3xl font-bold ${getPerformanceColor(percentage)}`}>
              {percentage}%
            </div>
            <p className="text-gray-600">
              You got {score} out of {total} questions correct
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">{score}</div>
                <div className="text-sm text-gray-600">Correct</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">{total - score}</div>
                <div className="text-sm text-gray-600">Wrong</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{formatTime(600 - timeLeft)}</div>
                <div className="text-sm text-gray-600">Time Taken</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={startQuiz} className="flex-1">
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button variant="outline" onClick={() => setQuizStarted(false)} className="flex-1">
                Back to Setup
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Details */}
        <Card>
          <CardHeader>
            <CardTitle>Review Answers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quizResults.map((result, index) => (
                <div key={result.questionId} className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {result.isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="font-medium">Question {index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{questions[index]?.question}</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Your Answer: </span>
                      <span className={result.isCorrect ? 'text-green-600' : 'text-red-600'}>
                        {result.selectedAnswer}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium">Correct: </span>
                      <span className="text-green-600">{result.correctAnswer}</span>
                    </div>
                  </div>
                  {!result.isCorrect && (
                    <div className="mt-2 p-2 bg-blue-50 rounded">
                      <p className="text-sm"><strong>Explanation:</strong> {result.explanation}</p>
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

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Constitution Quiz
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="text-sm">
                <span className="font-medium">Question {currentQuestion + 1}</span> of {questions.length}
              </div>
              <div className={`text-sm font-mono ${timeLeft < 60 ? 'text-red-600' : ''}`}>
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
      </Card>

      {/* Question */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{question?.category}</Badge>
            <Badge variant={question?.difficulty === 'easy' ? 'default' : 
                          question?.difficulty === 'medium' ? 'secondary' : 'destructive'}>
              {question?.difficulty}
            </Badge>
          </div>
          <CardTitle className="text-lg">{question?.question}</CardTitle>
          {question?.article && (
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm text-gray-600">Related:</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-6 px-2"
                onClick={() => onArticleClick(question.article.id)}
              >
                Article {question.article.number}
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedAnswers[question?.id || '']}
            onValueChange={(value) => setSelectedAnswers(prev => ({
              ...prev,
              [question?.id || '']: value
            }))}
          >
            {question?.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>
        {currentQuestion === questions.length - 1 ? (
          <Button onClick={submitQuiz} disabled={loading}>
            Submit Quiz
          </Button>
        ) : (
          <Button
            onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
            disabled={!selectedAnswers[question?.id || '']}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}