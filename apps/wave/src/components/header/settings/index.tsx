'use client';

import useNWStore from '~/lib/store';
import HamburgerIcon from '~/icons/HamburgerIcon';
import DropdownMenuHeader from './components/DropdownMenuHeader';
import Button from '~/components/buttons/Button';
import RoundedPlus from '~/icons/RoundedPlus';

const HeaderSettings = () => {
	const seUI = useNWStore((state) => state.setUI);
	const project = useNWStore((state) => state.project);

	return (
		<header className='bg-primary sticky top-0 z-10 mb-5 mt-5 flex h-24 w-full items-center justify-between md:h-36'>
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
							<DropdownMenuHeader />
						</div>
					</div>
					<div className='flex flex-row justify-between md:flex-col'>
						<h1 className='text-xl font-semibold dark:text-white'>Settings</h1>
						<p className='hidden text-sm text-gray-500 md:block'>
							Settings of {project?.name}
						</p>
					</div>
					<div className='hidden md:block'>
						<Button
							icon={<RoundedPlus fill='white' />}
							message="Add business"
							variant='primary'
						/>
					</div>
				</div>
			</div>
		</header>
	);
};

export default HeaderSettings;
