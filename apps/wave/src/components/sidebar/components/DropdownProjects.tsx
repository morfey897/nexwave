'use clients';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import RightArrow from '~/icons/RightArrow';
import { Box } from '~/components/layout';
import useNWStore from '~/lib/store';
import { useAPI } from '~/hooks/action';
import { EnumApiRoutes, EnumProtectedRoutes } from '~/constants/enums';
import { IProject } from '@nw/storage';
import { useCallback, useState } from 'react';
import { abbrev, buildDynamicHref } from '~/utils';
import CheckIcon from '~/icons/CheckIcon';
import Picture from '~/components/picture/Picture';
import Skeleton from '~/components/skeleton/DropDownProjectSkeleton';
import clsx from 'clsx';

const ProjectSkeleton = () => (
	<div className='flex animate-pulse items-center '>
		<div className='h-[42px] w-[42px] rounded bg-gray-700' />
		<div className='ml-3 hidden h-6 w-32 rounded bg-gray-700 md:hidden lg:block' />
	</div>
);

function DropdownProjects({
	side,
	sideOffset,
}: {
	side: 'left' | 'top' | 'right' | 'bottom' | undefined;
	sideOffset?: number;
}) {
	const [isOpen, setIsOpen] = useState(false);
	const project = useNWStore((state) => state.project);

	const { result, pending } = useAPI<IProject[] | null>(() =>
		isOpen ? EnumApiRoutes.PROJECTS : null
	);

	const onOpenChange = useCallback((open: boolean) => {
		setIsOpen(open);
	}, []);

	return (
		<DropdownMenu.Root onOpenChange={onOpenChange}>
			<DropdownMenu.Trigger className='outline-none'>
				<div className='mb-5 flex cursor-pointer items-center outline-none md:px-2 lg:ps-2.5'>
					{project ? (
						<>
							<Picture
								name={project?.name}
								photo={project?.image}
								abbrev={abbrev(project?.name.split(' '))}
								color={project?.color}
								size={42}
							/>
							<span
								className={clsx(
									'hidden lg:flex',
									'text-primary-text w-[13ch] items-center gap-5 self-center overflow-hidden whitespace-normal break-words px-3 text-xl font-semibold'
								)}
							>
								{project ? project.name : 'Select Project'}
								<RightArrow />
							</span>
						</>
					) : (
						<ProjectSkeleton />
					)}
				</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					side={side}
					sideOffset={sideOffset}
					className='animate-slideRightAndFade relative will-change-[opacity,transform]'
				>
					<div className='bg-secondary w-[266px] rounded-lg p-1 shadow-xl'>
						{pending ? (
							<Skeleton />
						) : (
							result.data?.map((innerProject) => (
								<DropdownMenu.Item
									className='outline-none'
									key={innerProject.uuid}
								>
									<Link
										onClick={(event) => {
											if (innerProject.uuid === project?.uuid) {
												event.preventDefault();
											}
										}}
										href={buildDynamicHref(
											EnumProtectedRoutes.APP,
											innerProject
										)}
										className='mb-5 ml-3 mt-5 flex items-center'
									>
										<Box flexShrink='0'>
											<Picture
												name={innerProject.name}
												photo={innerProject.image}
												abbrev={abbrev(innerProject.name.split(' '))}
												color={innerProject.color}
												size={42}
											/>
										</Box>
										<span className='text-secondary-text w-[13ch] self-center overflow-hidden whitespace-normal break-words px-3 text-xl font-semibold'>
											{innerProject.name}
										</span>
										{project?.uuid === innerProject.uuid && (
											<Box flexShrink='0'>
												<CheckIcon width={20} height={20} />
											</Box>
										)}
									</Link>
								</DropdownMenu.Item>
							))
						)}
					</div>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}

export default DropdownProjects;
