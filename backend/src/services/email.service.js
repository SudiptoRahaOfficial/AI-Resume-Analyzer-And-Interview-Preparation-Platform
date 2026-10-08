/**
    - file name: email.service.js
    - responsibility: responsible for email services
 */

// importing dependencis
const nodemailer = require('nodemailer')
const envConfig = require('../configs/env.config')

// configuring transporter
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		type: 'OAuth2',
		user: envConfig.GOOGLE_USER,
		clientId: envConfig.GOOGLE_CLIENT_ID,
		clientSecret: envConfig.GOOGLE_CLIENT_SECRET,
		refreshToken: envConfig.GOOGLE_REFRESH_TOKEN,
	},
})

// Verify the connection configuration
transporter.verify((error) => {
	if (error) {
		console.error('Error connecting to email server:', error)
	} else {
		console.log('Email server is ready to send emails!')
	}
})

// Function to send email
const sendEmail = async (to, subject, text, html) => {
	try {
		const info = await transporter.sendMail({
			from: `"AI Resume Analyzer" <${envConfig.GOOGLE_USER}>`, // sender address
			to, // list of receivers
			subject, // Subject line
			text, // plain text body
			html, // html body
		})

		console.log('Message sent: %s', info.messageId)
		return info
	} catch (error) {
		console.error('Error sending email:', error)
		throw error
	}
}

