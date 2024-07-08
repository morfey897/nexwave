'use client';

import useNWStore from '~/lib/store';
import HamburgerIcon from '~/icons/HamburgerIcon';
import DropdownProjects from '~/components/general/DropdownProjects';
import HoverCardHeader from './components/HoverSettingsClientsHeader';
import HoverCardClientsHeader from './components/HoverCardClientsHeader';
import ButtonsClientsHeader from './components/ButtonsClientsHeader/ButtonsClientsHeader';
import SearchInput from './components/SearchInput';
import FilterClientsHeader from './components/FilterClientsHeader';
import TableSettings from './components/TableSettings';
import { useTranslations } from 'next-intl';

const HeaderClients = () => {
	const t = useTranslations();
	const seUI = useNWStore((state) => state.setUI);
	const project = useNWStore((state) => state.project);

	return (
		<header className='bg-primary sticky top-0 z-10 mt-5 flex w-full items-center justify-between pb-5'>
			<div className='flex h-full w-full flex-col justify-around'>
				<div className='flex flex-col justify-between md:flex-row'>
					<div className='flex justify-between md:hidden'>
						<button
							type='button'
							className='mt-1 block md:hidden'
							onClick={() => seUI({ sidebar: true })}
							aria-label='Toggle Sidebar'
						>
							<HamburgerIcon />
						</button>
						<div className='mt-1 flex h-full flex-col items-center justify-around md:hidden'>
							<DropdownProjects side='bottom' />
						</div>
					</div>
					<div className='flex flex-row justify-between md:flex-col'>
						<h1 className='text-xl font-semibold dark:text-white'>
							{t('page.clients.headline')}
						</h1>
						<div className='flex gap-5 md:hidden'>
							<HoverCardClientsHeader />
							<div className='mr-3'>
								<HoverCardHeader />
							</div>
						</div>
						<p className='text-secondary-text hidden text-sm md:block'>
							{project?.name &&
								t('page.clients.subheadline', { name: project.name })}
						</p>
					</div>
					<ButtonsClientsHeader />
				</div>
				<div className='mt-5 hidden justify-between md:flex'>
					<SearchInput />
					<div className='flex gap-5'>
						<FilterClientsHeader />
						<TableSettings />
					</div>
				</div>
			</div>
		</header>
	);
};

export default HeaderClients;

// return (
// 	<header className='bg-primary sticky top-0 z-10 mb-5 mt-5 flex h-36 w-full items-center self-start'>

// 		<div className='flex h-full flex-col justify-around md:w-auto'>
// 			<div className='flex justify-between md:hidden'>
// 				<button
// 					type='button'
// 					className='block md:hidden'
// 					onClick={() => seUI({ sidebar: true })}
// 					aria-label='Toggle Sidebar'
// 				>
// 					<HamburgerIcon />
// 				</button>
// 				<div className='flex h-full flex-col items-center justify-around md:hidden'>
// 					<DropdownMenuHeader />
// 				</div>
// 			</div>
// 			<div className='flex flex-col justify-between'>
// 				<h1 className='text-xl font-semibold dark:text-white'>Clients</h1>
// 				<div className='flex gap-5 md:hidden'>
// 					<HoverCardWeekHeader />
// 					<div className='mr-3'>
// 						<HoverCardHeader />
// 					</div>
// 				</div>
// 				<p className='hidden text-sm text-gray-500 md:block'>
// 					Clients of Ballet School
// 				</p>
// 			</div>
// 		</div>
// 		<div className='flex w-full'>
// 			<SearchInput />
// 			<FilterClientsHeader />
// 			<TableSettings />
// 		</div>
// 		{/* <div className='hidden h-full w-full flex-col justify-around md:flex md:w-auto'>
// 			<ButtonsClientsHeader />

// 		</div> */}
// 	</header>
// );
