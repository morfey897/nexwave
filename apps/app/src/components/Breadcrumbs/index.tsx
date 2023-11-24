'use client';
import { usePathname } from 'next/navigation';
import { useMemo, Fragment } from 'react';
import { HiHome, HiChevronRight } from 'react-icons/hi';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import clsx from 'clsx';
import Container from '../Containers';

export default function Breadcrumbs() {
	const pathname = usePathname();
	const t = useTranslations('common.breadcrumbs');

	const parts = useMemo(() => {
		return pathname
			.split('/')
			.filter((p) => Boolean(p))
			.reduce(
				(
					inc: Array<{
						active: boolean;
						path: string;
						token: string;
					}>,
					path,
					index,
					array,
				) => {
					inc.push({
						active: index === array.length - 1,
						path: `/` + array.slice(0, index + 1).join('/'),
						token: path,
					});
					return inc;
				},
				[],
			);
	}, [pathname]);

	return parts.length <= 1 ? null : (
		//  flex  my-4 mx-auto
		<Container className='flex my-4 items-center overflow-x-auto whitespace-nowrap flex-wrap'>
			{parts.map(({ path, token, active }, index) => (
				<Fragment key={path}>
					{index === 0 ? (
						<span className='mr-2 text-gray-600 dark:text-gray-200 rtl:-scale-x-100'>
							<HiHome size={20} />
						</span>
					) : (
						<span className='mx-2 text-gray-500 dark:text-gray-300 rtl:-scale-x-100'>
							<HiChevronRight size={24} />
						</span>
					)}
					{active ? (
						<span className='text-blue-600 dark:text-blue-400 cursor-pointer'>
							{t(token)}
						</span>
					) : (
						<Link
							href={path}
							className={clsx(
								'hover:underline text-gray-600 dark:text-gray-200',
							)}
						>
							{t(token)}
						</Link>
					)}
				</Fragment>
			))}
		</Container>
	);
}
