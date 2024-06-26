'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import {
	HiOutlineArrowLongLeft,
	HiOutlineArrowLongRight,
} from 'react-icons/hi2';
import { Button } from '@/components/Button';

type TTableFooterProps = {
	onPage?: (page: number) => void;
	page: number;
	maxPage: number;
};

type TPages = Array<{
	page?: number;
	title: string;
	active?: boolean;
}>;

export default function Pagination({
	page,
	maxPage,
	onPage,
	className,
	...props
}: TTableFooterProps & React.HTMLAttributes<HTMLDivElement>) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const t = (a: string, ...props: unknown[]) => a + JSON.stringify(props);
	// useTranslations();

	const listPages = useMemo(() => {
		const pagesList: TPages = [
			...new Set([1, ...[page - 1, page, page + 1], maxPage]),
		]
			.filter((value) => value >= 1 && value <= maxPage)
			.sort((a, b) => a - b)
			.reduce((acc: TPages, i) => {
				let previous = acc[acc.length - 1] || { page: undefined };
				if (typeof previous.page === 'number' && i - previous.page > 1) {
					acc.push({
						title: '...',
					});
				}
				acc.push({
					page: i,
					title: String(i),
					active: i === page,
				});
				return acc;
			}, []);

		return pagesList;
	}, [maxPage, page]);

	return (
		<div
			className={clsx('mt-6 flex items-center justify-between', className)}
			{...props}
		>
			<Button
				message={t('button.prev')}
				icon={<HiOutlineArrowLongLeft size={24} />}
				onClick={() => typeof onPage === 'function' && onPage(page - 1)}
				disabled={page === 1}
				className='[&>span]:hidden [&>span]:md:block'
			/>

			<div className='hidden items-center gap-x-3 md:flex'>
				{listPages?.map(({ title, active, page }, index) => (
					<button
						className={clsx(
							'rounded-md px-2 py-1 text-sm',
							active
								? 'bg-blue-100/60  text-blue-500 dark:bg-gray-800'
								: 'text-gray-5 dark:hover:bg-gray-1 hover:bg-gray-1'
						)}
						key={page ? `Page_${page}` : `index_${index}`}
						onClick={() =>
							typeof page === 'number' &&
							typeof onPage === 'function' &&
							onPage(page)
						}
						disabled={typeof page != 'number'}
					>
						{title}
					</button>
				))}
			</div>
			<div className='flex items-center gap-x-3 md:hidden'>
				{t('general.page_of_', { page, maxPage })}
			</div>

			<Button
				message={t('button.next')}
				iconAfter={<HiOutlineArrowLongRight size={24} />}
				onClick={() => typeof onPage === 'function' && onPage(page + 1)}
				disabled={page >= maxPage}
				className='[&>span]:hidden [&>span]:md:block'
			/>
		</div>
	);
}
