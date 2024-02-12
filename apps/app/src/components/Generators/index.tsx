'use client';

import { HiOutlineDotsVertical } from 'react-icons/hi';
import { TGenerator } from '@/types/view';
import { EnumLevel } from '@/enums';
import { TUID } from '@/types/common';

import { useTranslations } from 'next-intl';
import { format, differenceInDays } from 'date-fns';
import clsx from 'clsx';
import { useDateLocale } from '@/hooks/datetime';

export function TimeGenerator({
	item,
}: {
	item: { uuid: string; value: string };
}) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const t = (a: string, ...props: unknown[]) => a + JSON.stringify(props);
	// useTranslations();
	const NOW = new Date(new Date().toISOString().split('T')[0]);
	const dateLocale = useDateLocale();

	if (!item?.value) return '';
	const date = new Date(item?.value);
	const isValid = !isNaN(date.getTime());
	if (!isValid) return '';
	const days = differenceInDays(NOW, date);

	if (days <= 7) return t('general.days_ago_', { count: days });

	return (
		<span>
			{format(date, 'dd MMM yyyy', {
				locale: dateLocale,
			})}
		</span>
	);
}

export function BadgesGenerator({
	item,
}: {
	item: { uuid: string; value: Array<{ title: string; level?: EnumLevel }> };
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
							'text-gray-500 bg-gray-100 dark:bg-gray-800':
								!level || !Object.values(EnumLevel).includes(level),
							'text-emerald-500 bg-emerald-100 dark:bg-gray-800':
								level === EnumLevel.SUCCESS,
							'text-red-500 bg-red-100 dark:bg-gray-800':
								level === EnumLevel.WARN,
							'text-blue-600 bg-blue-100 dark:bg-gray-800':
								level === EnumLevel.INFO,
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
	C?: TGenerator<{ uuid: string; value: any }>,
) {
	function Wrapper({ item }: { item: T }) {
		const value = (item as any)[field];
		return !!C ? <C item={{ uuid: item.uuid, value }} /> : <span>{value}</span>;
	}
	return Wrapper;
}

export default withGenerator;
