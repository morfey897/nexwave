import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTheme } from '@/headers';
import clsx from 'clsx';
import ThemeProvider from '@/providers/ThemeProvider';
import { generateViewport, getMetadata } from '@/utils/seo';
import Header from '@/components/Header';
import { getSession, getTrail, getRefreshToken } from '@/headers';
import AuthView from '@/views/auth';
import Loading from './loading';
import { verifyAuth } from '@/lib/jwt';
import { ICurrentUser } from '@/models/user';
import StoreProvider from '@/providers/StoreProvider';
import RefreshToken from '@/components/Auth/RefreshToken';
import { getProjectByUserId, type TProjectToUser } from '@/models/project';
import { getPathname } from '@/headers';
import ModalsContainer from '@/views/Modal';

const inter = Inter({ subsets: ['latin'] });

export const viewport = generateViewport();

export async function generateMetadata(): Promise<Metadata> {
	return getMetadata({
		title: process.env.NEXT_PUBLIC_TITLE,
		ogTitle: process.env.NEXT_PUBLIC_TITLE,
	});
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const locale = getLocale();
	const theme = getTheme();
	const pathname = getPathname();
	const hasTrail = !!getTrail();
	const refreshToken = getRefreshToken();
	let user: ICurrentUser | null = null;
	let projects: TProjectToUser[] | null = null;

	try {
		const [, slug] = pathname.match(/\/([^\/]+)/) || [];
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

	let messages;
	try {
		messages = (await import(`../i18n/${locale}.json`)).default;
	} catch (error) {
		messages = {};
	}
	return (
		<html lang={locale} className={theme || ''}>
			<ThemeProvider />
			<body
				className={clsx(
					inter.className,
					'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200',
				)}
			>
				<NextIntlClientProvider messages={messages} locale={locale}>
					<StoreProvider store={{ user, projects }}>
						<ModalsContainer>
							<Header />
							<main className='flex w-full'>
								{!!user ? (
									children
								) : (
									<>
										<Loading />
										<AuthView mode={hasTrail ? 'signIn' : 'signUp'} />
									</>
								)}
							</main>
							{!!refreshToken && <RefreshToken />}
						</ModalsContainer>
					</StoreProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
