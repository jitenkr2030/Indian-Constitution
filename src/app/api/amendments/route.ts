import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    const year = searchParams.get('year')
    const number = searchParams.get('number')

    // Build where clause
    const whereClause: any = {}
    if (year) whereClause.year = parseInt(year)
    if (number) whereClause.number = parseInt(number)

    // Fetch amendments with related articles
    const amendments = await db.amendment.findMany({
      where: whereClause,
      include: {
        articles: {
          select: {
            id: true,
            number: true,
            titleEn: true,
            titleHi: true,
            titleTa: true,
          }
        }
      },
      orderBy: [
        { year: 'asc' },
        { number: 'asc' }
      ]
    })

    // Format response based on language
    const formattedAmendments = amendments.map(amendment => ({
      id: amendment.id,
      number: amendment.number,
      year: amendment.year,
      title: lang === 'hi' ? amendment.titleHi || amendment.titleEn : 
             lang === 'ta' ? amendment.titleTa || amendment.titleEn : amendment.titleEn,
      description: amendment.description,
      actName: amendment.actName,
      articles: amendment.articles.map(article => ({
        id: article.id,
        number: article.number,
        title: lang === 'hi' ? article.titleHi || article.titleEn : 
               lang === 'ta' ? article.titleTa || article.titleEn : article.titleEn
      }))
    }))

    // Get timeline data
    const timelineData = formattedAmendments.reduce((acc, amendment) => {
      const decade = Math.floor(amendment.year / 10) * 10
      if (!acc[decade]) {
        acc[decade] = {
          decade,
          count: 0,
          amendments: []
        }
      }
      acc[decade].count++
      acc[decade].amendments.push(amendment)
      return acc
    }, {} as Record<number, { decade: number; count: number; amendments: any[] }>)

    // Get statistics
    const stats = {
      total: amendments.length,
      byDecade: Object.keys(timelineData).length,
      latestYear: Math.max(...amendments.map(a => a.year)),
      earliestYear: Math.min(...amendments.map(a => a.year)),
      thisDecade: amendments.filter(a => a.year >= 2020).length,
      lastDecade: amendments.filter(a => a.year >= 2010 && a.year < 2020).length
    }

    return NextResponse.json({
      success: true,
      data: {
        amendments: formattedAmendments,
        timeline: Object.values(timelineData).sort((a, b) => a.decade - b.decade),
        stats
      }
    })

  } catch (error) {
    console.error('Error fetching amendments:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch amendments' },
      { status: 500 }
    )
  }
}