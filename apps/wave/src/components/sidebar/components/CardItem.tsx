import Image from 'next/image';

const CardItem = () => {
	return (
		<div className='flex items-center px-2 pt-2'>
			<Image
				src={'/assets/test-avatar.png'}
				alt='User profile'
				width={40}
				height={40}
				className='rounded-lg'
			/>
			<div className='ml-3 md:hidden lg:block'>
				<div className='text-sm font-medium'>
					Mariya Desoja
					{/* In the future, data will come from a request */}
				</div>
				<div className='text-primary-text text-xs'>
					Manager {/* In the future, data will come from a request */}
				</div>
			</div>
		</div>
	);
};

export default CardItem;
