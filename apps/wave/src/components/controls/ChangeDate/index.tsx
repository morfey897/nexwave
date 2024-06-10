'use client';

import { compareAsc, format } from 'date-fns';
import { useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { useNow } from '~hooks/calendar';
import { toIsoDate } from '~utils/datetime';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi';
import { useDateLocale } from '~hooks/datetime';
import Button from '~components/buttons';

function ChangeDate({
	onChange,
	dates,
	className,
	messages,
}: {
	dates: [string, string];
	onChange?: (index: number) => void;
	messages?: {
		today?: string;
	};
} & Omit<React.HTMLProps<HTMLDivElement>, 'onChange'>) {
	const now = useNow();
	const locale = useDateLocale();

	const title = useMemo(() => {
		const from = toIsoDate(dates[0]);
		const to = toIsoDate(dates[1]);

		if (from === to)
			return format(new Date(from), 'dd MMM', { locale: locale });

		return (
			format(new Date(from), 'dd MMM', { locale: locale }) +
			' - ' +
			format(new Date(to), 'dd MMM', {
				locale: locale,
			})
		);
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
			<Button
				size='sm'
				className='!px-2'
				aria-label={'previous week'}
				onClick={onPrev}
				icon={<HiChevronLeft size={28} />}
			/>
			<div className='text-center'>
				{/* TODO show calendar by click */}
				<p className='inline-block text-sm text-gray-800 dark:text-white'>
					{title}
				</p>
				{showToday && (
					<Button
						size='sm'
						variant='text'
						aria-label={messages?.today}
						onClick={onToday}
						className='mx-auto !p-0 text-blue-500 hover:underline dark:text-blue-400'
						message={messages?.today}
					/>
				)}
			</div>
			<Button
				size='sm'
				className='!px-2'
				aria-label={'previous week'}
				onClick={onNext}
				icon={<HiChevronRight size={28} />}
			/>
		</div>
	);
}

export default ChangeDate;
