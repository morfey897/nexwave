'use client';
import React from 'react';
import { type IProject } from '@/models/project';
import { MdOutlineArrowCircleRight } from 'react-icons/md';
import { ROOT } from '@/routes';
import { dynamicHref } from '@/utils';
import clsx from 'clsx';
import ProjectIcon from '@/components/Project/Icon';
import Branch from './Branch';
import Accordion from '../Accordion';
import Button from '../Button';
import { BiChevronDown } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

function Project({
	project,
	className,
	more_less,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	project: IProject;
	more_less: string;
}) {
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
				'group p-8 space-y-3 border-2 rounded-xl',
				'border-blue-400 dark:border-blue-300',
				'hover:shadow-lg hover:shadow-slate-800/10 dark:hover:shadow-slate-300/10',
				'cursor-pointer',
				className,
			)}
			{...props}
		>
			<div className='flex items-center gap-x-2 text-xl font-semibold text-gray-700 capitalize dark:text-white'>
				<ProjectIcon
					image={project.image}
					size={32}
					altFallback='project'
					marker={{ color: project.color }}
				/>
				<h2>{project.name}</h2>
			</div>

			<div className='divide-y divide-gray-200 dark:divide-gray-700'>
				{project.branches.slice(0, 3).map((branch) => (
					<Branch key={branch.uuid} branch={branch} />
				))}

				{project.branches.length > 3 && (
					<Accordion
						inputProps={{
							name: 'show-more',
							children: (
								<Button
									name='show-more'
									tag='span'
									variant='text'
									message={more_less}
									className='justify-between text-gray-400 dark:text-gray-500 w-full'
									iconAfter={
										<span className='icon shrink-0 block transition-transform rotate-0 ease-out self-baseline pointer-events-none'>
											<BiChevronDown size={24} className={''} />
										</span>
									}
								/>
							),
						}}
					>
						<div className='divide-y divide-gray-200 dark:divide-gray-700'>
							{project.branches.slice(3).map((branch) => (
								<Branch key={branch.uuid} branch={branch} />
							))}
						</div>
					</Accordion>
				)}
			</div>

			<div className='w-full'>
				<span
					className={clsx(
						'block p-2 h-8 w-8 rounded-full',
						'bg-blue-100 dark:bg-blue-500',
					)}
				>
					<span className='dark:text-white text-blue-500 block transition-all duration-500 ease-linear group-hover:text-green-500 dark:group-hover:text-green-300'>
						<MdOutlineArrowCircleRight size={24} />
					</span>
				</span>
			</div>
		</div>
	);
}

export default Project;
