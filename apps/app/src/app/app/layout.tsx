import Header from '@/components/Header';
import Aside from '@/components/Aside';
import Block from '@/components/Block';
import Breadcrumbs from '@/components/Breadcrumbs';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Header />
			<main className='flex w-full'>
				<Aside />
				<Block>
					<Breadcrumbs />
					{children}
				</Block>
			</main>
		</>
	);
}
