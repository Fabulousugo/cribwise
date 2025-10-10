import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const { userId, schoolEmail } = await request.json()

    if (!userId || !schoolEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate it's a .edu.ng email
    if (!schoolEmail.endsWith('.edu.ng')) {
      return NextResponse.json(
        { error: 'Must be a valid .edu.ng email address' },
        { status: 400 }
      )
    }

    // Generate verification token
    const token = crypto.randomBytes(32).toString('hex')

    // Update user profile with token
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        school_email: schoolEmail,
        school_email_verification_token: token,
        school_email_verified: false,
      })
      .eq('id', userId)

    if (updateError) {
      console.error('Database update error:', updateError)
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      )
    }

    // Create verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/verify-email?token=${token}`

    // TODO: In production, send real email via Resend, SendGrid, etc.
    // For now, we'll just log it
    console.log('='.repeat(60))
    console.log('VERIFICATION EMAIL')
    console.log('='.repeat(60))
    console.log(`To: ${schoolEmail}`)
    console.log(`Subject: Verify your Cribwise school email`)
    console.log(`\nClick this link to verify your email:\n${verificationUrl}`)
    console.log('='.repeat(60))

    return NextResponse.json({ 
      success: true,
      message: 'Verification email sent! Check your console for the link (production will email it).',
      // In development, return the URL so we can test
      verificationUrl: process.env.NODE_ENV === 'development' ? verificationUrl : undefined
    })

  } catch (error) {
    console.error('Send verification error:', error)
    return NextResponse.json(
      { error: 'Failed to send verification email' },
      { status: 500 }
    )
  }
}