import React from 'react';

export default function Loading() {
	return (
		<>
			<header className='animate-pulse shadow'>
				<div className='container mx-auto flex items-center justify-between py-6'>
					<div className='bg-secondary h-8 w-1/4 rounded' />
					<div className='flex space-x-4'>
						<div className='bg-secondary h-6 w-16 rounded' />
						<div className='bg-secondary h-6 w-16 rounded' />
						<div className='bg-secondary h-6 w-16 rounded' />
					</div>
				</div>
			</header>
			<main>
				<div className='animate-pulse'>
					{/* <!-- Small Widgets --> */}
					<section className='mb-8 flex gap-6'>
						<div className='bg-secondary h-36 w-64 rounded-lg shadow' />
						<div className='bg-secondary h-36 w-64 rounded-lg shadow' />
						<div className='bg-secondary h-36 w-64 rounded-lg shadow' />
						<div className='bg-secondary h-36 w-64 rounded-lg shadow' />
					</section>
					{/* <!-- Big Widgets --> */}
					<section className='space-y-6'>
						<div className='bg-secondary h-72 rounded-lg shadow' />
						<div className='bg-secondary h-72 rounded-lg shadow' />
					</section>
				</div>
			</main>
		</>
	);
}
