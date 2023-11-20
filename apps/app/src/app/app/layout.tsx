import Header from '@/views/Header';
import Aside from '@/views/Aside';
import Breadcrumbs from '@/views/Breadcrumbs';

export default async function RootLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return (
		<>
			<Header />
			<main className='flex w-full'>
				<Aside />
				<div className='w-full pl-10 sm:pl-14 md:pl-32 lg:pl-64'>
					<div className='py-2 md:py-4 px-4 md:px-6 mx-auto'>
						<Breadcrumbs />
						{children}
					</div>
				</div>
				{modal}
			</main>
		</>
	);
}
