import clsx from 'clsx';

const Block = ({ className }: { className: string }) => (
	<div className={clsx('w-full', className)}>
		<div className='h-48 w-full rounded-lg bg-gray-300 md:h-72 dark:bg-gray-600'></div>

		<h1 className='mt-4 h-2 w-56 rounded-lg bg-gray-200 dark:bg-gray-700'></h1>
		<p className='mt-4 h-2 w-24 rounded-lg bg-gray-200 dark:bg-gray-700'></p>
	</div>
);

export default function Loading() {
	return (
		<div className='mx-auto text-center'>
			<section className='bg-white dark:bg-gray-900'>
				<div className='container mx-auto animate-pulse px-6 py-10'>
					<h1 className='mx-auto h-2 w-48 rounded-lg bg-gray-200 dark:bg-gray-700'></h1>

					<p className='mx-auto mt-4 h-2 w-64 rounded-lg bg-gray-200 dark:bg-gray-700'></p>
					<p className='mx-auto mt-4 h-2 w-64 rounded-lg bg-gray-200 sm:w-80 dark:bg-gray-700'></p>

					<div className='mt-8 flex flex-wrap gap-8 xl:mt-12 xl:gap-12'>
						<Block className='w-full' />
						<Block className='w-full' />
						<Block className='hidden w-full lg:block' />
					</div>
				</div>
			</section>
		</div>
	);
}
