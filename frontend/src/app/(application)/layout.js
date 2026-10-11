import ApplicationHeader from '@/components/shared/applicationHeader'

export default function ApplicationLayout({ children }) {
	return (
		<>
			<ApplicationHeader />
			{children}
		</>
	)
}