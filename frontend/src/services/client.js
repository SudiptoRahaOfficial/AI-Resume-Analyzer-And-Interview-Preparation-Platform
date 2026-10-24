// file: client.js
// responsibility: single place for all http requests to the backend

// base path (proxied to express by next.config.mjs)
const API_BASE_URL = '/api'

// access token lives in memory only
let accessToken = null

// holds the in-flight refresh request so parallel calls share it
let refreshPromise = null

// custom error so components can read message & status easily
export class ApiError extends Error {
	constructor(message, status, data) {
		super(message)
		this.name = 'ApiError'
		this.status = status
		this.data = data
	}
}

// setting / clearing the in-memory access token
export function setAccessToken(token) {
	accessToken = token
}

// base request function used by all other helpers
export async function apiRequest(
	path,
	{ method = 'GET', body, auth = false } = {},
) {
	// checking whether body is FormData (file upload) or plain object (json)
	const isFormData = body instanceof FormData

	// building headers
	const headers = {}

	// letting the browser set content-type (with boundary) for FormData
	if (body && !isFormData) headers['Content-Type'] = 'application/json'
	if (auth && accessToken) headers.Authorization = `Bearer ${accessToken}`

	let response

	try {
		// sending request (cookies are sent automatically on same origin)
		response = await fetch(`${API_BASE_URL}${path}`, {
			method,
			headers,
			credentials: 'same-origin',
			// sending FormData as it is, stringifying only plain objects
			body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
		})
	} catch {
		// fetch only throws on network failure
		throw new ApiError(
			'Network error. Please check your connection.',
			0,
			null,
		)
	}

	// parsing json safely (response may not always be json)
	const data = await response.json().catch(() => null)

	// treating http errors AND { success: false } as failures
	// (resend-verify-email returns 200 with success: false in some cases)
	if (!response.ok || data?.success === false) {
		throw new ApiError(
			data?.message || 'Something went wrong. Please try again.',
			response.status,
			data,
		)
	}

	return data
}

// refreshing access token using the httpOnly refresh cookie
export function refreshAccessToken() {
	// reusing the running request if one already exists
	// (important: refresh tokens rotate, so two parallel calls would break the session)
	if (!refreshPromise) {
		refreshPromise = apiRequest('/auth/refresh-token', { method: 'POST' })
			.then((data) => {
				accessToken = data.accessToken
				return data
			})
			.catch((error) => {
				accessToken = null
				throw error
			})
			.finally(() => {
				refreshPromise = null
			})
	}

	return refreshPromise
}

// request for protected endpoints: retries once after refreshing on 401
export async function authRequest(path, options = {}) {
	try {
		return await apiRequest(path, { ...options, auth: true })
	} catch (error) {
		// only handle expired/invalid access token
		if (error.status !== 401) throw error

		// getting a new access token, then retrying once
		await refreshAccessToken()
		return apiRequest(path, { ...options, auth: true })
	}
}