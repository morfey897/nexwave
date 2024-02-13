'use client';
import { ContainerBody } from '@/components/Containers';
import clsx from 'clsx';
import { EnumPeriod } from '@/enums';
import { WeekCalendarBody } from '@/components/Calendar/Week';
import { EventGenerator } from '@/components/Generators/timetable';
import { useFilter, useDay } from '@/hooks/filter';
import { S_PARAMS } from '@nw/config';
import { EnumDeviceType } from '@/enums';
import { useDatesCalendar } from '@/hooks/calendar';
import { getFirstDayOfWeek } from '@/utils/datetime';
import { CELL_HEIGHT, TIME_STEP } from './config';
import { useAPI } from '@/hooks/action';
import { IEvent } from '@/types/event';
import useNWStore from '@/lib/store';
import { useEffect, useMemo, useRef, useState } from 'react';
import { throttle } from 'lodash';

function Body({ device }: { device?: EnumDeviceType }) {
	const ref = useRef<HTMLDivElement>(null);
	const project = useNWStore((state) => state.project);
	const { value: branchUUid } = useFilter({
		name: S_PARAMS.FILTER,
		defaultValue: 'all',
	});

	const { value: period } = useFilter({
		name: S_PARAMS.VIEW,
		defaultValue:
			device === EnumDeviceType.MOBILE ? EnumPeriod.DAY : EnumPeriod.WEEK,
	});

	const { day } = useDay({
		name: S_PARAMS.DAY,
		defaultValue: getFirstDayOfWeek(),
	});

	const datesList = useDatesCalendar({ period, day });

	const { result, pending } = useAPI<IEvent[] | null>(
		() =>
			`/api/events?${new URLSearchParams({
				from: datesList[0],
				to: datesList[datesList.length - 1],
				branch: branchUUid,
				projectId: project?.uuid || '',
			})}`,
	);

	const onResize = useMemo(
		() =>
			throttle(() => {
				if (!ref.current) return;
				const rect = ref.current.getBoundingClientRect();
				ref.current.style.maxHeight = `calc(100vh - ${rect.y}px)`;
			}, 100),
		[],
	);

	useEffect(() => {
		onResize();
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<ContainerBody className='!overflow-y-auto'>
			<div
				ref={ref}
				className={clsx(
					period === EnumPeriod.WEEK && 'min-w-[600px]',
					'max-h-[100vh]',
				)}
			>
				<WeekCalendarBody<IEvent>
					className={clsx(
						'bg-white dark:bg-gray-900',
						'border border-gray-200 dark:border-gray-700 border-b-0 rounded-b-md md:rounded-b-lg',
						'w-full',
					)}
					dates={datesList}
					events={result.data || []}
					Generator={EventGenerator}
					cellHeight={CELL_HEIGHT}
					timeStep={TIME_STEP}
				/>
			</div>
		</ContainerBody>
	);
}

export default Body;
