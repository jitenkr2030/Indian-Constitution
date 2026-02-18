import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: articleId } = await context.params
    
    // Mock data for key articles
    const mockArticles: Record<string, any> = {
      '21': {
        id: '21',
        number: '21',
        title: 'Protection of life and personal liberty',
        titleEn: 'Protection of life and personal liberty',
        titleHi: 'जीवन और व्यक्तिगति की सुरक्षा',
        titleTa: 'வாழ்க்கும் தனிப்படத்தின் பாதுகாப்பு',
        content: 'No person shall be deprived of his life or personal liberty except according to procedure established by law...',
        category: 'fundamental_rights',
        importance: 1,
        part: {
          number: 3,
          title: 'Fundamental Rights',
          titleEn: 'Fundamental Rights',
          titleHi: 'मौलिक अधिकार',
          titleTa: 'அடிபட்ட உரிமைகள்'
        }
      },
      '14': {
        id: '14',
        number: '14',
        title: 'Equality before law',
        titleEn: 'Equality before law',
        titleHi: 'कानून के समक्ष समानता',
        titleTa: 'சட்டத்தில் சமமந்தர்',
        content: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India...',
        category: 'fundamental_rights',
        importance: 1,
        part: {
          number: 3,
          title: 'Fundamental Rights',
          titleEn: 'Fundamental Rights',
          titleHi: 'मौलिक अधिकार',
          titleTa: 'அடிபட்ட உரிமைகள்'
        }
      },
      '19': {
        id: '19',
        number: '19',
        title: 'Protection of certain rights regarding freedom of speech, etc.',
        titleEn: 'Protection of certain rights regarding freedom of speech, etc.',
        titleHi: 'भाषण की स्वतंत्रता आदि के संरक्षण के बारे में कुछ अधिकारों का संरक्षण',
        titleTa: 'பேச்சைப்பு, பேச்சுர் போன்றுர் சுதந்திரங்களின் பாதுகாப்பு',
        content: 'All citizens shall have the right to freedom of speech and expression; to assemble peaceably and without arms; to form associations or unions...',
        category: 'fundamental_rights',
        importance: 1,
        part: {
          number: 3,
          title: 'Fundamental Rights',
          titleEn: 'Fundamental Rights',
          titleHi: 'मौलिक अधिकार',
          titleTa: 'அடிபட்ட உரிமைகள்'
        }
      }
    }

    const article = mockArticles[articleId]

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: article
    })

  } catch (error) {
    console.error('Error fetching article:', error)
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}