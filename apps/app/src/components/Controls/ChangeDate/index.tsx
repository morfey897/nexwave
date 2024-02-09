'use client';

import { compareAsc, format } from 'date-fns';
import { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useNow } from '@/hooks/calendar';
import { toIsoDate } from '@/utils/datetime';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { useDateLocale } from '@/hooks/datetime';
import Button from '@/components/Button';

function ChangeDate({
	onChange,
	dates,
	className,
}: {
	dates: [string, string];
	onChange?: (index: number) => void;
} & Omit<React.HTMLProps<HTMLDivElement>, 'onChange'>) {
	const now = useNow();
	const t = (a: string) => a;
	// useTranslations();
	const locale = useDateLocale();

	const title = useMemo(() => {
		return (
			format(new Date(toIsoDate(dates[0])), 'dd MMM', { locale: locale }) +
			' - ' +
			format(new Date(toIsoDate(dates[1])), 'dd MMM', {
				locale: locale,
			})
		);
	}, [dates, locale]);

	const showToday = useMemo(() => {
		const nowDate = new Date(now.date);
		return (
			compareAsc(nowDate, new Date(toIsoDate(dates[0]))) <= 0 ||
			compareAsc(new Date(toIsoDate(dates[1])), nowDate) <= 0
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
		<div className={clsx('flex items-center justify-between gap-x-2', className)}>
			<Button
				className='!px-2'
				aria-label={'previous week'}
				onClick={onPrev}
				icon={<HiChevronLeft size={28} />}
			/>
			<div>
				{/* TODO show calendar by click */}
				<p className='inline-block text-gray-800 dark:text-white text-sm'>
					{title}
				</p>
				{showToday && (
					<Button
						variant='text'
						aria-label={t('general.today')}
						onClick={onToday}
						className='text-blue-500 dark:text-blue-400 !p-0 mx-auto hover:underline'
						message={t('general.today')}
					/>
				)}
			</div>
			<Button
				// variant='text'
				className='!px-2'
				aria-label={'previous week'}
				onClick={onNext}
				icon={<HiChevronRight size={28} />}
			/>
		</div>
	);
}

export default ChangeDate;
