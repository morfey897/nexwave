'use client';

import { Fragment } from 'react';
import { HiHome, HiChevronRight } from 'react-icons/hi';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import clsx from 'clsx';
import Container from '@/components/Containers';
import { usePathname } from 'next/navigation';

function Breadcrumbs() {
	const pathname = usePathname();
	const t = useTranslations();
	const names = pathname.split('/').filter((p) => Boolean(p));

	return names.length > 1 ? (
		<Container className='flex my-4 items-center overflow-x-auto whitespace-nowrap flex-wrap'>
			{names.slice(1).map((name, index, array) => {
				const path = `/` + names.slice(0, index + 2).join('/');
				return (
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
						<Link
							href={path}
							className={clsx(
								index === array.length - 1
									? 'text-blue-600 dark:text-blue-400 cursor-default pointer-events-none'
									: 'hover:underline text-gray-600 dark:text-gray-200',
							)}
						>
							{t(`general.${name}`)}
						</Link>
					</Fragment>
				);
			})}
		</Container>
	) : null;
}

export default Breadcrumbs;
