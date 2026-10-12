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
				<rect
					x='3'
					y='4'
					width='18'
					height='16'
					rx='2'
				/>
				<path d='M7 8h10' />
				<path d='M7 12h10' />
				<path d='M7 16h6' />
			</>
		</svg>
	)
}