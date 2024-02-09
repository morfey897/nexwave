import { getRefreshToken } from '@/headers';
import { getUserFromSession } from '@/models/user';
import Loading from '@/app/loading';
import AuthView from '@/views/Authentication';
import RefreshToken from '@/views/Authentication/RefreshToken.client';
import { UpdateStore } from '@/providers/StoreProvider';

export default async function ProjectLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getUserFromSession();
	const refreshToken = getRefreshToken();

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
					<AuthView />
				</>
			)}
			{!!refreshToken && <RefreshToken />}
		</div>
	);
}
