export default function UploadIcon({ size = 22 }) {
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
		>
			<>
				<circle
					cx='12'
					cy='8'
					r='4'
				/>
				<path d='M5 21v-2a7 7 0 0 1 14 0v2' />
				<path d='m16 11 2 2 4-4' />
			</>
		</svg>
	)
}