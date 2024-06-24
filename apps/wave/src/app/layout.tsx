import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getI18n, getTheme } from '~utils/headers';
import { generateViewport, getMetadata } from '~utils/seo';
import '~styles/globals.css';
import clsx from 'clsx';
import Theme from '~root/components/user/Theme';

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
			<Theme />
			<body
				className={clsx(inter.className, 'bg-primary', 'text-secondary-text')}
			>
				<NextIntlClientProvider messages={messages}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
