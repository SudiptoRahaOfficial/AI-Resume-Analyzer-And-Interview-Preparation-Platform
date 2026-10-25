export function SettingsIcon({ name, size = 18, className = '' }) {
	const common = {
		xmlns: 'http://www.w3.org/2000/svg',
		width: size,
		height: size,
		viewBox: '0 0 24 24',
		fill: 'none',
		stroke: 'currentColor',
		strokeWidth: 1.7,
		strokeLinecap: 'round',
		strokeLinejoin: 'round',
		className,
		'aria-hidden': true,
	}

	const paths = {
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
		shield: (
			<>
				<path d='M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z' />
				<path d='m9 12 2 2 4-4' />
			</>
		),
		sparkles: (
			<>
				<path d='m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z' />
				<path d='m19 14 1.2 2.8L23 18l-2.8 1.2L19 22l-1.2-2.8L15 18l2.8-1.2L19 14Z' />
			</>
		),
		file: (
			<>
				<path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z' />
				<path d='M14 2v6h6M8 13h8M8 17h8' />
			</>
		),
		monitor: (
			<>
				<rect
					x='3'
					y='4'
					width='18'
					height='13'
					rx='2'
				/>
				<path d='M8 21h8M12 17v4' />
			</>
		),
		lock: (
			<>
				<rect
					x='4'
					y='10'
					width='16'
					height='11'
					rx='2'
				/>
				<path d='M8 10V7a4 4 0 1 1 8 0v3' />
			</>
		),
		dashboard: (
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
		help: (
			<>
				<circle
					cx='12'
					cy='12'
					r='10'
				/>
				<path d='M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3' />
				<path d='M12 17h.01' />
			</>
		),
		arrow: <path d='M7 17 17 7M7 7h10v10' />,
		logout: (
			<>
				<path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
				<path d='M16 17l5-5-5-5M21 12H9' />
			</>
		),
		check: <path d='m5 12 4 4L19 6' />,
		close: <path d='m18 6-12 12M6 6l12 12' />,
		chevron: <path d='m9 18 6-6-6-6' />,
		trash: (
			<>
				<path d='M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5' />
			</>
		),
	}

	return <svg {...common}>{paths[name] || null}</svg>
}

export function SectionHeading({ icon, title, description }) {
	return (
		<div className='mb-5 flex items-start gap-3'>
			<div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-500/10 text-indigo-300'>
				<SettingsIcon
					name={icon}
					size={17}
				/>
			</div>

			<div className='min-w-0'>
				<h2 className='text-sm font-semibold text-white'>{title}</h2>
				<p className='mt-1 text-xs leading-5 text-slate-500'>
					{description}
				</p>
			</div>
		</div>
	)
}

export function SettingsCard({ children, className = '' }) {
	return (
		<section
			className={`rounded-2xl border border-white/8 bg-slate-900/40 p-5 sm:p-6 ${className}`}
		>
			{children}
		</section>
	)
}

export function SettingRow({ title, description, children, divider = true }) {
	return (
		<div
			className={`flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between ${
				divider ? 'border-b border-white/6' : ''
			}`}
		>
			<div className='min-w-0 sm:pr-5'>
				<p className='text-sm font-medium text-slate-200'>{title}</p>
				{description && (
					<p className='mt-1 text-xs leading-5 text-slate-500'>
						{description}
					</p>
				)}
			</div>

			<div className='shrink-0 sm:max-w-[55%]'>{children}</div>
		</div>
	)
}

export function Toggle({ checked, onChange, label }) {
	return (
		<button
			type='button'
			role='switch'
			aria-checked={checked}
			aria-label={label}
			onClick={() => onChange(!checked)}
			className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712] ${
				checked
					? 'border-indigo-400/40 bg-indigo-500'
					: 'border-white/10 bg-slate-700'
			}`}
		>
			<span
				className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
					checked ? 'translate-x-5' : 'translate-x-1'
				}`}
			/>
		</button>
	)
}

export function SelectField({ value, onChange, children, label }) {
	return (
		<div className='relative'>
			<select
				aria-label={label}
				value={value}
				onChange={onChange}
				className='w-full min-w-36 appearance-none rounded-lg border border-white/10 bg-[#080d1b] py-2 pl-3 pr-9 text-xs text-slate-200 outline-none transition-colors focus:border-indigo-400/50 focus:ring-2 focus:ring-indigo-500/10'
			>
				{children}
			</select>

			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='14'
				height='14'
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth='1.8'
				strokeLinecap='round'
				strokeLinejoin='round'
				className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500'
				aria-hidden='true'
			>
				<path d='m6 9 6 6 6-6' />
			</svg>
		</div>
	)
}

export function ConfirmDialog({ type, onCancel, onConfirm, loading = false }) {
	const isAll = type === 'all'

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm'
			onMouseDown={(event) => {
				if (event.target === event.currentTarget && !loading) {
					onCancel()
				}
			}}
		>
			<div
				role='dialog'
				aria-modal='true'
				aria-labelledby='confirm-title'
				className='w-full max-w-md rounded-2xl border border-white/10 bg-[#0b1120] p-6 shadow-2xl shadow-black/40'
			>
				<div
					className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
						isAll
							? 'border-red-400/20 bg-red-500/10 text-red-300'
							: 'border-amber-400/20 bg-amber-500/10 text-amber-300'
					}`}
				>
					<SettingsIcon
						name={isAll ? 'shield' : 'logout'}
						size={20}
					/>
				</div>

				<h2
					id='confirm-title'
					className='mt-5 text-base font-semibold text-white'
				>
					{isAll ? 'Sign out all devices?' : 'Sign out?'}
				</h2>

				<p className='mt-2 text-sm leading-6 text-slate-400'>
					{isAll
						? 'You will be signed out on this device and all other active sessions associated with your account. You may need to sign in again on your other devices.'
						: 'You will be signed out of ResumeAI on this device. Other active sessions will remain signed in.'}
				</p>

				<div className='mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
					<button
						type='button'
						onClick={onCancel}
						disabled={loading}
						className='rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50'
					>
						Cancel
					</button>

					<button
						type='button'
						onClick={onConfirm}
						disabled={loading}
						className='rounded-lg border border-red-400/20 bg-red-500/10 px-4 py-2.5 text-sm font-medium text-red-300 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50'
					>
						{loading
							? 'Please wait...'
							: isAll
								? 'Sign out all devices'
								: 'Sign out'}
					</button>
				</div>
			</div>
		</div>
	)
}

export function SettingsNotice({ notice, onDismiss }) {
	if (!notice) return null

	return (
		<div
			role='status'
			className='mb-6 flex items-start justify-between gap-3 rounded-xl border border-amber-400/15 bg-amber-500/6 px-4 py-3 text-xs leading-5 text-amber-200'
		>
			<p>{notice}</p>
			{onDismiss && (
				<button
					type='button'
					onClick={onDismiss}
					aria-label='Dismiss notification'
					className='shrink-0 text-amber-200/70 hover:text-amber-100'
				>
					<SettingsIcon
						name='close'
						size={15}
					/>
				</button>
			)}
		</div>
	)
}

export function SettingsFooter() {
	return (
		<footer className='mt-8 border-t border-white/6 pt-5 text-center text-[11px] text-slate-600'>
			ResumeAI · Account and application settings
		</footer>
	)
}