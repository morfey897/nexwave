import * as AlertDialog from '@radix-ui/react-alert-dialog';
import SidebarBurgerIcon from '~/icons/SidebarBurgerIcon';
import { Button } from '~/components/buttons/Button';
import { LockIcon, PencilIcon, TrashIcon } from '~/icons';
import { useTranslations } from 'next-intl';
import * as Tabs from '@radix-ui/react-tabs';
import GeneralTabs from './GeneralTabs';
import PhysiqueTabs from './PhysiqueTabs';
import VisitsTabs from './VisitsTabs';

const EditViewAction = () => {
	const t = useTranslations();

	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild>
				<Button
					variant='tertiary'
					icon={<PencilIcon />}
					className='!justify-start px-3'
					message={t('page.clients.action.edit')}
				/>
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className='fixed inset-0 z-20 backdrop-blur' />
				<AlertDialog.Content className='data-[state=open]:animate-slideRightAndFade bg-secondary fixed right-0 top-0 z-30 h-full translate-x-0 translate-y-0 rounded-r-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
					<div className='flex justify-between'>
						<AlertDialog.Title className='font-inter text-xl font-semibold leading-7'>
							View client
						</AlertDialog.Title>
						<AlertDialog.Cancel asChild>
							<span className='hover:text-primary-text-gray cursor-pointer'>
								<SidebarBurgerIcon />
							</span>
						</AlertDialog.Cancel>
					</div>
					<AlertDialog.Description className='mb-5 mt-2 text-[15px] leading-normal'>
						<div className='flex flex-row justify-between'>
							<span>Client</span>
							<div className='flex space-x-4'>
								<LockIcon />
								<TrashIcon />
							</div>
						</div>
					</AlertDialog.Description>
					<Tabs.Root className='flex w-full flex-col' defaultValue='tab1'>
						<div className='bg-secondary z-10'>
							<Tabs.List
								className='flex w-full flex-col md:w-[621px] md:flex-row'
								aria-label='Manage your account'
							>
								<Tabs.Trigger
									className='text-primary-text-gray data-[state=active]:text-blue-1 border-user-selected flex h-[45px] flex-1 cursor-default select-none items-center justify-center px-5 text-[16px] font-semibold leading-6 outline-none data-[state=active]:border-b-2'
									value='tab1'
								>
									General
								</Tabs.Trigger>
								<Tabs.Trigger
									className='text-primary-text-gray data-[state=active]:text-blue-1 border-user-selected flex h-[45px] flex-1 cursor-default select-none items-center justify-center px-5 text-[16px] font-semibold leading-6 outline-none data-[state=active]:border-b-2'
									value='tab2'
								>
									Physique
								</Tabs.Trigger>
								<Tabs.Trigger
									className='text-primary-text-gray data-[state=active]:text-blue-1 border-user-selected flex h-[45px] flex-1 cursor-default select-none items-center justify-center px-5 text-[16px] font-semibold leading-6 outline-none data-[state=active]:border-b-2'
									value='tab3'
								>
									Visits
								</Tabs.Trigger>
							</Tabs.List>
						</div>
						<Tabs.Content
							className='mt-5 h-full rounded-b-md outline-none'
							value='tab1'
						>
							<GeneralTabs />
						</Tabs.Content>
						<Tabs.Content
							className='bg-secondary h-full rounded-b-md outline-none'
							value='tab2'
						>
							<PhysiqueTabs />
						</Tabs.Content>
						<Tabs.Content
							className='bg-secondary h-full rounded-b-md outline-none'
							value='tab3'
						>
							<VisitsTabs />
						</Tabs.Content>
					</Tabs.Root>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
};

export default EditViewAction;
