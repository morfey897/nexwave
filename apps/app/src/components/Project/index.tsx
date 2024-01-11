import React from 'react';
import { type TProjectToUser } from '@/models/project';
import { MdOutlineArrowCircleRight } from 'react-icons/md';
import Link from 'next/link';
import { ROOT } from '@/routes';
import { dynamicHref } from '@/utils';
import clsx from 'clsx';
import ProjectIcon from '@/components/Project/Icon';
import Branch from './Branch';

function Project({
	project,
	className,
	...props
}: React.HTMLAttributes<HTMLAnchorElement> & { project: TProjectToUser }) {
	return (
		<Link
			href={dynamicHref(ROOT, { uuid: project.uuid })}
			className={clsx(
				'block',
				'bg-white dark:bg-gray-800',
				'group p-8 space-y-3 border-2 rounded-xl',
				'border-blue-400 dark:border-blue-300',
				'hover:shadow-lg hover:shadow-slate-800/10 dark:hover:shadow-slate-300/10',
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
				<h2>
					{project.name}
				</h2>
			</div>

			<div className='divide-y divide-gray-200 dark:divide-gray-700'>
				{project.branches?.map((branch) => (
					<Branch key={branch.uuid} branch={branch} />
				))}
			</div>

			<div className='w-full'>
				<span
					className={clsx(
						'block p-2 h-8 w-8 rounded-full',
						'bg-blue-100 dark:bg-blue-500',
					)}
				>
					<span className='dark:text-white text-blue-500 block transition-all duration-500 ease-linear group-hover:text-green-500 dark:group-hover:text-green-300'>
						<MdOutlineArrowCircleRight sie={24} />
					</span>
				</span>
			</div>
		</Link>
	);
}

export default Project;
