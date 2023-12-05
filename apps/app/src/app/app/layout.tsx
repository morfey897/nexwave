import { getAuth } from '@/lib/firebase-admin';
import Header from '@/components/Header';
import Aside from '@/components/Aside';
import Block from '@/components/Block';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getSession, getUID } from '@/headers';
import Create from '@/views/auth/Create';
import Login from '@/views/auth/Login';
import { is } from 'date-fns/locale';
import Overlay from '@/components/Overlay';
import Loading from './Loading';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	let isValid = true;
	const uid = getUID();

	try {
		const auth = getAuth();
		const session = getSession();
		if (!session) {
			throw new Error('Invalid session');
		}
		//Use Firebase Admin to validate the session cookie
		const decodedClaims = await auth.verifySessionCookie(session, true);
		if (!decodedClaims) {
			throw new Error('Invalid session');
		}
	} catch (error) {
		isValid = false;
	}

	return (
		<>
			<Header />
			<main className='flex w-full'>
				{!isValid && (
					<Overlay blur='sm' className='bg-gray-100/20 dark:bg-black/60 z-50'>
						<div className='mt-[100px]'>{!!uid ? <Login /> : <Create />}</div>
					</Overlay>
				)}
				<Aside />
				<Block>
					{isValid ? (
						<>
							<Breadcrumbs />
							{children}
						</>
					) : (
						<Loading amount={4}/>
					)}
				</Block>
			</main>
		</>
	);
}
