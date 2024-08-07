'use client';

import useNWStore from '~/lib/store';
import Button from '~/components/controls/Button';
import { HamburgerIcon, ImportIcon, ExportIcon } from '~/icons';
import DropdownProjects from '~/components/sidebar/components/DropdownProjects';
import SearchInput from './components/SearchInput';
import Filters from './components/Filters';
import TableSettings from './components/TableSettings';
import { useTranslations } from 'next-intl';
import FilterIcon from '~/icons/FilterIcon';
import HeaderWrapper from '~/components/general/HeaderWrapper';

const Header = () => {
	const t = useTranslations();
	const seUI = useNWStore((state) => state.setUI);
	const project = useNWStore((state) => state.project);

	return (
		<HeaderWrapper>
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
							<SearchInput.Hover />
							<div className='mr-3'>
								<Filters>
									<FilterIcon width={24} height={24} />
								</Filters>
							</div>
						</div>
						<p className='text-secondary-text hidden text-sm md:block'>
							{project?.name &&
								t('page.clients.subheadline', { name: project.name })}
						</p>
					</div>
					<div className='hidden gap-5 md:flex'>
						<Button
							message='Import'
							icon={<ImportIcon userSelectedColor />}
							className='!border-blue-1'
						/>
						<Button
							message='Export'
							icon={<ExportIcon userSelectedColor />}
							className='!border-blue-1'
						/>
					</div>
				</div>
				<div className='mt-5 hidden justify-between md:flex'>
					<SearchInput />
					<div className='flex gap-5'>
						<Filters>
							<div className='relative h-[48px] w-[250px]'>
								<select className='border-stroke text-primary-text-gray font-inter h-full w-full cursor-pointer rounded-md pl-12 text-base font-normal leading-6'>
									<option value=''>Filter</option>
								</select>
								<div className='absolute left-6 top-1/2 -translate-y-1/2 transform'>
									<FilterIcon />
								</div>
							</div>
						</Filters>
						<TableSettings />
					</div>
				</div>
			</div>
		</HeaderWrapper>
	);
};

export default Header;
