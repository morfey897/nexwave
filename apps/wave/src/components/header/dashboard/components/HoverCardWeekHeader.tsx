import * as Popover from '@radix-ui/react-popover';
import { useState } from 'react';
import CalendarHeaderIcon from '~/icons/CalendarHeaderIcon';
import ToggleGroupMobile from './ToggleGroupMobile';

const HoverCardWeekHeader = () => {
	const [open, setOpen] = useState(false);
	return (
		<Popover.Root open={open} onOpenChange={setOpen}>
			<Popover.Trigger asChild>
				<span className='cursor-pointer' onClick={() => setOpen(true)}>
					<CalendarHeaderIcon />
				</span>
			</Popover.Trigger>
			<Popover.Content
				className='data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade h-[228px] w-[186px] rounded-md bg-white shadow-md outline-none data-[state=open]:transition-all'
				sideOffset={5}
			>
				<ToggleGroupMobile />
				<Popover.Arrow className='fill-white' />
			</Popover.Content>
		</Popover.Root>
	);
};

export default HoverCardWeekHeader;
