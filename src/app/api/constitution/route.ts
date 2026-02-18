import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: [
      {
        id: 'part3',
        number: 3,
        title: 'Fundamental Rights',
        titleEn: 'Fundamental Rights',
        titleHi: 'मौलिक अधिकार',
        titleTa: 'அடிபட்ட உரிமைகள்',
        description: 'Contains Articles 12-35 covering fundamental rights',
        articles: ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35']
      }
    ]
  })
}