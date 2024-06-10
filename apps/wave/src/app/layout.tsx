import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getI18n, getTheme } from '~utils/headers';
import clsx from 'clsx';
import { generateViewport, getMetadata } from '~utils/seo';
import ThemeChecker from '~components/application/ThemeChecker';
import './globals.css';

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
}: Readonly<{
	children: React.ReactNode;
}>) {
	const locale = getI18n();
	const theme = getTheme();
	const messages = await getMessages({ locale });
	return (
		<html lang={locale} className={theme || ''}>
			<ThemeChecker />
			<NextIntlClientProvider messages={messages}>
			<body
				className={clsx(
					inter.className,
					// TODO setup dark mode
					'bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-200'
				)}
			>
				{/* <Header /> */}
				<main className='flex w-full'>{children}</main>
				{/* <ModalsContainer /> */}
			</body>
			</NextIntlClientProvider>
		</html>
	);
}
