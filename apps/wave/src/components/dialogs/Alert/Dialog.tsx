import * as AlertDialog from '@radix-ui/react-alert-dialog';
import SidebarBurgerIcon from '~/icons/SidebarBurgerIcon';
import Button from '~/components/controls/Button';
import { useCallback } from 'react';
import useNWStore from '~/lib/store';
import { IAlert } from '~/types';
import { EnumLevel } from '~/constants/enums';
import { WarningIcon } from '~/icons';

function Alert({
	uuid,
	headline,
	subheadline,
	buttons,
	onSubmit,
	onCancel,
	level,
	open,
}: IAlert & { open?: boolean }) {
	const removeAlert = useNWStore((store) => store.removeAlert);
	const onOpenChange = useCallback(
		(isOpened: boolean) => {
			if (!isOpened) removeAlert(uuid);
		},
		[removeAlert, uuid]
	);

	return (
		<AlertDialog.Root open={open} onOpenChange={onOpenChange}>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className='z-ao fixed inset-0 backdrop-blur' />
				<AlertDialog.Content className='data-[state=open]:animate-contentShow bg-primary z-a fixed left-[50%] top-[50%] h-[178px] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
					<div className='flex justify-between'>
						<AlertDialog.Title className='font-inter text-xl font-semibold leading-7'>
							{headline}
						</AlertDialog.Title>
						<AlertDialog.Cancel asChild>
							<span className='hover:text-primary-text-gray cursor-pointer'>
								<SidebarBurgerIcon />
							</span>
						</AlertDialog.Cancel>
					</div>
					<AlertDialog.Description className='text-primary-text-gray mb-5 mt-2  text-[15px] leading-normal'>
						{subheadline}
					</AlertDialog.Description>
					<div className='flex justify-end gap-[25px]'>
						<AlertDialog.Action asChild>
							<Button
								message={Array.isArray(buttons) ? buttons[0] : buttons}
								onClick={onSubmit}
								variant='primary'
								icon={
									level === EnumLevel.CRIT || level === EnumLevel.WARN ? (
										<WarningIcon
											width={20}
											height={20}
											fill={level === EnumLevel.CRIT ? '#F23030' : undefined}
										/>
									) : undefined
								}
							/>
						</AlertDialog.Action>
						{Array.isArray(buttons) && buttons.length > 1 && (
							<AlertDialog.Action asChild>
								<Button
									message={buttons[1]}
									onClick={onCancel}
									variant='default'
								/>
							</AlertDialog.Action>
						)}
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
}

export default Alert;
