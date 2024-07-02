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
		<Container className='my-4 flex flex-wrap items-center overflow-x-auto whitespace-nowrap'>
			{names.slice(1).map((name, index, array) => {
				const path = `/` + names.slice(0, index + 2).join('/');
				return (
					<Fragment key={path}>
						{index === 0 ? (
							<span className='mr-2 text-gray-600 rtl:-scale-x-100 dark:text-gray-200'>
								<HiHome size={20} />
							</span>
						) : (
							<span className='mx-2 text-gray-500 rtl:-scale-x-100 dark:text-gray-300'>
								<HiChevronRight size={24} />
							</span>
						)}
						<Link
							href={path}
							className={clsx(
								index === array.length - 1
									? 'pointer-events-none cursor-default text-blue-600 dark:text-blue-400'
									: 'text-gray-600 hover:underline dark:text-gray-200'
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
