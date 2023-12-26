import Header from '@/components/Header';
import Aside from '@/components/Aside';
import Block from '@/components/Block';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getSession, getTrail, getRefreshToken } from '@/headers';
import Login from '@/views/auth/Login';
import Loading from '../Loading';
import { decode } from '@/lib/jwt';
import { ICurrentUser } from '@/models/user';
import { getProjectBySlug } from '@/models/project';
import StoreProvider from '@/providers/StoreProvider';
import RefreshToken from '@/components/Auth/RefreshToken';

export default async function ProjectLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { slug: string };
}) {
	return (
		<>
			<Aside params={params} />
			<Block>
				<Breadcrumbs />
				{children}
			</Block>
		</>
	);
}
