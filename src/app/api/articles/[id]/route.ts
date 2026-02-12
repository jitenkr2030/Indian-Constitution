import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    const articleId = params.id

    // Fetch article with full details
    const article = await db.article.findUnique({
      where: { id: articleId },
      include: {
        part: {
          select: {
            number: true,
            titleEn: true,
            titleHi: true,
            titleTa: true,
          }
        },
        simplifiedExps: {
          where: { language: lang },
          select: {
            title: true,
            content: true,
            examples: true,
            dos: true,
            donts: true,
          }
        },
        relatedCases: {
          select: {
            id: true,
            title: true,
            year: true,
            court: true,
            summaryEn: true,
            summaryHi: true,
            summaryTa: true,
            landmark: true,
          }
        },
        amendments: {
          select: {
            id: true,
            number: true,
            year: true,
            titleEn: true,
            titleHi: true,
            titleTa: true,
            description: true,
          }
        }
      }
    })

    if (!article) {
      return NextResponse.json({
        success: false,
        error: 'Article not found'
      }, { status: 404 })
    }

    // Format response based on language
    const formattedArticle = {
      id: article.id,
      number: article.number,
      title: lang === 'hi' ? article.titleHi || article.titleEn : 
             lang === 'ta' ? article.titleTa || article.titleEn : article.titleEn,
      content: lang === 'hi' ? article.contentHi || article.contentEn : 
               lang === 'ta' ? article.contentTa || article.contentEn : article.contentEn,
      category: article.category,
      importance: article.importance,
      part: {
        number: article.part.number,
        title: lang === 'hi' ? article.part.titleHi || article.part.titleEn : 
               lang === 'ta' ? article.part.titleTa || article.part.titleEn : article.part.titleEn
      },
      simplifiedExplanation: article.simplifiedExps[0] || null,
      relatedCases: article.relatedCases.map(case_ => ({
        id: case_.id,
        title: case_.title,
        year: case_.year,
        court: case_.court,
        summary: lang === 'hi' ? case_.summaryHi || case_.summaryEn : 
                 lang === 'ta' ? case_.summaryTa || case_.summaryEn : case_.summaryEn,
        landmark: case_.landmark
      })),
      amendments: article.amendments.map(amendment => ({
        id: amendment.id,
        number: amendment.number,
        year: amendment.year,
        title: lang === 'hi' ? amendment.titleHi || amendment.titleEn : 
               lang === 'ta' ? amendment.titleTa || amendment.titleEn : amendment.titleEn,
        description: amendment.description
      }))
    }

    return NextResponse.json({
      success: true,
      data: formattedArticle
    })

  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}