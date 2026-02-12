import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    const part = searchParams.get('part')
    
    // Fetch parts with articles
    const parts = await db.part.findMany({
      orderBy: { order: 'asc' },
      include: {
        articles: {
          orderBy: { number: 'asc' },
          select: {
            id: true,
            number: true,
            titleEn: true,
            titleHi: true,
            titleTa: true,
            category: true,
            importance: true,
            part: {
              select: {
                number: true,
                titleEn: true,
                titleHi: true,
                titleTa: true,
              }
            }
          }
        }
      }
    })

    // Format response based on language
    const formattedParts = parts.map(p => ({
      id: p.id,
      number: p.number,
      title: lang === 'hi' ? p.titleHi || p.titleEn : 
             lang === 'ta' ? p.titleTa || p.titleEn : p.titleEn,
      description: p.description,
      articles: p.articles.map(article => ({
        id: article.id,
        number: article.number,
        title: lang === 'hi' ? article.titleHi || article.titleEn : 
               lang === 'ta' ? article.titleTa || article.titleEn : article.titleEn,
        category: article.category,
        importance: article.importance,
        part: {
          number: article.part.number,
          title: lang === 'hi' ? article.part.titleHi || article.part.titleEn : 
                 lang === 'ta' ? article.part.titleTa || article.part.titleEn : article.part.titleEn
        }
      }))
    }))

    return NextResponse.json({
      success: true,
      data: formattedParts
    })
  } catch (error) {
    console.error('Error fetching constitution:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch constitution data' },
      { status: 500 }
    )
  }
}