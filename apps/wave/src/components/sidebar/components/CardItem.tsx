import Image from 'next/image';

const CardItem = () => {
	return (
		<div className='mt-auto py-2 pl-2'>
			<div className='my-3 border-b-2' />
			<div className='flex items-center'>
				<Image
					src={'/assets/test-avatar.png'}
					alt='User profile'
					width={40}
					height={40}
					className='rounded-lg'
				/>
				<div className='ml-3'>
					<div className='text-sm font-medium md:hidden lg:block'>
						Mariya Desoja
						{/* In the future, data will come from a request */}
					</div>
					<div className='text-xs text-gray-500 md:hidden lg:block'>
						Manager {/* In the future, data will come from a request */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardItem;
