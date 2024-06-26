import ArrowUp from '~root/icons/ArrowUp';
import EllipsisIcon from '~root/icons/ElipsisIcon';
import PiggyIcon from '~root/icons/PiggyIcon';

const InfoBlock = () => {
	return (
		<div className='mr-5 shrink-0 snap-start'>
			<div className='h-36 w-64 rounded-lg bg-white p-5 shadow-md'>
				<div className='flex items-start justify-between'>
					<div className=''>
						<p className='font-inter text-primary-text text-base font-normal leading-6'>
							Total Income{/* In the future, data will come from a request */}
						</p>
						<p className='font-inter text-3xl font-semibold leading-10'>
							2000$ {/* In the future, data will come from a request */}
						</p>
					</div>
					<div className='bg-gray-2 flex h-12 w-12 items-center justify-center rounded-full'>
						<PiggyIcon />
					</div>
				</div>
				<div className='mt-3 flex items-center gap-2'>
					<div className='bg-green-light-6 text-green-dark flex h-7 w-16 items-center justify-center gap-2 rounded-full'>
						<ArrowUp /> {/* In the future, data will come from a request */}
						<p className='font-inter text-xs font-normal leading-5'>36%</p>
					</div>
					<p className='text-primary-text font-inter text-xs font-normal leading-5'>
						vs previous week
						{/* In the future, data will come from a request */}
					</p>
					<span className='ml-6 cursor-pointer'>
						<EllipsisIcon />
						{/* In the future, data will come from a request */}
					</span>
				</div>
			</div>
		</div>
	);
};

export default InfoBlock;