// function for sending email on new user signup
async function sendSignupEmail(userEmail, userName, otp) {
	const subject = 'Welcome to AI Resume Analyzer'

	const text = `Hello ${userName},

Thank you for joining at AI Resume Analyzer. We're excited to have you on board!

Your verification code for AI Resume Analyzer is: ${otp}

This code will expire in next 3 minutes. Verify your account with this code to get full access. 

For your security, do not share this verification code with anyone.

Best regards,
The AI Resume Analyzer Team`

	const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Verify Your Email</title>

<style>
  body, table, td, p, h1 {
    margin:0;
    padding:0;
    font-family:Arial, Helvetica, sans-serif;
  }

  @media only screen and (max-width:600px){
    .container{width:100%!important;}
    .content{padding:34px 24px!important;}
    .header{padding:28px 24px!important;}
    .footer{padding:24px!important;}
    .title{font-size:30px!important;}
    .otp{font-size:30px!important;letter-spacing:7px!important;}
  }
</style>
</head>

<body style="margin:0;padding:0;background:#f4f5f7;">

<table width="100%" cellpadding="0" cellspacing="0" border="0"
style="background:#f4f5f7;padding:48px 16px;">

<tr>
<td align="center">

<table class="container"
width="560"
cellpadding="0"
cellspacing="0"
border="0"
style="width:100%;max-width:560px;background:#ffffff;">

  <!-- Header -->
  <tr>
    <td class="header"
    style="padding:30px 36px;border-bottom:1px solid #eeeeee;">

      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="left">

            <p style="font-size:15px;font-weight:700;letter-spacing:-0.2px;color:#111827;">
              Resume<span style="color:#0891b2;">AI</span>
            </p>

          </td>

          <td align="right">

            <p style="font-size:11px;font-weight:600;letter-spacing:1.4px;text-transform:uppercase;color:#9ca3af;">
              Account
            </p>

          </td>
        </tr>
      </table>

    </td>
  </tr>

  <!-- Content -->
  <tr>
    <td class="content"
    style="padding:48px 44px 44px 44px;">

      <p style="font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0891b2;">
        Email Verification
      </p>

      <h1 class="title"
      style="margin-top:14px;font-size:34px;line-height:1.2;font-weight:700;letter-spacing:-1px;color:#111827;">
        Verify your email
      </h1>

      <p style="margin-top:20px;font-size:15px;line-height:1.8;color:#4b5563;">
        Hello <strong style="color:#111827;">${userName}</strong>,
      </p>

      <p style="margin-top:16px;font-size:15px;line-height:1.8;color:#4b5563;">
        Welcome to <strong style="color:#111827;">ResumeAI</strong>. You're one step away from accessing AI-powered resume analysis and interview preparation.
      </p>

      <p style="margin-top:16px;font-size:15px;line-height:1.8;color:#4b5563;">
        Use the verification code below to activate your account:
      </p>

      <!-- OTP -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="margin-top:36px;">

        <tr>
          <td
          style="padding:22px 0;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;">

            <p style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;">
              Verification Code
            </p>

            <p class="otp"
            style="margin-top:13px;font-size:38px;line-height:1;font-weight:700;letter-spacing:9px;color:#111827;">
              ${otp}
            </p>

          </td>
        </tr>

      </table>

      <!-- Expiry -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="margin-top:26px;">

        <tr>
          <td style="padding:0 0 0 14px;border-left:2px solid #0891b2;">

            <p style="font-size:13px;line-height:1.7;color:#374151;">
              <strong>This code expires in 3 minutes.</strong><br/>
              Enter it on the verification page before it expires.
            </p>

          </td>
        </tr>

      </table>

      <!-- Security -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="margin-top:26px;">

        <tr>
          <td style="padding:0 0 0 14px;border-left:2px solid #d1d5db;">

            <p style="font-size:13px;line-height:1.7;color:#6b7280;">
              <strong style="color:#374151;">Security Notice</strong><br/>
              Never share this verification code with anyone. ResumeAI will never ask for your OTP by email, phone, or chat.
            </p>

          </td>
        </tr>

      </table>

      <p style="margin-top:30px;font-size:14px;line-height:1.8;color:#6b7280;">
        If you didn't create a ResumeAI account, you can safely ignore this email. No further action is required.
      </p>

      <p style="margin-top:32px;font-size:14px;line-height:1.8;color:#374151;">
        Best regards,<br/>
        <strong>ResumeAI Team</strong>
      </p>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td class="footer"
    style="padding:26px 36px;border-top:1px solid #eeeeee;background:#fafafa;">

      <p style="font-size:11px;line-height:1.7;color:#9ca3af;">
        This is an automated email from ResumeAI. Please do not reply to this message.
      </p>

      <p style="margin-top:7px;font-size:11px;color:#c4c7cc;">
        © ${new Date().getFullYear()} ResumeAI. All rights reserved.
      </p>

    </td>
  </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`

	await sendEmail(userEmail, subject, text, html)
}

// function for sending email on user signin
async function sendSigninEmail(userEmail, userName) {
	const subject = 'New Sign-In to AI Resume Analyzer'

	const text = `Hello ${userName},

We detected a new sign-in to your AI Resume Analyzer account.

If this sign-in was performed by you, no further action is required.

If you did not sign in to your account, please secure your account immediately and contact support if necessary.

Best regards,
The AI Resume Analyzer Team`

	const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Sign-In Alert</title>

<style>
  body, table, td, p, h1 {
    margin:0;
    padding:0;
    font-family:Arial, Helvetica, sans-serif;
  }

  @media only screen and (max-width:600px){
    .container{width:100%!important;}
    .content{padding:34px 24px!important;}
    .header{padding:28px 24px!important;}
    .footer{padding:24px!important;}
    .title{font-size:30px!important;}
  }
</style>
</head>

<body style="margin:0;padding:0;background:#f4f5f7;">

<table width="100%" cellpadding="0" cellspacing="0" border="0"
style="background:#f4f5f7;padding:48px 16px;">

<tr>
<td align="center">

<table class="container"
width="560"
cellpadding="0"
cellspacing="0"
border="0"
style="width:100%;max-width:560px;background:#ffffff;">

  <!-- Header -->
  <tr>
    <td class="header"
    style="padding:30px 36px;border-bottom:1px solid #eeeeee;">

      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>

          <td align="left">

            <p style="font-size:15px;font-weight:700;letter-spacing:-0.2px;color:#111827;">
              Resume<span style="color:#0891b2;">AI</span>
            </p>

          </td>

          <td align="right">

            <p style="font-size:11px;font-weight:600;letter-spacing:1.4px;text-transform:uppercase;color:#9ca3af;">
              Security
            </p>

          </td>

        </tr>
      </table>

    </td>
  </tr>

  <!-- Content -->
  <tr>
    <td class="content"
    style="padding:48px 44px 44px 44px;">

      <p style="font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0891b2;">
        Account Activity
      </p>

      <h1 class="title"
      style="margin-top:14px;font-size:34px;line-height:1.2;font-weight:700;letter-spacing:-1px;color:#111827;">
        New sign-in detected
      </h1>

      <p style="margin-top:20px;font-size:15px;line-height:1.8;color:#4b5563;">
        Hello <strong style="color:#111827;">${userName}</strong>,
      </p>

      <p style="margin-top:16px;font-size:15px;line-height:1.8;color:#4b5563;">
        We detected a new sign-in to your <strong style="color:#111827;">ResumeAI</strong> account.
      </p>

      <!-- Activity -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="margin-top:34px;">

        <tr>
          <td style="padding:20px 0;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;">

            <table width="100%" cellpadding="0" cellspacing="0" border="0">

              <tr>
                <td width="42" valign="top">

                  <table width="30" height="30" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center"
                      style="width:30px;height:30px;background:#ecfeff;border-radius:50%;font-size:14px;color:#0891b2;">
                        ✓
                      </td>
                    </tr>
                  </table>

                </td>

                <td valign="top">

                  <p style="font-size:14px;font-weight:700;color:#111827;">
                    Successful sign-in
                  </p>

                  <p style="margin-top:5px;font-size:13px;line-height:1.6;color:#6b7280;">
                    A successful login was made to your ResumeAI account.
                  </p>

                </td>
              </tr>

            </table>

          </td>
        </tr>

      </table>

      <!-- Success -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="margin-top:26px;">

        <tr>
          <td style="padding:0 0 0 14px;border-left:2px solid #22c55e;">

            <p style="font-size:13px;line-height:1.7;color:#374151;">
              <strong>If this was you:</strong><br/>
              No further action is required. Your account is secure.
            </p>

          </td>
        </tr>

      </table>

      <!-- Warning -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="margin-top:26px;">

        <tr>
          <td style="padding:0 0 0 14px;border-left:2px solid #f59e0b;">

            <p style="font-size:13px;line-height:1.7;color:#4b5563;">
              <strong style="color:#92400e;">Didn't sign in?</strong><br/>
              Change your password immediately and review your active sessions to protect your account.
            </p>

          </td>
        </tr>

      </table>

      <p style="margin-top:30px;font-size:14px;line-height:1.8;color:#6b7280;">
        ResumeAI sends this notification whenever a new login is detected to help keep your account secure.
      </p>

      <p style="margin-top:32px;font-size:14px;line-height:1.8;color:#374151;">
        Best regards,<br/>
        <strong>ResumeAI Team</strong>
      </p>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td class="footer"
    style="padding:26px 36px;border-top:1px solid #eeeeee;background:#fafafa;">

      <p style="font-size:11px;line-height:1.7;color:#9ca3af;">
        This is an automated security notification from ResumeAI. Please do not reply to this email.
      </p>

      <p style="margin-top:7px;font-size:11px;color:#c4c7cc;">
        © ${new Date().getFullYear()} ResumeAI. All rights reserved.
      </p>

    </td>
  </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`

	await sendEmail(userEmail, subject, text, html)
}

