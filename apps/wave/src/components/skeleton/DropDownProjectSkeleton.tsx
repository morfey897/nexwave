const Skeleton = () => (
	<div>
		<div className='flex w-64 animate-pulse items-center space-x-4 rounded-lg p-4 shadow'>
			<div className='bg-primary h-[42px] w-[42px] rounded-lg' />
			<div className='flex-1'>
				<div className='bg-primary mb-2 h-4 w-3/4 rounded ' />
				<div className='bg-primary h-4 w-1/2 rounded ' />
			</div>
		</div>
	</div>
);

export default Skeleton;
