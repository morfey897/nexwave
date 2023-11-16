'use client';

import { HiOutlineDotsVertical } from 'react-icons/hi';
import { TUID, TGenerator, TLevel } from '@/types/table';

import { useLocale, useTranslations } from 'next-intl';
import { format, differenceInDays } from 'date-fns';
import { enUS, ru, uk } from 'date-fns/locale';
import { DEFAULT_LOCALE } from 'config';
import clsx from 'clsx';

const LOCALES: Record<string, Locale> = {
	uk: uk,
	ru: ru,
	en: enUS,
};

export function TimeGenerator({
	item,
}: {
	item: { _uid: string; value: string };
}) {
	const t = useTranslations('common');
	const NOW = new Date(new Date().toISOString().split('T')[0]);
	const locale = useLocale();

	if (!item?.value) return '';
	const date = new Date(item?.value);
	const isValid = !isNaN(date.getTime());
	if (!isValid) return '';
	const days = differenceInDays(NOW, date);

	if (days <= 7) return t('days_ago', { count: days });

	return format(date, 'dd MMM yyyy', {
		locale: LOCALES[locale] || LOCALES[DEFAULT_LOCALE],
	});
}

export function BadgesGenerator({
	item,
}: {
	item: { _uid: string; value: Array<{ title: string; level?: TLevel }> };
}) {
	return (
		<div className='flex group w-fit relative flex-wrap justify-center'>
			{item.value?.map(({ title, level }) => (
				<span
					key={title}
					className={clsx(
						'-ml-4 lg:first:ml-0 inline-block border-2 text-xs border-white dark:border-gray-700 shrink-0 px-2.5 py-1 rounded-full cursor-pointer',
						'transition-all group-hover:opacity-50 hover:!opacity-100 hover:z-20 hover:scale-110',
						{
							'text-gray-500 bg-gray-100 dark:bg-gray-800': ![
								'success',
								'warn',
								'info',
							].includes(level || ''),
							'text-emerald-500 bg-emerald-100 dark:bg-gray-800':
								level === 'success',
							'text-red-500 bg-red-100 dark:bg-gray-800': level === 'warn',
							'text-blue-600 bg-blue-100 dark:bg-gray-800': level === 'info',
						},
					)}
				>
					{title}
				</span>
			))}
		</div>
	);
}

export function ActionGenerator<T extends TUID>({ item }: { item: T }) {
	return (
		<button>
			<HiOutlineDotsVertical size={20} />
		</button>
	);
}

function withGenerator<T extends TUID>(
	field: string,
	C?: TGenerator<{ _uid: string; value: any }>,
) {
	function Wrapper({ item }: { item: T }) {
		const value = (item as any)[field];
		return !!C ? <C item={{ _uid: item._uid, value }} /> : <span>{value}</span>;
	}
	return Wrapper;
}

export default withGenerator;