// function for sending OTP email
async function sendOTPEmail(userEmail, userName, otp) {
	const subject = 'Your Verification Code - AI Resume Analyzer'

	const text = `Hello ${userName},

Your verification code for AI Resume Analyzer is: ${otp}

This code will expire in next 3 minutes. For your security, do not share this verification code with anyone.

If you did not request this verification code, please ignore this email and secure your account if necessary.

Best regards,
The AI Resume Analyzer Team`

	const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Verification Code</title>

<style>
  body, table, td, p, h1 {
    margin:0;
    padding:0;
    font-family:Arial, Helvetica, sans-serif;
  }

  @media only screen and (max-width:600px){
    .container{width:100%!important;}
    .content{padding:34px 24px!important;}
    .header{padding:28px 24px!important;}
    .footer{padding:24px!important;}
    .title{font-size:30px!important;}
    .otp{font-size:30px!important;letter-spacing:7px!important;}
  }
</style>
</head>

<body style="margin:0;padding:0;background:#f4f5f7;">

<table width="100%" cellpadding="0" cellspacing="0" border="0"
style="background:#f4f5f7;padding:48px 16px;">

<tr>
<td align="center">

<table class="container"
width="560"
cellpadding="0"
cellspacing="0"
border="0"
style="width:100%;max-width:560px;background:#ffffff;">

  <!-- Header -->
  <tr>
    <td class="header"
    style="padding:30px 36px;border-bottom:1px solid #eeeeee;">

      <table width="100%" cellpadding="0" cellspacing="0" border="0">

        <tr>

          <td align="left">

            <p style="font-size:15px;font-weight:700;letter-spacing:-0.2px;color:#111827;">
              Resume<span style="color:#0891b2;">AI</span>
            </p>

          </td>

          <td align="right">

            <p style="font-size:11px;font-weight:600;letter-spacing:1.4px;text-transform:uppercase;color:#9ca3af;">
              Account
            </p>

          </td>

        </tr>

      </table>

    </td>
  </tr>

  <!-- Content -->
  <tr>
    <td class="content"
    style="padding:48px 44px 44px 44px;">

      <p style="font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#0891b2;">
        Email Verification
      </p>

      <h1 class="title"
      style="margin-top:14px;font-size:34px;line-height:1.2;font-weight:700;letter-spacing:-1px;color:#111827;">
        New verification code
      </h1>

      <p style="margin-top:20px;font-size:15px;line-height:1.8;color:#4b5563;">
        Hello <strong style="color:#111827;">${userName}</strong>,
      </p>

      <p style="margin-top:16px;font-size:15px;line-height:1.8;color:#4b5563;">
        As requested, we've generated a new email verification code for your <strong style="color:#111827;">ResumeAI</strong> account.
      </p>

      <!-- OTP -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="margin-top:36px;">

        <tr>

          <td
          style="padding:22px 0;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;">

            <p style="font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#9ca3af;">
              Verification Code
            </p>

            <p class="otp"
            style="margin-top:13px;font-size:38px;line-height:1;font-weight:700;letter-spacing:9px;color:#111827;">
              ${otp}
            </p>

          </td>

        </tr>

      </table>

      <!-- Expiry -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="margin-top:26px;">

        <tr>

          <td style="padding:0 0 0 14px;border-left:2px solid #0891b2;">

            <p style="font-size:13px;line-height:1.7;color:#374151;">
              <strong>This code expires in 3 minutes.</strong><br/>
              Use the latest code only. Any previous verification code is no longer valid.
            </p>

          </td>

        </tr>

      </table>

      <!-- Security -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0"
      style="margin-top:26px;">

        <tr>

          <td style="padding:0 0 0 14px;border-left:2px solid #d1d5db;">

            <p style="font-size:13px;line-height:1.7;color:#6b7280;">
              <strong style="color:#374151;">Security Notice</strong><br/>
              Never share this verification code with anyone. ResumeAI will never ask for your OTP by email, phone, or chat.
            </p>

          </td>

        </tr>

      </table>

      <p style="margin-top:30px;font-size:14px;line-height:1.8;color:#6b7280;">
        If you didn't request a new verification code, you can safely ignore this email.
      </p>

      <p style="margin-top:32px;font-size:14px;line-height:1.8;color:#374151;">
        Best regards,<br/>
        <strong>ResumeAI Team</strong>
      </p>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td class="footer"
    style="padding:26px 36px;border-top:1px solid #eeeeee;background:#fafafa;">

      <p style="font-size:11px;line-height:1.7;color:#9ca3af;">
        This is an automated email from ResumeAI. Please do not reply to this message.
      </p>

      <p style="margin-top:7px;font-size:11px;color:#c4c7cc;">
        © ${new Date().getFullYear()} ResumeAI. All rights reserved.
      </p>

    </td>
  </tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`

	await sendEmail(userEmail, subject, text, html)
}

// exporting email sending functions
module.exports = {
	sendSignupEmail,
	sendSigninEmail,
	sendOTPEmail,
}