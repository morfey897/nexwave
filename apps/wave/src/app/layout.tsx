import { NextIntlClientProvider } from 'next-intl';
// import { Theme } from '@radix-ui/themes';
import { ThemeProvider } from 'next-themes';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getI18n } from '~utils/headers';
import { generateViewport, getMetadata } from '~utils/seo';
import '~styles/globals.css';
import clsx from 'clsx';

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
	const messages = await getMessages({ locale });
	return (
		<html lang={locale}>
			<head />
			<ThemeProvider attribute='class'>
				<body className={clsx(inter.className, 'bg-secondary')}>
					<NextIntlClientProvider messages={messages}>
						{children}
					</NextIntlClientProvider>
				</body>
			</ThemeProvider>
		</html>
	);
}
