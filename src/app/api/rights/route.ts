import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lang = searchParams.get('lang') || 'en'
    const category = searchParams.get('category') // fundamental_right, directive_principle, etc.

    // Fetch articles by category
    const articles = await db.article.findMany({
      where: {
        category: category || { in: ['fundamental_right', 'directive_principle', 'fundamental_duty'] }
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
            dos: true,
            donts: true,
          }
        }
      },
      orderBy: [
        { importance: 'desc' },
        { number: 'asc' }
      ]
    })

    // Group articles by right type
    const groupedRights = {
      right_to_equality: articles.filter(a => a.number >= '14' && a.number <= '18'),
      right_to_freedom: articles.filter(a => a.number >= '19' && a.number <= '22'),
      right_against_exploitation: articles.filter(a => a.number >= '23' && a.number <= '24'),
      right_to_religion: articles.filter(a => a.number >= '25' && a.number <= '28'),
      cultural_educational_rights: articles.filter(a => a.number === '29' || a.number === '30'),
      constitutional_remedies: articles.filter(a => a.number >= '32' && a.number <= '35'),
      directive_principles: articles.filter(a => a.category === 'directive_principle'),
      fundamental_duties: articles.filter(a => a.category === 'fundamental_duty')
    }

    // Format response
    const formattedRights = Object.entries(groupedRights).reduce((acc, [key, articles]) => {
      acc[key] = articles.map(article => ({
        id: article.id,
        number: article.number,
        title: lang === 'hi' ? article.titleHi || article.titleEn : 
               lang === 'ta' ? article.titleTa || article.titleEn : article.titleEn,
        content: lang === 'hi' ? article.contentHi || article.contentEn : 
                 lang === 'ta' ? article.contentTa || article.contentEn : article.contentEn,
        importance: article.importance,
        part: {
          number: article.part.number,
          title: lang === 'hi' ? article.part.titleHi || article.part.titleEn : 
                 lang === 'ta' ? article.part.titleTa || article.part.titleEn : article.part.titleEn
        },
        simplifiedExplanation: article.simplifiedExps[0] || null
      }))
      return acc
    }, {} as any)

    // Get emergency guides for rights violations
    const emergencyGuides = await db.emergencyGuide.findMany({
      where: {
        category: { in: ['arrest', 'search', 'detention'] }
      },
      select: {
        id: true,
        title: true,
        category: true,
        contentEn: true,
        contentHi: true,
        contentTa: true,
        helpline: true,
        legalAid: true
      }
    })

    const formattedGuides = emergencyGuides.map(guide => ({
      id: guide.id,
      title: guide.title,
      category: guide.category,
      content: lang === 'hi' ? guide.contentHi || guide.contentEn : 
               lang === 'ta' ? guide.contentTa || guide.contentEn : guide.contentEn,
      helpline: guide.helpline,
      legalAid: guide.legalAid
    }))

    return NextResponse.json({
      success: true,
      data: {
        rights: formattedRights,
        emergencyGuides: formattedGuides,
        stats: {
          totalRights: articles.filter(a => a.category === 'fundamental_right').length,
          totalPrinciples: articles.filter(a => a.category === 'directive_principle').length,
          totalDuties: articles.filter(a => a.category === 'fundamental_duty').length,
          importantRights: articles.filter(a => a.importance >= 4).length
        }
      }
    })

  } catch (error) {
    console.error('Error fetching rights:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rights data' },
      { status: 500 }
    )
  }
}