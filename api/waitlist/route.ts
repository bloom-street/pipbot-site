import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate name (optional, but should be string if provided)
    const sanitizedName = name && typeof name === 'string' ? name.trim() : undefined

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      )
    }

    // Send welcome email to user
    const welcomeResult = await resend.emails.send({
      from: 'Pip <pip@send.pipbot.co>',
      to: email,
      subject: "You're on the PipBot waitlist! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to PipBot</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table width="480" cellpadding="0" cellspacing="0" border="0" style="max-width: 480px; width: 100%;">
                    <!-- Header -->
                    <tr>
                      <td align="center" style="padding: 20px 0;">
                        <p style="color: #10b981; font-size: 24px; font-weight: 700; margin: 0;">PipBot</p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="background-color: #171717; border: 1px solid #262626; border-radius: 12px; padding: 40px 32px;">
                        <h1 style="color: #f5f5f5; font-size: 24px; font-weight: 600; line-height: 1.3; margin: 0 0 24px;">Hey ${sanitizedName || 'there'}! 👋</h1>
                        
                        <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">Thanks for signing up for early access to PipBot.</p>
                        
                        <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">We're building an AI companion that lives on your desktop — always there when you need help, out of the way when you don't.</p>
                        
                        <p style="color: #a3a3a3; font-size: 16px; line-height: 1.6; margin: 0 0 16px;">We'll email you as soon as PipBot is ready for Mac.</p>
                        
                        <p style="color: #f5f5f5; font-size: 16px; font-weight: 500; margin: 32px 0 0;">— The Pip Team</p>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td align="center" style="padding: 32px 0 0;">
                        <p style="color: #737373; font-size: 14px; margin: 4px 0;">© 2026 Bloom Street. All rights reserved.</p>
                        <p style="color: #737373; font-size: 14px; margin: 4px 0;">pipbot.co</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    })

    if (welcomeResult.error) {
      console.error('Error sending welcome email:', welcomeResult.error)
      return NextResponse.json(
        { error: 'Failed to send welcome email' },
        { status: 500 }
      )
    }

    // Send notification email to admin
    const notificationResult = await resend.emails.send({
      from: 'Pip <pip@send.pipbot.co>',
      to: 'pipbotwaitlist@bloomstreet.io',
      subject: 'New PipBot Waitlist Signup',
      text: `New signup on the PipBot waitlist!

Name: ${sanitizedName || 'Not provided'}
Email: ${email}
Signed up at: ${new Date().toISOString()}

— PipBot Notification System`,
    })

    if (notificationResult.error) {
      console.error('Error sending notification email:', notificationResult.error)
      // Don't fail the request if notification fails, but log it
    }

    return NextResponse.json(
      { message: 'Successfully signed up for waitlist' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Waitlist signup error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
