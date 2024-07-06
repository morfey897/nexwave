const Skeleton = () => (
	<div className='animate-pulse shadow'>
		<div className='container mx-auto flex items-center justify-between py-6'>
			<div className='bg-secondary h-8 w-1/4 rounded' />
			<div className='flex space-x-4'>
				<div className='bg-secondary h-6 w-16 rounded' />
				<div className='bg-secondary h-6 w-16 rounded' />
				<div className='bg-secondary h-6 w-16 rounded' />
			</div>
		</div>
	</div>
);

export default Skeleton;
