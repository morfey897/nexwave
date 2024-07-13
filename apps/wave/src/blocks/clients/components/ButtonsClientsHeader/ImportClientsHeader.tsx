import ImportIcon from '~/icons/ImportIcon';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import SidebarBurgerIcon from '~/icons/SidebarBurgerIcon';
import { Button } from '~/components/buttons/Button';

const ImportClientsHeader = () => (
	<AlertDialog.Root>
		<AlertDialog.Trigger asChild>
			<Button
				isFullWidth={false}
				message={'Import'}
				icon={<ImportIcon />}
				className='!border-blue-1'
			/>
		</AlertDialog.Trigger>
		<AlertDialog.Portal>
			<AlertDialog.Overlay className='fixed inset-0 z-20 backdrop-blur' />
			<AlertDialog.Content className='data-[state=open]:animate-contentShow bg-primary fixed left-[50%] top-[50%] z-30 h-[178px] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
				<div className='flex justify-between'>
					<AlertDialog.Title className='font-inter text-xl font-semibold leading-7'>
						Import clients?
					</AlertDialog.Title>
					<AlertDialog.Cancel asChild>
						<button className='text-gray-5 hover:bg-gray-2 cursor-pointer rounded-md'>
							<SidebarBurgerIcon />
						</button>
					</AlertDialog.Cancel>
				</div>
				<AlertDialog.Description className='text-primary-text-gray mb-5 mt-2  text-[15px] leading-normal'>
					Would you like to import client?
				</AlertDialog.Description>
				<div className='flex justify-end gap-[25px]'>
					<AlertDialog.Cancel asChild>
						<button className='bg-primary hover:bg-blue-5 hover:text-primary-text-gray flex items-center rounded-lg border-2 px-6 py-3 font-semibold transition-colors duration-200'>
							Cancel
						</button>
					</AlertDialog.Cancel>
					<AlertDialog.Action asChild>
						<button className='bg-blue-1 hover:bg-blue-5 hover:text-primary-text-gray text-secondary flex items-center rounded-lg border-2 px-6 py-3 font-semibold transition-colors duration-200'>
							Import
						</button>
					</AlertDialog.Action>
				</div>
			</AlertDialog.Content>
		</AlertDialog.Portal>
	</AlertDialog.Root>
);

export default ImportClientsHeader;
