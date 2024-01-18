import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTheme } from '@/headers';
import clsx from 'clsx';
import ThemeProvider from '@/providers/ThemeProvider';
import { generateViewport, getMetadata } from '@/utils/seo';
import Header from '@/components/Header';
import StoreProvider from '@/providers/StoreProvider';
import ModalsContainer from '@/windows';

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

	let messages;
	try {
		messages = (await import(`../i18n/en.json`)).default;
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
					<StoreProvider store={{}}>
						<ModalsContainer>
							<Header />
							<main className='flex w-full'>{children}</main>
						</ModalsContainer>
					</StoreProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
