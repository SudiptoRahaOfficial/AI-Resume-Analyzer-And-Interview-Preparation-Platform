'use client'

import { AuthProvider } from '@/context/AuthContext'
import { DashboardProvider } from '@/context/DashboardContext'
import { ProfileProvider } from '@/context/ProfileContext'
import { InterviewProvider } from '@/context/InterviewContext'
import { ResumeProvider } from '@/context/ResumeContext'

export default function Providers({ children }) {
	return (
		<AuthProvider>
			<DashboardProvider>
				<ProfileProvider>
					<InterviewProvider>
						<ResumeProvider>{children}</ResumeProvider>
					</InterviewProvider>
				</ProfileProvider>
			</DashboardProvider>
		</AuthProvider>
	)
}