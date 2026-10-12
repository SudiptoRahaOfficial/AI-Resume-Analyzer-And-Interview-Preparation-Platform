import Link from 'next/link'

export default function DashboardBrand({ onClick }) {
	return (
		<Link
			href='/dashboard'
			onClick={onClick}
			className='flex items-center'
		>
			<span className='text-lg font-bold tracking-tight text-white'>
				Resume<span className='text-indigo-400'>AI</span>
			</span>
		</Link>
	)
}