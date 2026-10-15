'use client'

import { useState, useEffect } from 'react'

export default function Footer() {
	// Current year calculation
	const [year, setYear] = useState(null)

	useEffect(() => {
		setYear(new Date().getFullYear())
	}, [])

	return (
		<footer className='mt-8 flex flex-col gap-2 border-t border-slate-800/70 pt-5 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left'>
			<p>&copy; {year ?? ''} ResumeAI. All rights reserved.</p>

			<p>Built to help you prepare with confidence.</p>
		</footer>
	)
}