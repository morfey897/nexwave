import React from 'react';

function Skeleton() {
	return (
		<aside
			className='h-screen w-64 bg-gray-800 text-white'
			aria-label='Sidebar'
		>
			<div className='flex h-full animate-pulse flex-col p-4'>
				{/* <!-- Logo Section --> */}
				<div className='mb-6 flex items-center'>
					<div className='flex items-center'>
						<div className='h-10 w-10 rounded bg-gray-700' />
						<div className='ml-3 h-6 w-24 rounded bg-gray-700' />
					</div>
					<div className='ml-auto block h-6 w-6 rounded bg-gray-700 md:hidden' />
				</div>

				{/* <!-- Navigation Links --> */}
				<nav className='flex-1 overflow-y-auto'>
					<ul className='space-y-4'>
						<li>
							<div className='flex items-center p-2'>
								<div className='h-6 w-6 rounded bg-gray-700' />
								<div className='ml-3 h-6 w-32 rounded bg-gray-700' />
							</div>
						</li>
						<li>
							<div className='flex items-center p-2'>
								<div className='h-6 w-6 rounded bg-gray-700' />
								<div className='ml-3 h-6 w-32 rounded bg-gray-700' />
							</div>
						</li>
						<li>
							<div className='flex items-center p-2'>
								<div className='h-6 w-6 rounded bg-gray-700' />
								<div className='ml-3 h-6 w-32 rounded bg-gray-700' />
							</div>
						</li>
						<li>
							<div className='flex items-center p-2'>
								<div className='h-6 w-6 rounded bg-gray-700' />
								<div className='ml-3 h-6 w-32 rounded bg-gray-700' />
							</div>
						</li>
						<li>
							<div className='flex items-center p-2'>
								<div className='h-6 w-6 rounded bg-gray-700' />
								<div className='ml-3 h-6 w-32 rounded bg-gray-700' />
							</div>
						</li>
						<li>
							<div className='flex items-center p-2'>
								<div className='h-6 w-6 rounded bg-gray-700' />
								<div className='ml-3 h-6 w-32 rounded bg-gray-700' />
							</div>
						</li>
						<li>
							<div className='flex items-center p-2'>
								<div className='h-6 w-6 rounded bg-gray-700' />
								<div className='ml-3 h-6 w-32 rounded bg-gray-700' />
							</div>
						</li>
					</ul>
				</nav>

				{/* <!-- User Profile Section --> */}
				<div className='mt-auto'>
					<div className='flex items-center p-2'>
						<div className='h-10 w-10 rounded-full bg-gray-700' />
						<div className='ml-3'>
							<div className='mb-2 h-4 w-20 rounded bg-gray-700' />
							<div className='h-4 w-16 rounded bg-gray-700' />
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
}

export default Skeleton;
