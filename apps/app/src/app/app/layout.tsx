import Header from '@/components/Header';
import Aside from '@/components/Aside';
import Block from '@/components/Block';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getSession } from '@/headers';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	const session = getSession();
	console.log('session', session);

	
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
