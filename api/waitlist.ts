import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email } = req.body

    // Validate email
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email required' })
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return res.status(500).json({ error: 'Email service not configured' })
    }

    // Send welcome email to user
    await resend.emails.send({
      from: 'Pip <pip@send.pipbot.co>',
      to: email,
      subject: "You're on the list! 🎉",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to PipBot</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: system-ui, -apple-system, sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <table width="500" cellpadding="0" cellspacing="0" border="0" style="max-width: 500px; width: 100%;">
                    <!-- Logo -->
                    <tr>
                      <td align="center" style="padding-bottom: 32px;">
                        <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #34d399, #059669); border-radius: 50%; display: inline-block; position: relative;">
                          <div style="position: absolute; top: 35%; left: 30%; width: 12px; height: 16px; background: #0a0a0a; border-radius: 50%;"></div>
                          <div style="position: absolute; top: 35%; right: 30%; width: 12px; height: 16px; background: #0a0a0a; border-radius: 50%;"></div>
                          <div style="position: absolute; bottom: 30%; left: 35%; width: 30%; height: 3px; background: #0a0a0a; border-radius: 2px;"></div>
                        </div>
                      </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                      <td style="background-color: #171717; border: 1px solid #262626; border-radius: 16px; padding: 40px 32px;">
                        <h1 style="color: #10b981; font-size: 28px; font-weight: 700; margin: 0 0 24px; text-align: center;">
                          Welcome to the waitlist!
                        </h1>

                        <p style="color: #a3a3a3; line-height: 1.7; margin: 0 0 16px; font-size: 16px;">
                          Hey there! Thanks for signing up for early access to PipBot.
                        </p>

                        <p style="color: #a3a3a3; line-height: 1.7; margin: 0 0 16px; font-size: 16px;">
                          We're building something special—an AI companion that actually lives on your desktop and helps you get things done without the constant tab-switching.
                        </p>

                        <p style="color: #a3a3a3; line-height: 1.7; margin: 0 0 24px; font-size: 16px;">
                          We'll reach out as soon as Pip is ready for you.
                        </p>

                        <div style="border-top: 1px solid #262626; padding-top: 24px; margin-top: 24px;">
                          <p style="color: #737373; font-size: 14px; margin: 0;">
                            — The Pip Team
                          </p>
                        </div>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td align="center" style="padding-top: 32px;">
                        <p style="color: #525252; font-size: 13px; margin: 4px 0;">
                          <a href="https://pipbot.co" style="color: #10b981; text-decoration: none;">pipbot.co</a>
                        </p>
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

    // Notify admin about new signup
    await resend.emails.send({
      from: 'PipBot Waitlist <pip@send.pipbot.co>',
      to: 'pipbotwaitlist@bloomstreet.io',
      subject: `New waitlist signup: ${email}`,
      html: `
        <p>New signup: <strong>${email}</strong></p>
        <p>Time: ${new Date().toISOString()}</p>
      `,
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Waitlist signup error:', error)
    return res.status(500).json({ error: 'Failed to process signup' })
  }
}
