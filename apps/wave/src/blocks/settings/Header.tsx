'use client';

import useNWStore from '~/lib/store';
import HamburgerIcon from '~/icons/HamburgerIcon';
import Button from '~/components/controls/Button';
import RoundedPlus from '~/icons/RoundedPlus';
import DropdownProjects from '~/components/sidebar/components/DropdownProjects';
import HeaderWrapper from '~/components/general/HeaderWrapper';
import { useTranslations } from 'next-intl';

const Header = () => {
	const t = useTranslations();
	const seUI = useNWStore((state) => state.setUI);
	const project = useNWStore((state) => state.project);

	return (
		<HeaderWrapper className='mt-0'>
			<div className='flex h-full w-full flex-col justify-around'>
				<div className='flex flex-col justify-between md:flex-row'>
					<div className='mb-5 flex justify-between md:hidden'>
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
							{t('page.settings.headline')}
						</h1>
						<p className='hidden text-sm text-gray-500 md:block'>
							{project?.name &&
								t('page.settings.subheadline', { name: project.name })}
						</p>
					</div>
					<div className='hidden md:block'>
						<Button
							icon={<RoundedPlus fill='white' />}
							message='Add business'
							variant='primary'
						/>
					</div>
				</div>
			</div>
		</HeaderWrapper>
	);
};

export default Header;
