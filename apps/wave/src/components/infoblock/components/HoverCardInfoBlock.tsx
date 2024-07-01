import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';
import EllipsisIcon from '~root/icons/ElipsisIcon';
import RightArrowFull from '~root/icons/RightArrowFull';
import LeftArrowFull from '~root/icons/LeftArrowFull';
import PencilIcon from '~root/icons/PencilIcon';
import TrashIcon from '~root/icons/TrashIcon';
import clsx from 'clsx';

const HoverCardInfoBlock = () => {
	const [open, setOpen] = useState(false);
	const HoverCardInfoBlockClasses = clsx(
		'focus:outline-user-selected hover:border-user-selected hover:bg-gray-2 flex items-center gap-3 rounded-t-lg border-b-2 border-transparent p-2 pl-5 focus:rounded-lg focus:border-b-0 dark:hover:bg-gray-700'
	);
	return (
		<Popover.Root open={open} onOpenChange={setOpen}>
			<Popover.Trigger asChild>
				<span className='cursor-pointer' onClick={() => setOpen(true)}>
					<EllipsisIcon />
				</span>
			</Popover.Trigger>
			<Popover.Content
				className='data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade bg-secondary mt-5 h-[189px] w-[254px] rounded-md shadow-md outline-none data-[state=open]:transition-all'
				sideOffset={5}
			>
				<ul className='flex h-full list-none flex-col justify-between py-2'>
					<li className={HoverCardInfoBlockClasses}>
						<RightArrowFull />
						<span className='text-primary-text text-base font-normal leading-6'>
							Move right
						</span>
					</li>
					<li className={HoverCardInfoBlockClasses}>
						<LeftArrowFull />
						<span className='text-primary-text text-base font-normal leading-6'>
							Move left
						</span>
					</li>
					<li className={HoverCardInfoBlockClasses}>
						<PencilIcon />
						<span className='text-primary-text text-base font-normal leading-6'>
							Edit
						</span>
					</li>
					<li className={HoverCardInfoBlockClasses}>
						<TrashIcon />
						<span className='text-primary-text text-base font-normal leading-6'>
							Delete
						</span>
					</li>
				</ul>
				<Popover.Arrow className='fill-white' />
			</Popover.Content>
		</Popover.Root>
	);
};

export default HoverCardInfoBlock;
