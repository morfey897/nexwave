import NotFound from '@/views/NotFound';

export default async function Page() {
	return (
		<main>
			<section className='bg-white dark:bg-gray-900 '>
				<div className='container flex items-center justify-center min-h-screen px-6 py-12 mx-auto'>
					<NotFound />
				</div>
			</section>
		</main>
	);
}
