import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import VerifyEmail from '@/components/authentication/verify-email'

// basic email format check
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// practical maximum length of an email address
const MAX_EMAIL_LENGTH = 254

// metadata of this page
export const metadata = {
	title: 'Verify your email',
	robots: { index: false, follow: false },
	referrer: 'no-referrer',
}

// page is NOT async, it never awaits searchParams itself
export default function VerifyEmailPage({ searchParams }) {
	return (
		// showing the skeleton while the child reads the url data
		<Suspense fallback={<VerifyEmailSkeleton />}>
			{/* passing the promise down without awaiting it */}
			<VerifyEmailContent searchParams={searchParams} />
		</Suspense>
	)
}

// async child: the only place that reads searchParams
async function VerifyEmailContent({ searchParams }) {
	// reading the url data here, inside the Suspense boundary
	const { email } = await searchParams

	// email can be undefined, or an array for ?email=a&email=b
	if (typeof email !== 'string') redirect('/signup')

	// cleaning the email before validating it
	const normalizedEmail = email.trim().toLowerCase()

	// sending the user back if the email is too long or badly formatted
	if (
		normalizedEmail.length > MAX_EMAIL_LENGTH ||
		!EMAIL_REGEX.test(normalizedEmail)
	) {
		redirect('/signup')
	}

	return <VerifyEmail email={normalizedEmail} />
}

// fallback shown while the url data is being read
function VerifyEmailSkeleton() {
	return (
		// same outer wrapper as the real page to avoid layout shift
		<main
			aria-busy='true'
			className='flex min-h-screen items-center justify-center bg-slate-950 px-4 py-8 sm:px-6'
		>
			<div className='w-full max-w-xl'>
				<section className='animate-pulse rounded-2xl border border-slate-800/80 bg-slate-900/60 p-5 sm:p-7 lg:p-8'>
					{/* header placeholders */}
					<div className='mb-6 space-y-3'>
						<div className='h-3 w-32 rounded bg-slate-800' />
						<div className='h-7 w-56 rounded bg-slate-800' />
						<div className='h-4 w-64 rounded bg-slate-800' />
					</div>

					{/* email box placeholder */}
					<div className='mb-4 h-14 rounded-lg bg-slate-800/70' />

					{/* otp input and button placeholders */}
					<div className='space-y-4'>
						<div className='h-12 rounded-lg bg-slate-800/70' />
						<div className='h-11 rounded-xl bg-slate-800' />
					</div>
				</section>
			</div>
		</main>
	)
}