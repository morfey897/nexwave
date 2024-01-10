'use client';
import { usePathname } from 'next/navigation';
import { useMemo, Fragment } from 'react';
import { HiHome, HiChevronRight } from 'react-icons/hi';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import clsx from 'clsx';
import Container from '../Containers';
import { useNWStore } from '@/hooks/store';
import { TProjectToUser } from '@/models/project';

function Breadcrumbs() {
	const pathname = usePathname();
	const t = useTranslations();
	const projects = useNWStore((state) => state.projects);

	const parts = useMemo(() => {
		return pathname
			.split('/')
			.filter((p) => Boolean(p))
			.reduce(
				(
					inc: Array<{
						active: boolean;
						path: string;
						token?: string;
						name?: string;
					}>,
					path,
					index,
					array,
				) => {
					if (index === 0) return inc;
					let project: TProjectToUser | undefined;
					if (index === 1 && projects?.length) {
						project = projects.find((p) => p.uuid === path);
					}

					inc.push({
						active: index === array.length - 1,
						path: `/` + array.slice(0, index + 1).join('/'),
						token: path,
						name: project?.name,
					});
					return inc;
				},
				[],
			);
	}, [pathname, projects]);

	return parts.length <= 0 ? null : (
		//  flex  my-4 mx-auto
		<Container className='flex my-4 items-center overflow-x-auto whitespace-nowrap flex-wrap'>
			{parts.map(({ path, token, name, active }, index) => (
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
						<span className='text-blue-600 dark:text-blue-400 cursor-default'>
							{name || t(`general.${token}`)}
						</span>
					) : (
						<Link
							href={path}
							className={clsx(
								'hover:underline text-gray-600 dark:text-gray-200',
							)}
						>
							{name || t(`general.${token}`)}
						</Link>
					)}
				</Fragment>
			))}
		</Container>
	);
}

export default Breadcrumbs;
