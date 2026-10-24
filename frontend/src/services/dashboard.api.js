// file: dashboard.api.js
// responsibility: one function per dashboard endpoint

import { authRequest } from './client'

// GET /api/dashboard/statistics
// resolves to { message, success, statistics: { interviewGuides, generatedResumes } }
export function getDashboardStatistics() {
	return authRequest('/dashboard/statistics')
}