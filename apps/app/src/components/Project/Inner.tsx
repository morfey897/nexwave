'use client';
import React from 'react';
import { type IProject } from '@/models/project';
import { MdCheck } from 'react-icons/md';
import { ROOT } from '@/routes';
import { dynamicHref } from '@/utils';
import clsx from 'clsx';
import ProjectIcon from '@/components/Project/Icon';
import Branch from './Branch';
import Accordion from '../Accordion';
import Button from '../Button';
import { BiChevronDown } from 'react-icons/bi';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function SkeletonProject({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx(
				'min-h-[100px] w-full animate-pulse rounded-xl',
				'border border-gray-400 dark:border-gray-700',
				'bg-gray-300 dark:bg-gray-600',
				className
			)}
			{...props}
		/>
	);
}

function InnerProject({
	project,
	active,
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	project: IProject;
	active?: boolean;
}) {
	const t = useTranslations();
	const router = useRouter();

	const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLElement;
		const isShowMore =
			target.getAttribute('name') === 'show-more' ||
			target.parentElement?.getAttribute('name') === 'show-more';
		if (!isShowMore) {
			router.push(dynamicHref(ROOT, { uuid: project.uuid }));
		}
	};

	return (
		<div
			onClick={onClick}
			className={clsx(
				'block',
				'bg-white dark:bg-gray-800',
				'group space-y-1 rounded-xl border px-3 py-4',
				active
					? 'cursor-default border-blue-400 dark:border-blue-300'
					: 'cursor-pointer border-slate-400 hover:border-blue-400 hover:shadow-lg hover:shadow-slate-800/10 dark:border-slate-300 dark:hover:border-blue-300 dark:hover:shadow-slate-300/10',
				className
			)}
			{...props}
		>
			<div className='relative flex items-center gap-x-2 text-base font-semibold capitalize text-gray-700 dark:text-white'>
				{/* <div className='flex items-center'> */}
				<ProjectIcon
					image={project.image}
					size={32}
					altFallback='project'
					marker={{
						color: project.color,
						className: clsx(active && 'animate-pulse'),
					}}
				/>
				<h2>{project.name}</h2>
				{/* </div> */}

				{active && (
					<span className='absolute -right-3 -top-4 rounded-es-xl rounded-se-xl bg-blue-400 p-1 text-white dark:bg-blue-300 dark:text-gray-800'>
						<MdCheck size={24} />
					</span>
				)}
			</div>

			<div className='divide-y divide-gray-200 dark:divide-gray-700'>
				{project.branches.slice(0, 3).map((branch) => (
					<Branch key={branch.uuid} branch={branch} className='text-sm' />
				))}

				{project.branches.length > 3 && (
					<Accordion
						inputProps={{
							name: 'show-more',
							children: (
								<Button
									size='sm'
									name='show-more'
									tag='span'
									variant='text'
									message={t('button.more_less')}
									className='w-full justify-between text-gray-400 dark:text-gray-500'
									iconAfter={
										<span className='icon pointer-events-none block shrink-0 rotate-0 self-baseline transition-transform ease-out'>
											<BiChevronDown size={24} className={''} />
										</span>
									}
								/>
							),
						}}
					>
						<div className='divide-y divide-gray-200 dark:divide-gray-700'>
							{project.branches.slice(3).map((branch) => (
								<Branch key={branch.uuid} branch={branch} className='text-sm' />
							))}
						</div>
					</Accordion>
				)}
			</div>
		</div>
	);
}

export default InnerProject;
