'use client'

import { useState } from 'react'

import Sidebar from './sidebar'
import Header from './header'
import Footer from './footer'

export default function Layout({ children, title, description }) {
	const [sidebarOpen, setSidebarOpen] = useState(false)

	function closeSidebar() {
		setSidebarOpen(false)
	}

	return (
		<div className='min-h-screen bg-[#030712] text-slate-300 selection:bg-indigo-500/30'>
			<Sidebar
				open={sidebarOpen}
				onClose={closeSidebar}
			/>

			<div className='min-h-screen lg:pl-65'>
				<Header
					title={title}
					description={description}
					onMenuClick={() => setSidebarOpen(true)}
				/>

				<main className='mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-8 py-7 sm:py-9 lg:py-10'>
					{children}
					<Footer />
				</main>
			</div>
		</div>
	)
}