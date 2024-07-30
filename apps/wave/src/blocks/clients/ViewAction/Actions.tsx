'use client';

import { LockIcon, TrashIcon, PencilIcon } from '~/icons';
import { EnumLevel, EnumMode } from '~/constants/enums';
import * as Separator from '@radix-ui/react-separator';
import ToggleView from '~/components/controls/ToggleView';
import useNWStore from '~/lib/store';
import Button from '~/components/controls/Button';

const Actions = ({
	mode,
	changedMode,
}: {
	mode: EnumMode;
	changedMode: () => void;
}) => {
	const addAlert = useNWStore((store) => store.addAlert);

	return (
		<div className='flex space-x-4'>
			<ToggleView
				onPressedChange={changedMode}
				pressed={mode === EnumMode.EDIT}
			>
				<PencilIcon />
			</ToggleView>
			<Separator.Root
				className='bg-gray-7 mx-[15px] data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-auto data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px'
				decorative
				orientation='vertical'
			/>
			<div className='flex space-x-2'>
				<Button
					variant='icon'
					aria-label='Lock employee'
					onClick={() => {
						addAlert({
							headline: 'Lock employee',
							subheadline: 'Are you sure you want to lock this employee?',
							buttons: ['Lock', 'Cancel'],
							level: EnumLevel.WARN,
							onSubmit: () => {
								console.log('Lock employee');
								// Lock employee
							},
						});
					}}
					icon={<LockIcon />}
				/>

				{/* </button> */}
				<Button
					variant='icon'
					aria-label='Delete employee'
					onClick={() => {
						addAlert({
							headline: 'Delete employee',
							subheadline: 'Are you sure you want to delete this employee?',
							buttons: ['Delete', 'Cancel'],
							level: EnumLevel.CRIT,
							onSubmit: () => {
								console.log('Delete employee');
								// Delete employee
							},
						});
					}}
					icon={<TrashIcon />}
				/>
			</div>
		</div>
	);
};

export default Actions;
