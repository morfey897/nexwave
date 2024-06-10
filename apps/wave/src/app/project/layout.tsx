import { getRefreshToken, getSession, getTrail } from '~utils/headers';
import { getUserFromSession } from '~models/user';
import Loading from '../../app/loading';
import AuthView from '~components/auth';
import RefreshToken from '~components/user/RefreshToken.client';
import UpdateStore from '~components/user/UpdateStore.client';

export default async function ProjectLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getUserFromSession(getSession());
	const refreshToken = getRefreshToken();
	const hasTrail = !!getTrail();

	return (
		<div className='w-full'>
			{!!user ? (
				<>
					{children}
					<UpdateStore state={{ user }} />
				</>
			) : (
				<>
					<Loading />
					<AuthView mode={hasTrail ? 'signIn' : 'signUp'}/>
				</>
			)}
			{!!refreshToken && <RefreshToken />}
		</div>
	);
}
