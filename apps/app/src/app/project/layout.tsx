import { getRefreshToken } from '@/headers';
import { getUserFromSession } from '@/models/user';
import Loading from '@/app/loading';
import AuthView, { RefreshToken } from '@/views/auth';
import { getTrail } from '@/headers';
import { UpdateStore } from '@/providers/StoreProvider';

export default async function ProjectLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const hasTrail = !!getTrail();
	const user = await getUserFromSession();
	const refreshToken = getRefreshToken();

	return (
		<div className='w-full'>
			{!!user ? (
				<>
					{children}
					<UpdateStore state={{ user }} />
					{!!refreshToken && <RefreshToken />}
				</>
			) : (
				<>
					<Loading />
					<AuthView mode={hasTrail ? 'signIn' : 'signUp'} />
				</>
			)}
		</div>
	);
}
