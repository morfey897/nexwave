import React from 'react';
import { type IProject } from '@/models/project';
import { MdOutlineArrowCircleRight, MdCheck } from 'react-icons/md';
import Link from 'next/link';
import { ROOT } from '@/routes';
import { dynamicHref } from '@/utils';
import clsx from 'clsx';
import ProjectIcon from '@/components/Project/Icon';
import Branch from './Branch';

export function SkeletonProject({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={clsx(
				'rounded-xl w-full min-h-[100px] animate-pulse',
				'border border-gray-400 dark:border-gray-700',
				'bg-gray-300 dark:bg-gray-600',
				className,
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
}: React.HTMLAttributes<HTMLAnchorElement> & {
	project: IProject;
	active?: boolean;
}) {
	return (
		<Link
			href={dynamicHref(ROOT, { uuid: project.uuid })}
			className={clsx(
				'block',
				'bg-white dark:bg-gray-800',
				'group px-3 py-4 space-y-1 border rounded-xl',
				active
					? 'border-blue-400 dark:border-blue-300 cursor-default'
					: 'border-slate-400 dark:border-slate-300 hover:border-blue-400 dark:hover:border-blue-300 hover:shadow-lg hover:shadow-slate-800/10 dark:hover:shadow-slate-300/10',
				className,
			)}
			{...props}
		>
			<div className='flex items-center relative gap-x-2 text-base font-semibold text-gray-700 capitalize dark:text-white'>
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
					<span className='text-white dark:text-gray-800 absolute p-1 -top-4 -right-3 bg-blue-400 dark:bg-blue-300 rounded-es-xl rounded-se-xl'>
						<MdCheck size={24} />
					</span>
				)}
			</div>

			<div className='divide-y divide-gray-200 dark:divide-gray-700'>
				{project.branches?.map((branch) => (
					<Branch key={branch.uuid} branch={branch} className='text-sm' />
				))}
			</div>
		</Link>
	);
}

export default InnerProject;
