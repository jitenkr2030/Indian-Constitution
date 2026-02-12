import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    const category = searchParams.get('category') // UPSC, Judiciary, etc.
    const difficulty = searchParams.get('difficulty') // easy, medium, hard
    const limit = parseInt(searchParams.get('limit') || '10')

    // Build where clause
    const whereClause: any = {}
    if (category) whereClause.category = category
    if (difficulty) whereClause.difficulty = difficulty

    // Fetch quiz questions
    const questions = await db.mCQ.findMany({
      where: whereClause,
      include: {
        article: {
          select: {
            id: true,
            number: true,
            titleEn: true,
            titleHi: true,
            titleTa: true,
          }
        }
      },
      take: limit,
      orderBy: [
        { difficulty: 'asc' },
        { category: 'asc' }
      ]
    })

    // Format response
    const formattedQuestions = questions.map(q => ({
      id: q.id,
      question: q.question,
      options: [q.optionA, q.optionB, q.optionC, q.optionD],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      difficulty: q.difficulty,
      category: q.category,
      article: q.article ? {
        id: q.article.id,
        number: q.article.number,
        title: lang === 'hi' ? q.article.titleHi || q.article.titleEn : 
               lang === 'ta' ? q.article.titleTa || q.article.titleEn : q.article.titleEn
      } : null
    }))

    // Get statistics
    const stats = {
      total: questions.length,
      byDifficulty: {
        easy: questions.filter(q => q.difficulty === 'easy').length,
        medium: questions.filter(q => q.difficulty === 'medium').length,
        hard: questions.filter(q => q.difficulty === 'hard').length
      },
      byCategory: questions.reduce((acc, q) => {
        acc[q.category] = (acc[q.category] || 0) + 1
        return acc
      }, {} as Record<string, number>)
    }

    return NextResponse.json({
      success: true,
      data: {
        questions: formattedQuestions,
        stats
      }
    })

  } catch (error) {
    console.error('Error fetching quiz questions:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quiz questions' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { answers, userId, timeSpent, category } = await request.json()

    // Calculate score
    let correctCount = 0
    const results = []

    for (const answer of answers) {
      const question = await db.mCQ.findUnique({
        where: { id: answer.questionId },
        select: { correctAnswer: true, explanation: true }
      })

      if (question) {
        const isCorrect = question.correctAnswer === answer.selectedAnswer
        if (isCorrect) correctCount++

        results.push({
          questionId: answer.questionId,
          selectedAnswer: answer.selectedAnswer,
          correctAnswer: question.correctAnswer,
          isCorrect,
          explanation: question.explanation
        })
      }
    }

    const score = correctCount
    const total = answers.length
    const percentage = Math.round((score / total) * 100)

    // Save quiz attempt if userId provided
    if (userId) {
      try {
        await db.quizAttempt.create({
          data: {
            userId,
            score,
            total,
            timeSpent: timeSpent || 0,
            category: category || 'general'
          }
        })
      } catch (dbError) {
        console.error('Failed to save quiz attempt:', dbError)
      }
    }

    // Determine performance level
    let performance = 'Need Improvement'
    if (percentage >= 80) performance = 'Excellent'
    else if (percentage >= 60) performance = 'Good'
    else if (percentage >= 40) performance = 'Average'

    return NextResponse.json({
      success: true,
      data: {
        score,
        total,
        percentage,
        performance,
        results,
        timeSpent
      }
    })

  } catch (error) {
    console.error('Error submitting quiz:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to submit quiz' },
      { status: 500 }
    )
  }
}