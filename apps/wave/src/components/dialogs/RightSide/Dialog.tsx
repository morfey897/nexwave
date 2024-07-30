import * as AlertDialog from '@radix-ui/react-alert-dialog';
import SidebarBurgerIcon from '~/icons/SidebarBurgerIcon';
import clsx from 'clsx';

function RightSidePanel({
	children,
	headline,
	subheadline,
	actions,
	open,
	handleOpenChange,
	handleClickByOverlay,
}: {
	headline: string;
	subheadline: string;
	actions?: React.ReactNode;
	children?: React.ReactNode;
	open: boolean;
	handleOpenChange: (open: boolean) => void;
	handleClickByOverlay?: () => void;
}) {
	return (
		<AlertDialog.Root open={open} onOpenChange={handleOpenChange}>
			<AlertDialog.Portal>
				<AlertDialog.Overlay
					className='z-do fixed inset-0 backdrop-blur'
					onClick={handleClickByOverlay}
				/>
				<AlertDialog.Content
					className={clsx(
						'data-[state=open]:animate-dialogShow',
						'data-[state=closed]:animate-dialogHide',
						'bg-secondary z-d fixed right-0 top-0 h-screen translate-x-0 translate-y-0 rounded-r-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'
					)}
				>
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
					<div className='mb-5 mt-2 flex flex-row items-center justify-between'>
						<AlertDialog.Description className='text-[15px] leading-normal'>
							{subheadline}
						</AlertDialog.Description>
						{actions}
					</div>
					{children}
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
}

export default RightSidePanel;
