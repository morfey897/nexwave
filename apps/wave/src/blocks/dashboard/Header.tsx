'use client';

import useNWStore from '~/lib/store';
import ToggleGroup from './components/ToggleGroup';
import HamburgerIcon from '~/icons/HamburgerIcon';
import DropdownProjects from '~/components/general/DropdownProjects';
import HoverCardHeader from './components/HoverCardHeader';
import HoverCardWeekHeader from './components/HoverCardWeekHeader';
import { useTranslations } from 'next-intl';

const HeaderDashboard = () => {
	const t = useTranslations();
	const seUI = useNWStore((state) => state.setUI);
	const project = useNWStore((state) => state.project);

	return (
		<header className='bg-primary sticky top-0 z-10 flex h-24 w-full items-center justify-between self-start'>
			<div className='flex h-full w-full flex-col justify-around md:w-auto md:justify-center'>
				<div className='flex justify-between'>
					<button
						type='button'
						className='block md:hidden'
						onClick={() => seUI({ sidebar: true })}
						aria-label='Toggle Sidebar'
					>
						<HamburgerIcon />
					</button>
					<div className='flex h-full flex-col items-center justify-around md:hidden'>
						<DropdownProjects side='bottom' />
					</div>
				</div>
				<div className='flex justify-between'>
					<h1 className='text-xl font-semibold dark:text-white'>
						{t('page.dashboard.headline')}
					</h1>
					<div className='flex gap-5 md:hidden'>
						<HoverCardWeekHeader />
						<div className='mr-3'>
							<HoverCardHeader />
						</div>
					</div>
				</div>
				<p className='text-secondary-text hidden text-sm md:block'>
					{project?.name &&
						t('page.dashboard.subheadline', { name: project.name })}
				</p>
			</div>
			<div className='hidden w-full items-center justify-end gap-5 md:flex md:w-auto'>
				<ToggleGroup />
				<HoverCardHeader />
			</div>
		</header>
	);
};

export default HeaderDashboard;
