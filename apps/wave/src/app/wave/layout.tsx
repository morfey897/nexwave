import {
	getRefreshToken,
	getSession,
	getTrail,
	getTheme,
} from '~/utils/headers';
import { getUserFromSession } from '~/models/user';
import Loading from './loading';
import AuthView from '~/components/auth';
import RefreshToken from '~/components/user/RefreshToken';
import UpdateStore from '~/components/user/UpdateStore';
import Sidebar from '../../components/sidebar';
import { EnumTheme } from '~/constants/enums';

export default async function ProjectLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const theme = getTheme();
	const user = await getUserFromSession(getSession());
	const refreshToken = getRefreshToken();
	const hasTrail = !!getTrail();
	const hasUser = !!user;

	return (
		<div className='flex min-h-screen'>
			<Sidebar />
			<div className='w-1/2 flex-grow pl-8 pr-2 lg:px-16 '>
				{hasUser ? children : <Loading />}
			</div>
			{hasUser ? (
				<>
					<UpdateStore state={{ user, theme: (theme as EnumTheme) || null }} />
					<RefreshToken refreshToken={refreshToken} />
				</>
			) : (
				<AuthView mode={hasTrail ? 'signIn' : 'signUp'} />
			)}
		</div>
	);
}
