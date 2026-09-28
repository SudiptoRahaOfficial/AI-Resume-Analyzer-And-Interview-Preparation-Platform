/*
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
		console.log('Email server is ready to send messages')
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
    .content{padding:28px 22px!important;}
    .header{padding:28px 22px!important;}
    .otp{font-size:28px!important;letter-spacing:6px!important;}
    .title{font-size:24px!important;}
  }
</style>
</head>

<body style="margin:0;padding:0;background:#0b1120;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0b1120;padding:32px 12px;">
<tr>
<td align="center">

<table class="container" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background:#111827;border:1px solid #1f2937;border-radius:18px;overflow:hidden;">

  <!-- Header -->
  <tr>
    <td class="header" align="center" style="padding:34px 28px;background:#0f172a;border-bottom:1px solid #1f2937;">
      <p style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#22d3ee;">
        ResumeAI
      </p>

      <h1 class="title" style="margin-top:10px;font-size:28px;font-weight:700;color:#ffffff;">
        Verify Your Email
      </h1>

      <p style="margin-top:10px;font-size:14px;line-height:1.7;color:#94a3b8;">
        AI-Powered Interview Preparation Platform
      </p>
    </td>
  </tr>

  <!-- Content -->
  <tr>
    <td class="content" style="padding:38px 32px;background:#111827;">

      <p style="font-size:16px;line-height:1.7;color:#e5e7eb;">
        Hello <strong>${userName}</strong>,
      </p>

      <p style="margin-top:18px;font-size:15px;line-height:1.8;color:#cbd5e1;">
        Welcome to <strong style="color:#ffffff;">ResumeAI</strong>. You're one step away from accessing AI-powered resume analysis and interview preparation.
      </p>

      <p style="margin-top:18px;font-size:15px;line-height:1.8;color:#cbd5e1;">
        Use the verification code below to activate your account:
      </p>

      <!-- OTP Card -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:30px 0;">
        <tr>
          <td align="center" style="background:#0b1220;border:1px solid #22d3ee33;border-radius:14px;padding:24px 12px;">
            <p style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#67e8f9;">
              Verification Code
            </p>

            <p class="otp" style="margin-top:12px;font-size:36px;font-weight:700;letter-spacing:8px;color:#22d3ee;">
              ${otp}
            </p>
          </td>
        </tr>
      </table>

      <!-- Expiry -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
        <tr>
          <td style="background:#082f49;border-left:4px solid #22d3ee;border-radius:6px;padding:14px;">
            <p style="font-size:14px;line-height:1.7;color:#bae6fd;">
              <strong>This code expires in 3 minutes.</strong><br/>
              Enter it on the verification page before it expires.
            </p>
          </td>
        </tr>
      </table>

      <!-- Security -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
        <tr>
          <td style="background:#1f2937;border-left:4px solid #22c55e;border-radius:6px;padding:14px;">
            <p style="font-size:14px;line-height:1.7;color:#d1fae5;">
              <strong>Security Notice</strong><br/>
              Never share this verification code with anyone. ResumeAI will never ask for your OTP by email, phone, or chat.
            </p>
          </td>
        </tr>
      </table>

      <p style="font-size:15px;line-height:1.8;color:#cbd5e1;">
        If you didn't create a ResumeAI account, you can safely ignore this email. No further action is required.
      </p>

      <p style="margin-top:30px;font-size:15px;line-height:1.8;color:#e5e7eb;">
        Best regards,<br/>
        <strong>ResumeAI Team</strong>
      </p>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td align="center" style="background:#0f172a;border-top:1px solid #1f2937;padding:24px 28px;">
      <p style="font-size:12px;line-height:1.7;color:#64748b;">
        This is an automated email from ResumeAI. Please do not reply to this message.
      </p>

      <p style="margin-top:8px;font-size:12px;color:#475569;">
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
    .header{padding:28px 22px!important;}
    .content{padding:28px 22px!important;}
    .otp{font-size:28px!important;}
    .title{font-size:24px!important;}
  }
</style>
</head>

<body style="margin:0;padding:0;background:#0b1120;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0b1120;padding:32px 12px;">
<tr>
<td align="center">

<table class="container" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background:#111827;border:1px solid #1f2937;border-radius:18px;overflow:hidden;">

  <!-- Header -->
  <tr>
    <td class="header" align="center" style="padding:34px 28px;background:#0f172a;border-bottom:1px solid #1f2937;">
      <p style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#22d3ee;">
        ResumeAI
      </p>

      <h1 class="title" style="margin-top:10px;font-size:28px;font-weight:700;color:#ffffff;">
        Security Alert
      </h1>

      <p style="margin-top:10px;font-size:14px;line-height:1.7;color:#94a3b8;">
        New Sign-In Detected
      </p>
    </td>
  </tr>

  <!-- Content -->
  <tr>
    <td class="content" style="padding:38px 32px;background:#111827;">

      <p style="font-size:16px;line-height:1.7;color:#e5e7eb;">
        Hello <strong>${userName}</strong>,
      </p>

      <p style="margin-top:18px;font-size:15px;line-height:1.8;color:#cbd5e1;">
        We detected a new sign-in to your <strong style="color:#ffffff;">ResumeAI</strong> account.
      </p>

      <!-- Alert Card -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
        <tr>
          <td align="center" style="background:#0b1220;border:1px solid #22d3ee33;border-radius:14px;padding:24px 16px;">
            <p style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#67e8f9;">
              Account Activity
            </p>

            <p style="margin-top:12px;font-size:20px;font-weight:700;color:#ffffff;">
              🔐 New Sign-In Detected
            </p>

            <p style="margin-top:10px;font-size:14px;line-height:1.7;color:#cbd5e1;">
              A successful login was made to your ResumeAI account.
            </p>
          </td>
        </tr>
      </table>

      <!-- Success Notice -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
        <tr>
          <td style="background:#082f49;border-left:4px solid #22d3ee;border-radius:6px;padding:14px;">
            <p style="font-size:14px;line-height:1.7;color:#bae6fd;">
              <strong>If this was you:</strong><br/>
              No further action is required. Your account is secure.
            </p>
          </td>
        </tr>
      </table>

      <!-- Warning -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
        <tr>
          <td style="background:#2b0d12;border-left:4px solid #ef4444;border-radius:6px;padding:14px;">
            <p style="font-size:14px;line-height:1.7;color:#fecaca;">
              <strong>Didn't sign in?</strong><br/>
              Change your password immediately and review your active sessions to protect your account.
            </p>
          </td>
        </tr>
      </table>

      <p style="font-size:15px;line-height:1.8;color:#cbd5e1;">
        ResumeAI sends this notification whenever a new login is detected to help keep your account secure.
      </p>

      <p style="margin-top:30px;font-size:15px;line-height:1.8;color:#e5e7eb;">
        Best regards,<br/>
        <strong>ResumeAI Team</strong>
      </p>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td align="center" style="background:#0f172a;border-top:1px solid #1f2937;padding:24px 28px;">
      <p style="font-size:12px;line-height:1.7;color:#64748b;">
        This is an automated security notification from ResumeAI. Please do not reply to this email.
      </p>

      <p style="margin-top:8px;font-size:12px;color:#475569;">
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
    .header{padding:28px 22px!important;}
    .content{padding:28px 22px!important;}
    .otp{font-size:28px!important;letter-spacing:6px!important;}
    .title{font-size:24px!important;}
  }
</style>
</head>

<body style="margin:0;padding:0;background:#0b1120;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0b1120;padding:32px 12px;">
<tr>
<td align="center">

<table class="container" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background:#111827;border:1px solid #1f2937;border-radius:18px;overflow:hidden;">

  <!-- Header -->
  <tr>
    <td class="header" align="center" style="padding:34px 28px;background:#0f172a;border-bottom:1px solid #1f2937;">
      <p style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#22d3ee;">
        ResumeAI
      </p>

      <h1 class="title" style="margin-top:10px;font-size:28px;font-weight:700;color:#ffffff;">
        New Verification Code
      </h1>

      <p style="margin-top:10px;font-size:14px;line-height:1.7;color:#94a3b8;">
        Email Verification
      </p>
    </td>
  </tr>

  <!-- Content -->
  <tr>
    <td class="content" style="padding:38px 32px;background:#111827;">

      <p style="font-size:16px;line-height:1.7;color:#e5e7eb;">
        Hello <strong>${userName}</strong>,
      </p>

      <p style="margin-top:18px;font-size:15px;line-height:1.8;color:#cbd5e1;">
        As requested, we've generated a new email verification code for your <strong style="color:#ffffff;">ResumeAI</strong> account.
      </p>

      <!-- OTP Card -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:30px 0;">
        <tr>
          <td align="center" style="background:#0b1220;border:1px solid #22d3ee33;border-radius:14px;padding:24px 12px;">
            <p style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#67e8f9;">
              Verification Code
            </p>

            <p class="otp" style="margin-top:12px;font-size:36px;font-weight:700;letter-spacing:8px;color:#22d3ee;">
              ${otp}
            </p>
          </td>
        </tr>
      </table>

      <!-- Expiry -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
        <tr>
          <td style="background:#082f49;border-left:4px solid #22d3ee;border-radius:6px;padding:14px;">
            <p style="font-size:14px;line-height:1.7;color:#bae6fd;">
              <strong>This code expires in 3 minutes.</strong><br/>
              Use the latest code only. Any previous verification code is no longer valid.
            </p>
          </td>
        </tr>
      </table>

      <!-- Security -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
        <tr>
          <td style="background:#1f2937;border-left:4px solid #22c55e;border-radius:6px;padding:14px;">
            <p style="font-size:14px;line-height:1.7;color:#d1fae5;">
              <strong>Security Notice</strong><br/>
              Never share this verification code with anyone. ResumeAI will never ask for your OTP by email, phone, or chat.
            </p>
          </td>
        </tr>
      </table>

      <p style="font-size:15px;line-height:1.8;color:#cbd5e1;">
        If you didn't request a new verification code, you can safely ignore this email.
      </p>

      <p style="margin-top:30px;font-size:15px;line-height:1.8;color:#e5e7eb;">
        Best regards,<br/>
        <strong>ResumeAI Team</strong>
      </p>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td align="center" style="background:#0f172a;border-top:1px solid #1f2937;padding:24px 28px;">
      <p style="font-size:12px;line-height:1.7;color:#64748b;">
        This is an automated email from ResumeAI. Please do not reply to this message.
      </p>

      <p style="margin-top:8px;font-size:12px;color:#475569;">
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