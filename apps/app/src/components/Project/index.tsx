import React from 'react';
import { type TProjectToUser } from '@/models/project';
import { MdOutlineArrowCircleRight } from 'react-icons/md';
import Link from 'next/link';
import { ROOT } from '@/routes';
import { dynamicHref } from '@/utils';
import clsx from 'clsx';
import ProjectIcon from '@/components/Project/Icon';
import Marker from './Marker';
import Branch from './Branch';
import { BsDiagram2 } from 'react-icons/bs';

function Project({
	project,
}: React.HTMLAttributes<HTMLDivElement> & { project: TProjectToUser }) {
	return (
		<Link
			href={dynamicHref(ROOT, { uuid: project.uuid })}
			className={clsx(
				'bg-white dark:bg-gray-800',
				'group p-8 space-y-3 border-2 rounded-xl',
				'border-blue-400 dark:border-blue-300',
				'hover:shadow-lg hover:shadow-slate-800/10 dark:hover:shadow-slate-300/10',
			)}
		>
			<ProjectIcon image={project.image} size={32} Fallback={BsDiagram2} />

			<div className='flex items-center gap-x-2 '>
				<Marker color={project.color} className='animate-pulse'/>
				<h2 className='text-xl font-semibold text-gray-700 capitalize dark:text-white'>
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
						'transition-all duration-500 ease-linear',
						'group-hover:w-full',
					)}
				>
					<span className='origin-left dark:text-white text-blue-500 block transition-all duration-500 ease-linear group-hover:translate-x-[45%] group-hover:text-green-500 dark:group-hover:text-green-300'>
						<MdOutlineArrowCircleRight sie={24} />
					</span>
				</span>
			</div>
		</Link>
	);
}

export default Project;
