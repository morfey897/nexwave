import Header from '@/components/Header';
import { getSession, getTrail, getRefreshToken } from '@/headers';
import Login from '@/views/auth/Login';
import Loading from './Loading';
import { verifyAuth } from '@/lib/jwt';
import { ICurrentUser } from '@/models/user';
import StoreProvider from '@/providers/StoreProvider';
import RefreshToken from '@/components/Auth/RefreshToken';
import { getProjectByUserId, type TProjectToUser } from '@/models/project';
import { getPathname } from '@/headers';
import ModalsContainer from '@/views/Modal';

export default async function AppLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = getPathname();
	const hasTrail = !!getTrail();
	const refreshToken = getRefreshToken();
	let user: ICurrentUser | null = null;
	let projects: TProjectToUser[] | null = null;

	try {
		const [, slug] = pathname.match(/\/app\/([^\/]+)/) || [];
		const session = getSession();
		if (!session) throw new Error('Invalid session');

		const payload = await verifyAuth<{ user: ICurrentUser }>(session);
		user = payload?.user || null;
		const isValidUser = !!user && !!user.id && !!user.uuid && !!user.email;
		if (!isValidUser || user === null) throw new Error('Invalid user');

		projects = await getProjectByUserId({ userId: user.id });
		if (slug) {
			if (!projects?.find((p) => p.slug === slug)) {
				// TODO should show dialog
				throw new Error('Invalid project');
			}
		}
	} catch (error) {
		user = null;
	}

	return (
		<StoreProvider store={{ user, projects }}>
			<Header />
			<main className='flex w-full'>
				{!!user ? (
					<>
						{children}
						<ModalsContainer />
					</>
				) : (
					<>
						<Loading amount={4} />
						<Login params={hasTrail ? null : { mode: 'new' }} />
					</>
				)}
			</main>
			{!!refreshToken && <RefreshToken />}
		</StoreProvider>
	);
}
