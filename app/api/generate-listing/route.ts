/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { location, university, price, bedrooms, bathrooms, propertyType, agentNotes } = await request.json()

    if (!location || !university || !price || !bedrooms || !propertyType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const prompt = `You are a professional real estate listing writer for student housing in Nigeria. Write a compelling property listing.

Property Details:
- Location: ${location}
- University: ${university}
- Price: ₦${parseInt(price).toLocaleString()}/year
- Property Type: ${propertyType}
- Bedrooms: ${bedrooms}
- Bathrooms: ${bathrooms}
${agentNotes ? `- Special Features: ${agentNotes}` : ''}

Generate TWO things:

1. A catchy title (max 60 characters) that includes the property type and location
2. A compelling description (150-250 words) that:
   - Starts with the most appealing feature
   - Highlights location and proximity to ${university}
   - Emphasizes safety, security, and student-friendly aspects
   - Mentions key amenities naturally
   - Creates urgency
   - Ends with a call to action

Write in a professional but warm tone. Be specific and enthusiastic.

IMPORTANT: Return your response in this EXACT format:

TITLE: [Your title here]

DESCRIPTION: [Your description here]

Do not include any other text, markdown, or JSON formatting.`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: 'You are an expert real estate copywriter. You write compelling property listings that convert browsers into renters. You never use JSON or technical formatting - only natural, persuasive text.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 600,
        top_p: 0.9,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Groq API error:', errorData)
      throw new Error('AI generation failed')
    }

    const data = await response.json()
    const generatedText = data.choices[0]?.message?.content

    if (!generatedText) {
      throw new Error('No content generated')
    }

    // Parse the response
    let title = ''
    let description = ''

    // Try to extract TITLE: and DESCRIPTION: format
    const titleMatch = generatedText.match(/TITLE:\s*(.+?)(?=\n|DESCRIPTION:|$)/i)
    const descMatch = generatedText.match(/DESCRIPTION:\s*([\s\S]+?)$/i)

    if (titleMatch && descMatch) {
      title = titleMatch[1].trim()
      description = descMatch[1].trim()
    } else {
      // Fallback: split by newlines and take first line as title
      const lines = generatedText.split('\n').filter((line: string) => line.trim())
      title = lines[0]?.replace(/^(TITLE:|Title:)\s*/i, '').trim() || `${propertyType} in ${location}`
      description = lines.slice(1).join('\n').replace(/^(DESCRIPTION:|Description:)\s*/i, '').trim() || generatedText
    }

    // Clean up any remaining formatting
    title = title.replace(/^["']|["']$/g, '').trim()
    description = description.replace(/^["']|["']$/g, '').trim()

    // Remove any JSON artifacts
    description = description.replace(/\{[\s\S]*?\}/g, '').trim()
    description = description.replace(/```json[\s\S]*?```/g, '').trim()

    return NextResponse.json({
      success: true,
      title,
      description
    })

  } catch (error: any) {
    console.error('Generate listing error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to generate listing' },
      { status: 500 }
    )
  }
}