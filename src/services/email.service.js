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
<title>Email Verification</title>

<style>
  body, table, td, p, h1 {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  img {
    border: 0;
    display: block;
    max-width: 100%;
  }

  @media only screen and (max-width: 600px) {
    .container {
      width: 100% !important;
    }

    .content {
      padding: 28px 22px !important;
    }

    .header {
      padding: 24px 20px !important;
    }

    .footer {
      padding: 18px 20px !important;
    }

    .title {
      font-size: 22px !important;
    }

    .otp {
      font-size: 28px !important;
      letter-spacing: 5px !important;
    }

    .text {
      font-size: 14px !important;
      line-height: 1.7 !important;
    }
  }
</style>
</head>

<body style="background:#f4f7fb; margin:0; padding:0;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f7fb; padding:30px 12px;">
<tr>
<td align="center">

<table
  class="container"
  width="560"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="width:100%; max-width:560px; background:#ffffff; border-radius:12px; overflow:hidden;"
>

  <!-- Header -->
  <tr>
    <td
      class="header"
      align="center"
      style="background:#0f172a; padding:30px;"
    >
      <h1
        class="title"
        style="font-size:24px; color:#ffffff; font-weight:700;"
      >
        AI Resume Analyzer
      </h1>

      <p style="margin-top:8px; font-size:14px; color:#cbd5e1;">
        Secure Account Verification
      </p>
    </td>
  </tr>

  <!-- Content -->
  <tr>
    <td class="content" style="padding:38px 34px;">

      <p class="text" style="font-size:16px; line-height:1.7; color:#1f2937;">
        Hello <strong>${userName}</strong>,
      </p>

      <p class="text" style="margin-top:18px; font-size:15px; line-height:1.7; color:#4b5563;">
        Thank you for joining <strong>AI Resume Analyzer</strong>. We're excited to have you on board.
      </p>

      <p class="text" style="margin-top:18px; font-size:15px; line-height:1.7; color:#4b5563;">
        To complete your account verification, use the verification code below:
      </p>

      <!-- OTP -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
        <tr>
          <td
            align="center"
            style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:22px 10px;"
          >
            <p style="font-size:12px; color:#64748b; text-transform:uppercase; letter-spacing:1.5px; font-weight:600;">
              Verification Code
            </p>

            <p
              class="otp"
              style="margin-top:8px; font-size:34px; font-weight:700; letter-spacing:8px; color:#0f172a;"
            >
              ${otp}
            </p>
          </td>
        </tr>
      </table>

      <!-- Expiry -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
        <tr>
          <td style="background:#fff7ed; border-left:4px solid #f97316; border-radius:4px; padding:14px;">
            <p class="text" style="font-size:14px; line-height:1.6; color:#9a3412;">
              <strong>⏱ This code expires in 3 minutes.</strong><br/>
              Please verify your account before it expires.
            </p>
          </td>
        </tr>
      </table>

      <!-- Security -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
        <tr>
          <td style="background:#f0fdf4; border-left:4px solid #22c55e; border-radius:4px; padding:14px;">
            <p class="text" style="font-size:14px; line-height:1.6; color:#166534;">
              <strong>Security notice:</strong><br/>
              Never share this verification code with anyone. Our team will never ask for it.
            </p>
          </td>
        </tr>
      </table>

      <p class="text" style="font-size:15px; line-height:1.7; color:#4b5563;">
        If you did not create this account, you can safely ignore this email.
      </p>

      <p class="text" style="margin-top:28px; font-size:15px; line-height:1.6; color:#374151;">
        Best regards,<br/>
        <strong>The AI Resume Analyzer Team</strong>
      </p>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td
      class="footer"
      align="center"
      style="background:#f8fafc; border-top:1px solid #e5e7eb; padding:20px 24px;"
    >
      <p style="font-size:12px; line-height:1.6; color:#94a3b8;">
        This is an automated message. Please do not reply to this email.
      </p>

      <p style="margin-top:6px; font-size:12px; color:#94a3b8;">
        © ${new Date().getFullYear()} AI Resume Analyzer
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
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  img {
    border: 0;
    display: block;
    max-width: 100%;
  }

  @media only screen and (max-width: 600px) {
    .container {
      width: 100% !important;
    }

    .header {
      padding: 24px 20px !important;
    }

    .content {
      padding: 28px 22px !important;
    }

    .footer {
      padding: 18px 20px !important;
    }

    .title {
      font-size: 22px !important;
    }

    .alert-title {
      font-size: 16px !important;
      line-height: 1.5 !important;
    }

    .text {
      font-size: 14px !important;
      line-height: 1.7 !important;
    }
  }
</style>
</head>

<body style="background:#f4f7fb; margin:0; padding:0;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f7fb; padding:30px 12px;">
<tr>
<td align="center">

<table
  class="container"
  width="560"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="width:100%; max-width:560px; background:#ffffff; border-radius:12px; overflow:hidden;"
>

  <!-- Header -->
  <tr>
    <td
      class="header"
      align="center"
      style="background:#0f172a; padding:30px;"
    >
      <h1
        class="title"
        style="font-size:24px; color:#ffffff; font-weight:700;"
      >
        AI Resume Analyzer
      </h1>

      <p style="margin-top:8px; font-size:14px; color:#cbd5e1;">
        Account Security Alert
      </p>
    </td>
  </tr>

  <!-- Content -->
  <tr>
    <td class="content" style="padding:38px 34px;">

      <p class="text" style="font-size:16px; line-height:1.7; color:#1f2937;">
        Hello <strong>${userName}</strong>,
      </p>

      <!-- Sign-in Alert Box -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
        <tr>
          <td
            align="center"
            style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:22px 14px;"
          >
            <p style="font-size:12px; color:#64748b; text-transform:uppercase; letter-spacing:1.5px; font-weight:600;">
              New Sign-In Detected
            </p>

            <p
              class="alert-title"
              style="margin-top:10px; font-size:17px; font-weight:600; line-height:1.5; color:#0f172a;"
            >
              🔐 A new sign-in was detected on your account.
            </p>
          </td>
        </tr>
      </table>

      <p class="text" style="font-size:15px; line-height:1.7; color:#4b5563;">
        We detected a new sign-in to your <strong>AI Resume Analyzer</strong> account.
      </p>

      <p class="text" style="margin-top:18px; font-size:15px; line-height:1.7; color:#4b5563;">
        If this sign-in was performed by you, <strong>no further action is required.</strong>
      </p>

      <!-- Security Warning -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0;">
        <tr>
          <td style="background:#fef2f2; border-left:4px solid #ef4444; border-radius:4px; padding:16px;">
            <p class="text" style="font-size:14px; line-height:1.7; color:#991b1b;">
              <strong>⚠️ Didn't sign in?</strong><br/>
              If you did not sign in to your account, secure your account immediately and contact support if necessary.
            </p>
          </td>
        </tr>
      </table>

      <p class="text" style="font-size:14px; line-height:1.7; color:#64748b;">
        For your security, we recommend reviewing your account activity if you don't recognize this sign-in.
      </p>

      <p class="text" style="margin-top:28px; font-size:15px; line-height:1.6; color:#374151;">
        Best regards,<br/>
        <strong>The AI Resume Analyzer Team</strong>
      </p>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td
      class="footer"
      align="center"
      style="background:#f8fafc; border-top:1px solid #e5e7eb; padding:20px 24px;"
    >
      <p style="font-size:12px; line-height:1.6; color:#94a3b8;">
        This is an automated security notification. Please do not reply to this email.
      </p>

      <p style="margin-top:6px; font-size:12px; color:#94a3b8;">
        © ${new Date().getFullYear()} AI Resume Analyzer
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
<title>Email Verification</title>

<style>
  body, table, td, p, h1 {
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
  }

  img {
    border: 0;
    display: block;
    max-width: 100%;
  }

  @media only screen and (max-width: 600px) {
    .container {
      width: 100% !important;
    }

    .header {
      padding: 24px 20px !important;
    }

    .content {
      padding: 28px 22px !important;
    }

    .footer {
      padding: 18px 20px !important;
    }

    .title {
      font-size: 22px !important;
    }

    .otp {
      font-size: 28px !important;
      letter-spacing: 5px !important;
    }

    .text {
      font-size: 14px !important;
      line-height: 1.7 !important;
    }
  }
</style>
</head>

<body style="background:#f4f7fb; margin:0; padding:0;">

<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f7fb; padding:30px 12px;">
<tr>
<td align="center">

<table
  class="container"
  width="560"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="width:100%; max-width:560px; background:#ffffff; border-radius:12px; overflow:hidden;"
>

  <!-- Header -->
  <tr>
    <td
      class="header"
      align="center"
      style="background:#0f172a; padding:30px;"
    >
      <h1
        class="title"
        style="font-size:24px; color:#ffffff; font-weight:700;"
      >
        AI Resume Analyzer
      </h1>

      <p style="margin-top:8px; font-size:14px; color:#cbd5e1;">
        Email Verification
      </p>
    </td>
  </tr>

  <!-- Content -->
  <tr>
    <td class="content" style="padding:38px 34px;">

      <p class="text" style="font-size:16px; line-height:1.7; color:#1f2937;">
        Hello <strong>${userName}</strong>,
      </p>

      <p class="text" style="margin-top:18px; font-size:15px; line-height:1.7; color:#4b5563;">
        Your verification code for <strong>AI Resume Analyzer</strong> is:
      </p>

      <!-- OTP Box -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
        <tr>
          <td
            align="center"
            style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:22px 10px;"
          >
            <p style="font-size:12px; color:#64748b; text-transform:uppercase; letter-spacing:1.5px; font-weight:600;">
              Verification Code
            </p>

            <p
              class="otp"
              style="margin-top:8px; font-size:34px; font-weight:700; letter-spacing:8px; color:#0f172a;"
            >
              ${otp}
            </p>
          </td>
        </tr>
      </table>

      <!-- Expiration Notice -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
        <tr>
          <td style="background:#fff7ed; border-left:4px solid #f97316; border-radius:4px; padding:14px;">
            <p class="text" style="font-size:14px; line-height:1.6; color:#9a3412;">
              <strong>⏱ This code expires in 3 minutes.</strong><br/>
              Please complete your verification before the code expires.
            </p>
          </td>
        </tr>
      </table>

      <!-- Security Notice -->
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
        <tr>
          <td style="background:#f0fdf4; border-left:4px solid #22c55e; border-radius:4px; padding:14px;">
            <p class="text" style="font-size:14px; line-height:1.6; color:#166534;">
              <strong>Security notice:</strong><br/>
              Never share this verification code with anyone. Our team will never ask you for this code.
            </p>
          </td>
        </tr>
      </table>

      <p class="text" style="font-size:14px; line-height:1.7; color:#64748b;">
        If you did not request this verification code, please ignore this email and secure your account if necessary.
      </p>

      <p class="text" style="margin-top:28px; font-size:15px; line-height:1.6; color:#374151;">
        Best regards,<br/>
        <strong>The AI Resume Analyzer Team</strong>
      </p>

    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td
      class="footer"
      align="center"
      style="background:#f8fafc; border-top:1px solid #e5e7eb; padding:20px 24px;"
    >
      <p style="font-size:12px; line-height:1.6; color:#94a3b8;">
        This is an automated message. Please do not reply to this email.
      </p>

      <p style="margin-top:6px; font-size:12px; color:#94a3b8;">
        © ${new Date().getFullYear()} AI Resume Analyzer
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