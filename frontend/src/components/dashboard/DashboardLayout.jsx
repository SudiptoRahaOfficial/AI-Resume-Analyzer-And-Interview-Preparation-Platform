'use client'

import { useState } from 'react'

import DashboardSidebar from './DashboardSidebar'
import DashboardHeader from './DashboardHeader'

export default function DashboardLayout({
	children,
	title = 'Overview',
	description = 'Your career development workspace',
}) {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	function closeSidebar() {
		setSidebarOpen(false)
	}

	return (
		<div className='min-h-screen bg-[#030712] text-slate-300 selection:bg-indigo-500/30'>
			<DashboardSidebar
				open={sidebarOpen}
				onClose={closeSidebar}
			/>

			<div className='min-h-screen lg:pl-65'>
				<DashboardHeader
					title={title}
					description={description}
					onMenuClick={() => setSidebarOpen(true)}
				/>

				<main className='mx-auto w-full max-w-360 px-4 py-7 sm:px-6 sm:py-9 lg:px-8 lg:py-10'>
					{children}
				</main>
			</div>
		</div>
	)
}