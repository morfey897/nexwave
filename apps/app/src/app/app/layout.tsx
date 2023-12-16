import Header from '@/components/Header';
import Aside from '@/components/Aside';
import Block from '@/components/Block';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getSession, getTrail, getRefreshToken } from '@/headers';
import Login from '@/views/auth/Login';
import Loading from './Loading';
import { verify } from '@/lib/jwt';
import { ICurrentUser } from '@/types/user';
import StoreProvider from '@/providers/StoreProvider';
import RefreshToken from './RefreshToken';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const hasTrail = !!getTrail();
	const refreshToken = getRefreshToken();
	let user: ICurrentUser | null = null;

	try {
		const session = getSession();
		if (!session) throw new Error('Invalid session');

		const payload = await verify<{ user: ICurrentUser }>(session);
		user = payload?.user || null;
		const isValidUser = !!user && !!user.uuid && !!user.email;
		if (!isValidUser) throw new Error('Invalid user');
	} catch (error) {
		user = null;
	}

	return (
		<StoreProvider store={{ user }}>
			<Header />
			<main className='flex w-full'>
				{!user && <Login params={hasTrail ? null : { mode: 'new' }} />}
				<Aside />
				<Block>
					{!!user ? (
						<>
							<Breadcrumbs />
							{children}
						</>
					) : (
						<Loading amount={4} />
					)}
				</Block>
			</main>
			{!!refreshToken && <RefreshToken />}
		</StoreProvider>
	);
}
