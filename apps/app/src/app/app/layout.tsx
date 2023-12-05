import { getAuth } from '@/lib/firebase-admin';
import Header from '@/components/Header';
import Aside from '@/components/Aside';
import Block from '@/components/Block';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getSession, getUID } from '@/headers';
import Login from '@/views/auth/Login';
import UserProvider from '@/providers/UserProvider';
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
		<UserProvider>
			<Header />
			<main className='flex w-full'>
				{!isValid && <Login uid={uid} />}
				<Aside />
				<Block>
					{isValid ? (
						<>
							<Breadcrumbs />
							{children}
						</>
					) : (
						<Loading amount={4} />
					)}
				</Block>
			</main>
		</UserProvider>
	);
}
