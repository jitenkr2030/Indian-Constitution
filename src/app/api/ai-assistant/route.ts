import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import ZAI from 'z-ai-web-dev-sdk'

// System prompt for Constitution AI Assistant
const CONSTITUTION_SYSTEM_PROMPT = `You are an expert Indian Constitution AI Assistant with deep knowledge of constitutional law, fundamental rights, and legal procedures. Your role is to:

1. Provide accurate, source-backed information about the Indian Constitution
2. Explain constitutional provisions in simple, citizen-friendly language
3. Help users understand their rights and duties
4. Guide citizens on legal procedures and emergency situations
5. Always reference specific Articles, Parts, or Schedules when relevant
6. Provide practical examples and real-life applications
7. Never provide legal advice - always suggest consulting a lawyer for specific cases

Guidelines:
- Be clear, concise, and helpful
- Use simple language that anyone can understand
- Reference specific Articles (e.g., "Article 21", "Article 14")
- Provide practical examples and dos/don'ts
- Include relevant case laws or amendments when applicable
- If you don't know something, say so clearly
- Always prioritize citizen rights and protections

Language: Respond in the same language as the user's query (English, Hindi, or other regional languages).`

export async function POST(request: NextRequest) {
  try {
    const { question, userId, language = 'en' } = await request.json()

    if (!question || !question.trim()) {
      return NextResponse.json({
        success: false,
        error: 'Question is required'
      }, { status: 400 })
    }

    // Initialize ZAI SDK
    const zai = await ZAI.create()

    // Get completion from AI
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'assistant',
          content: CONSTITUTION_SYSTEM_PROMPT
        },
        {
          role: 'user',
          content: question
        }
      ],
      thinking: { type: 'disabled' }
    })

    const aiResponse = completion.choices[0]?.message?.content

    if (!aiResponse) {
      throw new Error('Empty response from AI')
    }

    // Save query to database if userId provided
    if (userId) {
      try {
        await db.aIQuery.create({
          data: {
            userId,
            question,
            answer: aiResponse,
            context: 'Constitution AI Assistant'
          }
        })
      } catch (dbError) {
        console.error('Failed to save AI query:', dbError)
        // Continue even if database save fails
      }
    }

    // Try to extract relevant articles mentioned in the response
    const articleRegex = /Article\s+(\d+[A-Z]?)/gi
    const mentionedArticles = []
    let match

    while ((match = articleRegex.exec(aiResponse)) !== null) {
      mentionedArticles.push(match[1])
    }

    // Fetch details of mentioned articles
    let articleDetails = []
    if (mentionedArticles.length > 0) {
      try {
        const articles = await db.article.findMany({
          where: {
            number: { in: mentionedArticles }
          },
          select: {
            id: true,
            number: true,
            titleEn: true,
            titleHi: true,
            titleTa: true,
            category: true,
            part: {
              select: {
                number: true,
                titleEn: true,
                titleHi: true,
                titleTa: true,
              }
            }
          }
        })

        articleDetails = articles.map(article => ({
          id: article.id,
          number: article.number,
          title: language === 'hi' ? article.titleHi || article.titleEn : 
                 language === 'ta' ? article.titleTa || article.titleEn : article.titleEn,
          category: article.category,
          part: {
            number: article.part.number,
            title: language === 'hi' ? article.part.titleHi || article.part.titleEn : 
                   language === 'ta' ? article.part.titleTa || article.part.titleEn : article.part.titleEn
          }
        }))
      } catch (dbError) {
        console.error('Failed to fetch article details:', dbError)
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        question,
        answer: aiResponse,
        mentionedArticles: articleDetails,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('Error in AI assistant:', error)
    
    // Return a fallback response
    return NextResponse.json({
      success: true,
      data: {
        question: question || '',
        answer: "I'm sorry, I'm having trouble processing your question right now. Please try again or consult with a legal professional for specific legal advice. For immediate help with constitutional rights, you can contact the National Legal Services Authority (NALSA) at 1800-11-1320.",
        mentionedArticles: [],
        timestamp: new Date().toISOString(),
        fallback: true
      }
    })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'User ID is required'
      }, { status: 400 })
    }

    // Get user's AI query history
    const queries = await db.aIQuery.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: {
        id: true,
        question: true,
        answer: true,
        rating: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      success: true,
      data: queries
    })

  } catch (error) {
    console.error('Error fetching AI query history:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch query history' },
      { status: 500 }
    )
  }
}