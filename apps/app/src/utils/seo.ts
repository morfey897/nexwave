import { Metadata, Viewport } from 'next';
import { getPathname } from '@/headers';

type PageType = {
	title?: string;
	description?: string;
	ogTitle?: string;
	ogDescription?: string;
};

export const getTitle = (pageTitle: string, rootTitle?: String) =>
	[(pageTitle || '').trim(), (rootTitle || '').trim()]
		.filter((a) => !!a)
		.join(' | ');

export const generateViewport = (): Viewport => {
	return {
		width: 'device-width',
		initialScale: 1,
		minimumScale: 1,
		userScalable: false,
		viewportFit: 'cover',

		themeColor: [
			{
				color: '#161616',
				media: '(prefers-color-scheme: dark)',
			},
			{
				color: '#ffffff',
				media: '(prefers-color-scheme: light)',
			},
		],
	};
};

export const getLayoutMetadata = (
	title?: string,
	description?: string,
): Metadata => {
	return {
		title: title,
		description: description,
		applicationName: process.env.NEXT_PUBLIC_TITLE,
		appleWebApp: {
			capable: true,
			title: process.env.NEXT_PUBLIC_TITLE,
			statusBarStyle: 'default',
		},
		formatDetection: {
			telephone: false,
		},

		metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || ''),

		icons: [
			{
				rel: 'apple-touch-icon',
				url: '/assets/apple-touch-icon.png',
				sizes: '180x180',
			},
			{
				rel: 'mask-icon',
				url: '/assets/safari-pinned-tab.svg',
				color: '#161616',
			},
			{ rel: 'icon', url: '/assets/favicon-32x32.png', sizes: '32x32' },
			{ rel: 'icon', url: '/assets/favicon-16x16.png', sizes: '16x16' },
		],
		manifest: '/manifest.json',
	};
};

export const getMetadata = (page: PageType): Metadata => {
	const pathname = getPathname();

	return {
		openGraph: {
			title: page?.ogTitle || '',
			description: page?.ogDescription || '',
		},
		alternates: {
			canonical: pathname,
		},
		...getLayoutMetadata(page?.title, page?.description || ''),
	};
};

// export const getJSON_LD = (props: SettingsType) => {

//   const pathname = getPathname();
//   return {
//     "@context": "https://schema.org/",
//     "@type": "DanceSchool",
//     "image": urlFor(findImage(props?.images, '!head')?.image).url(),
//     "url": `${process.env.NEXT_PUBLIC_DOMAIN}${pathname}`,
//     "name": props?.title,
//     "description": props?.description,
//     "address": {
//       "@type": "PostalAddress",
//       "streetAddress": [props?.address?.street, props?.address?.building].filter(a => !!a).join(' '),
//       "addressLocality": props?.address?.city,
//       "addressCountry": props?.address?.country,
//     },
//     "geo": {
//       "@type": "GeoCoordinates",
//       "latitude": props?.address?.geo?.lat,
//       "longitude": props?.address?.geo?.lng
//     },
//     "telephone": props?.phones[0]?.code + props?.phones[0]?.number,
//     "sameAs": [],
//     "openingHoursSpecification": [{
//       "@type": "OpeningHoursSpecification",
//       "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
//       "opens": "09:00",
//       "closes": "21:00"
//     }],
//     "paymentAccepted": ["Готівка", "Кредитна карта"]
//   };
// }
