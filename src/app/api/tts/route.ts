import { NextRequest, NextResponse } from 'next/server'
import ZAI from 'z-ai-web-dev-sdk'

export async function POST(request: NextRequest) {
  try {
    const { text, voice = 'tongtong', speed = 1.0 } = await request.json()

    if (!text || text.trim().length === 0) {
      return NextResponse.json({
        success: false,
        error: 'Text is required'
      }, { status: 400 })
    }

    // Check text length limit (1024 characters max)
    if (text.length > 1024) {
      return NextResponse.json({
        success: false,
        error: 'Text input exceeds maximum length of 1024 characters'
      }, { status: 400 })
    }

    // Validate speed range (0.5 to 2.0)
    if (speed < 0.5 || speed > 2.0) {
      return NextResponse.json({
        success: false,
        error: 'Speed must be between 0.5 and 2.0'
      }, { status: 400 })
    }

    // Create ZAI SDK instance
    const zai = await ZAI.create()

    // Generate TTS audio
    const response = await zai.audio.tts.create({
      input: text.trim(),
      voice: voice,
      speed: speed,
      response_format: 'wav',
      stream: false
    })

    // Get array buffer from Response object
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(new Uint8Array(arrayBuffer))

    // Return audio as response
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': buffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    })

  } catch (error) {
    console.error('TTS API Error:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate speech'
    }, { status: 500 })
  }
}