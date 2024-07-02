import { getRefreshToken, getSession, getTrail } from '~utils/headers';
import { getUserFromSession } from '~models/user';
import Loading from '~root/app/loading';
import AuthView from '~components/auth';
import RefreshToken from '~components/user/RefreshToken';
import UpdateStore from '~components/user/UpdateStore';
import Sidebar from '../../components/sidebar';
import Header from '~root/components/header';
// import { useMemo } from 'react';
// import Loading from '../../app/loading';
// import AuthView from '~components/auth';
// import RefreshToken from '~components/user/RefreshToken.client';
// import UpdateStore from '~components/user/UpdateStore.client';

export default async function ProjectLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getUserFromSession(getSession());
	const refreshToken = getRefreshToken();
	const hasTrail = !!getTrail();
	const hasUser = !!user;

	return (
		<div className='flex min-h-screen'>
			<Sidebar />
			<div className='w-1/2 flex-grow pl-8 pr-2 lg:px-16 '>
				<Header />
				<main>
					{/* For testing */}
					{process.env.SKIP_AUTHENTICATION === 'true' && children}

					{/* For production */}
					{process.env.SKIP_AUTHENTICATION !== 'true' && hasUser && (
						<>
							{children}
							<UpdateStore state={{ user }} />
							<RefreshToken refreshToken={refreshToken} />
						</>
					)}

					{/* For production */}
					{process.env.SKIP_AUTHENTICATION !== 'true' && !hasUser && (
						<>
							<Loading />
							<AuthView mode={hasTrail ? 'signIn' : 'signUp'} />
						</>
					)}
				</main>
			</div>
		</div>
	);
}
