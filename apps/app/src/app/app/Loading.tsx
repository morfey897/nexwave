const Block = () => (
	<div className='w-full mx-auto animate-pulse'>
		<h1 className='h-2 bg-gray-300 rounded-lg w-52 dark:bg-gray-600'></h1>

		<p className='w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
		<p className='w-full h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
		<p className='w-64 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
		<p className='w-4/5 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700'></p>
	</div>
);

export default function Loading(props: { amount?: number }) {
	return (
		<div className='space-y-8  p-9'>
			{[...Array(props?.amount || 1)].map((_, i) => (
				<Block key={i} />
			))}
		</div>
	);
}
