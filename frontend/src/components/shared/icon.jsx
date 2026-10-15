const iconPaths = {
	layout: (
		<>
			<rect
				x='3'
				y='3'
				width='7'
				height='7'
				rx='1.5'
			/>
			<rect
				x='14'
				y='3'
				width='7'
				height='7'
				rx='1.5'
			/>
			<rect
				x='14'
				y='14'
				width='7'
				height='7'
				rx='1.5'
			/>
			<rect
				x='3'
				y='14'
				width='7'
				height='7'
				rx='1.5'
			/>
		</>
	),

	message: (
		<>
			<path d='M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8z' />
			<path d='M8 12h8' />
			<path d='M8 9h5' />
		</>
	),

	file: (
		<>
			<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z' />
			<path d='M14 2v6h6' />
			<path d='M8 13h8' />
			<path d='M8 17h5' />
		</>
	),

	chart: (
		<>
			<path d='M3 3v18h18' />
			<path d='m19 9-5 5-4-4-5 5' />
		</>
	),

	clipboard: (
		<>
			<rect
				x='5'
				y='4'
				width='14'
				height='17'
				rx='2'
			/>
			<path d='M9 4.5V3h6v1.5' />
			<path d='M9 10h6' />
			<path d='M9 14h6' />
			<path d='M9 18h3' />
		</>
	),

	target: (
		<>
			<circle
				cx='12'
				cy='12'
				r='9'
			/>
			<circle
				cx='12'
				cy='12'
				r='5'
			/>
			<circle
				cx='12'
				cy='12'
				r='1'
			/>
		</>
	),

	layers: (
		<>
			<path d='m12 3 9 5-9 5-9-5 9-5Z' />
			<path d='m3 12 9 5 9-5' />
			<path d='m3 16 9 5 9-5' />
		</>
	),

	'file-check': (
		<>
			<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z' />
			<path d='M14 2v6h6' />
			<path d='m8 14 2 2 5-5' />
		</>
	),

	arrow: (
		<>
			<path d='M5 12h14' />
			<path d='m12 5 7 7-7 7' />
		</>
	),

	plus: (
		<>
			<path d='M12 5v14' />
			<path d='M5 12h14' />
		</>
	),

	sparkles: (
		<>
			<path d='m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z' />
			<path d='m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z' />
		</>
	),

	user: (
		<>
			<circle
				cx='12'
				cy='8'
				r='4'
			/>
			<path d='M5 21v-2a7 7 0 0 1 14 0v2' />
		</>
	),

	settings: (
		<>
			<circle
				cx='12'
				cy='12'
				r='3'
			/>
			<path d='m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.4-2.4 1.4-1.1a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1 0 2Z' />
		</>
	),

	menu: (
		<>
			<path d='M4 6h16' />
			<path d='M4 12h16' />
			<path d='M4 18h16' />
		</>
	),

	close: (
		<>
			<path d='m18 6-12 12' />
			<path d='m6 6 12 12' />
		</>
	),

	clock: (
		<>
			<circle
				cx='12'
				cy='12'
				r='9'
			/>
			<path d='M12 7v5l3 2' />
		</>
	),

	check: <path d='m5 12 4 4L19 6' />,
}

export default function Icon({ name, size = 20, className = '' }) {
	const icon = iconPaths[name]

	if (!icon) {
		return null
	}

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={size}
			height={size}
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='1.7'
			strokeLinecap='round'
			strokeLinejoin='round'
			aria-hidden='true'
			className={className}
		>
			{icon}
		</svg>
	)
}