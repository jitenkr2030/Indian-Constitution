import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const lang = searchParams.get('lang') || 'en'
    const type = searchParams.get('type') || 'all' // all, articles, rights, amendments
    
    if (!query.trim()) {
      return NextResponse.json({
        success: false,
        error: 'Search query is required'
      }, { status: 400 })
    }

    let results = []

    // Search articles
    if (type === 'all' || type === 'articles') {
      const articles = await db.article.findMany({
        where: {
          OR: [
            { titleEn: { contains: query, mode: 'insensitive' } },
            { titleHi: { contains: query, mode: 'insensitive' } },
            { titleTa: { contains: query, mode: 'insensitive' } },
            { contentEn: { contains: query, mode: 'insensitive' } },
            { contentHi: { contains: query, mode: 'insensitive' } },
            { contentTa: { contains: query, mode: 'insensitive' } },
            { number: { contains: query } }
          ]
        },
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
            }
          }
        },
        take: 20
      })

      results.push(...articles.map(article => ({
        type: 'article',
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
        simplifiedExplanation: article.simplifiedExps[0] || null
      })))
    }

    // Search amendments
    if (type === 'all' || type === 'amendments') {
      const amendments = await db.amendment.findMany({
        where: {
          OR: [
            { titleEn: { contains: query, mode: 'insensitive' } },
            { titleHi: { contains: query, mode: 'insensitive' } },
            { titleTa: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { actName: { contains: query, mode: 'insensitive' } }
          ]
        },
        include: {
          articles: {
            select: {
              id: true,
              number: true,
              titleEn: true,
            }
          }
        },
        take: 10
      })

      results.push(...amendments.map(amendment => ({
        type: 'amendment',
        id: amendment.id,
        number: amendment.number,
        year: amendment.year,
        title: lang === 'hi' ? amendment.titleHi || amendment.titleEn : 
               lang === 'ta' ? amendment.titleTa || amendment.titleEn : amendment.titleEn,
        description: amendment.description,
        actName: amendment.actName,
        articles: amendment.articles.map(a => ({
          id: a.id,
          number: a.number,
          title: a.titleEn
        }))
      })))
    }

    // Search emergency guides
    if (type === 'all' || type === 'emergency') {
      const guides = await db.emergencyGuide.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { contentEn: { contains: query, mode: 'insensitive' } },
            { contentHi: { contains: query, mode: 'insensitive' } },
            { contentTa: { contains: query, mode: 'insensitive' } },
            { category: { contains: query, mode: 'insensitive' } }
          ]
        },
        take: 10
      })

      results.push(...guides.map(guide => ({
        type: 'emergency',
        id: guide.id,
        title: guide.title,
        category: guide.category,
        content: lang === 'hi' ? guide.contentHi || guide.contentEn : 
                 lang === 'ta' ? guide.contentTa || guide.contentEn : guide.contentEn,
        helpline: guide.helpline,
        legalAid: guide.legalAid
      })))
    }

    return NextResponse.json({
      success: true,
      data: {
        query,
        count: results.length,
        results: results.sort((a, b) => {
          // Sort by importance for articles, then by relevance
          if (a.type === 'article' && b.type === 'article') {
            return (b.importance || 0) - (a.importance || 0)
          }
          return 0
        })
      }
    })

  } catch (error) {
    console.error('Error searching:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to search' },
      { status: 500 }
    )
  }
}