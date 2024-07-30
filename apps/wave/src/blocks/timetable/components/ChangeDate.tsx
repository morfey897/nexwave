'use client';

import { compareAsc, format } from 'date-fns';
import { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { useNow } from '~/hooks/calendar';
import { toIsoDate } from '~/utils/datetime';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { useDateLocale } from '~/hooks/datetime';
import { useTranslations } from 'next-intl';

function ChangeDate({
	onChange,
	dates,
	className,
}: {
	dates: [string, string];
	onChange?: (index: number) => void;
} & Omit<React.HTMLProps<HTMLDivElement>, 'onChange'>) {
	const t = useTranslations();
	const now = useNow();
	const locale = useDateLocale();

	const title = useMemo(() => {
		const from = toIsoDate(dates[0]);
		const to = toIsoDate(dates[1]);

		if (from === to) return format(new Date(from), 'dd MMM', { locale });

		return `${format(new Date(from), 'dd MMM', { locale })} - ${format(
			new Date(to),
			'dd MMM',
			{
				locale,
			}
		)}`;
	}, [dates, locale]);

	const showToday = useMemo(() => {
		const nowDate = new Date(now.date);
		return (
			compareAsc(nowDate, new Date(toIsoDate(dates[0]))) < 0 ||
			compareAsc(new Date(toIsoDate(dates[1])), nowDate) < 0
		);
	}, [dates, now]);

	const onToday = useCallback(() => {
		typeof onChange === 'function' && onChange(0);
	}, [onChange]);

	const onNext = useCallback(() => {
		typeof onChange === 'function' && onChange(1);
	}, [onChange]);

	const onPrev = useCallback(() => {
		typeof onChange === 'function' && onChange(-1);
	}, [onChange]);

	return (
		<div
			className={clsx('flex items-center justify-between gap-x-2', className)}
		>
			<button className='!px-2' aria-label={'previous week'} onClick={onPrev}>
				<HiChevronLeft size={28} />
			</button>
			<div className='text-center'>
				{/* TODO show calendar by click */}
				<p className='inline-block text-sm text-gray-800 dark:text-white'>
					{title}
				</p>
				{/* {showToday && (
					<Button
						variant='text'
						onClick={onToday}
						className='mx-auto !p-0 text-blue-500 hover:underline dark:text-blue-400'
						message={t('day.today')}
					/>
				)} */}
			</div>
			<button className='!px-2' aria-label={'next week'} onClick={onNext}>
				<HiChevronRight size={28} />
			</button>
		</div>
	);
}

export default ChangeDate;
