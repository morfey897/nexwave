import * as AlertDialog from '@radix-ui/react-alert-dialog';
import SidebarBurgerIcon from '~/icons/SidebarBurgerIcon';
import { Button } from '~/components/buttons/Button';
import { LockIcon, PencilIcon, TrashIcon } from '~/icons';
import { useTranslations } from 'next-intl';
import * as Tabs from '@radix-ui/react-tabs';
import ArchiveIcon from '~/icons/ArchiveIcon';
import Separator from '~/components/sidebar/components/Separator';
import GeneralInfoBlock from './components/GeneralInfoBlock';
import SettingsBlock from './components/SettingsBlock';
import DateBlock from './components/DateBlock';
import RepeatBlock from './components/RepeatBlock';
import ButtonEditViewActionCallendar from './components/ButtonEditViewActionCallendar';

const PencilIconEdit = () => {
	const t = useTranslations();

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<PencilIcon />
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className='fixed inset-0 z-20 backdrop-blur' />
				<AlertDialog.Content className='data-[state=open]:animate-slideRightAndFade bg-secondary fixed right-0 top-0 z-30 h-full w-full translate-x-0 translate-y-0 overflow-auto rounded-r-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none md:w-[30rem]'>
					<div className='flex justify-between'>
						<AlertDialog.Title className='font-inter text-xl font-semibold leading-7'>
							Edit event
						</AlertDialog.Title>
						<AlertDialog.Cancel asChild>
							<span className='hover:text-primary-text-gray cursor-pointer'>
								<SidebarBurgerIcon />
							</span>
						</AlertDialog.Cancel>
					</div>
					<GeneralInfoBlock />
					<SettingsBlock />
					<DateBlock />
					<RepeatBlock />
					<ButtonEditViewActionCallendar />
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default PencilIconEdit;
