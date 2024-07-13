import * as Tabs from '@radix-ui/react-tabs';
import GeneralSettings from './components/GeneralSettings';
import HallsSettings from './components/HallsSettings';
import AccessLevelsSettings from './components/AccessLevelsSettings';
import PaymentSettings from './components/PaymentSettings';
import { useTranslations } from 'next-intl';

function Body() {
	const t = useTranslations();
	return (
		<div className='w-full'>
			<Tabs.Root className='flex w-full flex-col' defaultValue='tab1'>
				<div className='bg-primary sticky top-[8.9rem] z-10 md:top-[4.5rem]'>
					<Tabs.List
						className='flex w-full flex-col md:w-[621px] md:flex-row'
						aria-label='Manage your account'
					>
						<Tabs.Trigger
							className='text-primary-text-gray data-[state=active]:text-blue-1 border-user-selected flex h-[45px] flex-1 cursor-default select-none items-center justify-center px-5 text-[16px] font-semibold leading-6 outline-none data-[state=active]:border-b-2'
							value='tab1'
						>
							{t('page.settings.tab_general')}
						</Tabs.Trigger>
						<Tabs.Trigger
							className='text-primary-text-gray data-[state=active]:text-blue-1 border-user-selected flex h-[45px] flex-1 cursor-default select-none items-center justify-center px-5 text-[16px] font-semibold leading-6 outline-none data-[state=active]:border-b-2'
							value='tab2'
						>
							{t('page.settings.tab_spaces')}
						</Tabs.Trigger>
						<Tabs.Trigger
							className='text-primary-text-gray data-[state=active]:text-blue-1 border-user-selected flex h-[45px] flex-1 cursor-default select-none items-center justify-center px-5 text-[16px] font-semibold leading-6 outline-none data-[state=active]:border-b-2'
							value='tab3'
						>
							{t('page.settings.tab_access')}
						</Tabs.Trigger>
						<Tabs.Trigger
							className='text-primary-text-gray data-[state=active]:text-blue-1 border-user-selected flex h-[45px] flex-1 cursor-default select-none items-center justify-center px-5 text-[16px] font-semibold leading-6 outline-none data-[state=active]:border-b-2'
							value='tab4'
						>
							{t('page.settings.tab_payment')}
						</Tabs.Trigger>
					</Tabs.List>
				</div>
				<Tabs.Content
					className='bg-secondary mt-5 h-full rounded-b-md p-5 shadow-md outline-none'
					value='tab1'
				>
					<GeneralSettings />
				</Tabs.Content>
				<Tabs.Content
					className='bg-secondary mt-5 h-full rounded-b-md p-5 shadow-md outline-none'
					value='tab2'
				>
					<HallsSettings />
				</Tabs.Content>
				<Tabs.Content
					className='bg-secondary mt-5 h-full rounded-b-md p-5 shadow-md outline-none'
					value='tab3'
				>
					<AccessLevelsSettings />
				</Tabs.Content>
				<Tabs.Content
					className='bg-secondary mt-5 h-full rounded-b-md p-5 shadow-md outline-none'
					value='tab4'
				>
					<PaymentSettings />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	);
}

export default Body;
