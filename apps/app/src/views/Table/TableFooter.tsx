'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import {
	HiOutlineArrowLongLeft,
	HiOutlineArrowLongRight,
} from 'react-icons/hi2';
import { PAGE } from '@/constants/searchparams';
import { Button } from '@/components/Buttons';

type TTableFooterProps = {
	pages: number;
};

type TPages = Array<{
	page?: number;
	title: string;
	active?: boolean;
}>;

export default function TableFooter({
	pages,
	className,
	...props
}: TTableFooterProps & React.HTMLAttributes<HTMLDivElement>) {
	const params = useSearchParams();
	const router = useRouter();
	const t = useTranslations('common');

	const activePage = useMemo(() => {
		const page = parseInt(params.get(PAGE) || '');
		return Number.isNaN(page) || page < 1 || page > pages ? 1 : page;
	}, [params, pages]);

	const listPages = useMemo(() => {
		const pagesList: TPages = [
			...new Set([1, ...[activePage - 1, activePage, activePage + 1], pages]),
		]
			.filter((value) => value >= 1 && value <= pages)
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
					active: i === activePage,
				});
				return acc;
			}, []);

		return pagesList;
	}, [pages, activePage]);

	const onPage = useCallback(
		(page: number) => {
			const clone = new URLSearchParams(params);
			if (page === 1) {
				clone.delete(PAGE);
			} else {
				clone.set(PAGE, String(page));
			}
			const str = clone.toString();
			router.push(`?${str}`);
		},
		[params, router],
	);

	return (
		<div
			className={clsx('flex items-center justify-between mt-6', className)}
			{...props}
		>
			<Button
				message={t('prev')}
				icon={<HiOutlineArrowLongLeft size={24} />}
				onClick={activePage <= 1 ? undefined : () => onPage(activePage - 1)}
				disabled={activePage === 1}
				className='[&>span]:hidden [&>span]:md:block'
			/>

			<div className='items-center hidden md:flex gap-x-3'>
				{listPages?.map(({ title, active, page }, index) => (
					<button
						className={clsx(
							'px-2 py-1 text-sm rounded-md',
							active
								? 'text-blue-500  dark:bg-gray-800 bg-blue-100/60'
								: 'text-gray-500 dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100',
						)}
						key={page ? `Page_${page}` : `index_${index}`}
						onClick={typeof page === 'number' ? () => onPage(page) : undefined}
						disabled={typeof page != 'number'}
					>
						{title}
					</button>
				))}
			</div>
			<div className='items-center flex md:hidden gap-x-3'>
				{t('page_of', { activePage, pages })}
			</div>

			<Button
				message={t('next')}
				iconAfter={<HiOutlineArrowLongRight size={24} />}
				onClick={activePage >= pages ? undefined : () => onPage(activePage + 1)}
				disabled={activePage >= pages}
				className='[&>span]:hidden [&>span]:md:block'
			/>
		</div>
	);
}
