import { NextResponse } from 'next/server'
import { seedSampleData } from '@/lib/seed-data'

export async function POST() {
  try {
    const result = await seedSampleData()
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Sample data seeded successfully!',
        data: result
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Error in seed API:', error)
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}