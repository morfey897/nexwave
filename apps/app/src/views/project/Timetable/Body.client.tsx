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
import { getFirstDayOfWeek, toIsoDate } from '@/utils/datetime';
import { CELL_HEIGHT, TIME_STEP } from './config';
import { useAPI } from '@/hooks/action';
import { IEvent } from '@/models/event';
import useNWStore from '@/lib/store';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { throttle } from 'lodash';
import { API } from '@/routes';
import { dynamicHref } from '@/utils';
import AccessDenied from '@/components/AccessDenied';
import { ACCESS_DENIED } from '@/errorCodes';
import { addDays } from 'date-fns';

function Body({ device }: { device?: EnumDeviceType }) {
	const ref = useRef<HTMLDivElement>(null);
	const project = useNWStore((state) => state.project);
	const { value: branchUUid } = useFilter({
		name: S_PARAMS.FILTER,
		defaultValue: '__all__',
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

	const activeBranch =
		project?.branches && project?.branches.length === 1
			? project?.branches[0]
			: project?.branches.find((branch) => branch.uuid === branchUUid);

	const { result, pending } = useAPI<IEvent[] | null>(() =>
		project && activeBranch
			? dynamicHref(API.EVENTS, {
					params: new URLSearchParams({
						from: datesList[0],
						to: toIsoDate(
							addDays(new Date(datesList[datesList.length - 1]), 1),
						),
						branch_id: activeBranch.id.toString(),
						project_id: project.id.toString(),
					}),
				})
			: null,
	);

	const isAccessDenied = result?.error?.code === ACCESS_DENIED;

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

	useLayoutEffect(() => {
		const element = document.getElementById('marker-now');
		if (!element) return;
		element.scrollIntoView({
			behavior: 'auto',
			block: 'center',
			inline: 'center',
		});
	}, []);

	return (
		<ContainerBody className='!overflow-y-auto'>
			<div
				ref={ref}
				className={clsx(
					'relative',
					period === EnumPeriod.WEEK && 'min-w-[600px]',
					'max-h-[100vh]',
				)}
			>
				{isAccessDenied && (
					<div className='z-10 bg-gray-100/20 dark:bg-black/20 backdrop-blur absolute w-full h-full'>
						<AccessDenied className='mt-4' />
					</div>
				)}
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
