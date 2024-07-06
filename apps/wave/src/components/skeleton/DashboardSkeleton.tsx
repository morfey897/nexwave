const Skeleton = () => (
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
);

export default Skeleton;
