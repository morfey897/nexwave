'use clients';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import RightArrow from '~/icons/RightArrow';
import { Box } from '~/components/layout';
import useNWStore from '~/lib/store';
import { useAPI } from '~/hooks/action';
import { EnumApiRoutes, EnumProtectedRoutes } from '~/constants/enums';
import { IProject } from '~/types';
import { useCallback, useState } from 'react';
import { abbrev, buildDynamicHref } from '~/utils';
import CheckIcon from '~/icons/CheckIcon';
import Picture from '~/components/picture';

const Skeleton = () => (
	<div>
		<div className='flex w-64 animate-pulse items-center space-x-4 rounded-lg p-4 shadow'>
			<div className='bg-primary h-[42px] w-[42px] rounded-lg' />
			<div className='flex-1'>
				<div className='bg-primary mb-2 h-4 w-3/4 rounded ' />
				<div className='bg-primary h-4 w-1/2 rounded ' />
			</div>
		</div>
	</div>
);

function DropdownMenuSidebar() {
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
				<div className='mb-5 hidden cursor-pointer items-center outline-none md:flex md:px-2 lg:ps-2.5'>
					<Picture
						name={project?.name}
						photo={project?.image}
						abbrev={abbrev([project?.name.split(' ')])}
						color={project?.color}
						size={42}
					/>
					<span
						className='text-primary-text w-60 items-center gap-5 self-center overflow-hidden whitespace-normal px-3 text-xl font-semibold md:hidden lg:flex'
						style={{ width: '13ch', overflowWrap: 'break-word' }}
					>
						{project ? project.name : 'Select Project'}
						<RightArrow />
					</span>
				</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				side='left'
				className='animate-slideRightAndFade relative will-change-[opacity,transform]'
			>
				<div className='bg-secondary w-64 rounded-lg p-1 shadow-xl'>
					{pending ? (
						<Skeleton />
					) : (
						result.data?.map((innerProject) => (
							<DropdownMenu.Item
								className='outline-none'
								key={innerProject.uuid}
							>
								<Link
									href={buildDynamicHref(EnumProtectedRoutes.APP, innerProject)}
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
									<span className='text-secondary-text self-center whitespace-nowrap px-3 text-xl font-semibold'>
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
		</DropdownMenu.Root>
	);
}

export default DropdownMenuSidebar;
