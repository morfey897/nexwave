'use client';

import useNWStore from '~root/lib/store';
import ToggleGroup from './components/ToggleGroup';
import HamburgerIcon from '~icons/HamburgerIcon';
import DropdownMenuHeader from './components/DropdownMenuHeader';

const Header = () => {
	const seUI = useNWStore((state) => state.setUI);

	return (
		<header className='bg-primary sticky top-0 z-10 flex h-24 w-full items-center justify-between self-start'>
			<div>
				<button
					type='button'
					className='block md:hidden'
					onClick={() => seUI({ sidebar: true })}
					aria-label='Toggle Sidebar'
				>
					<HamburgerIcon />
				</button>
				<h1 className='text-xl font-semibold dark:text-white'>Dashboard</h1>
				<p className='hidden text-sm text-gray-500 md:block'>
					General statistic for Ballet School
				</p>
			</div>
			<div className='mr-3 hidden md:block'>
				<ToggleGroup />
			</div>
			<div className='mr-3 block md:hidden'>
				<DropdownMenuHeader />
			</div>
		</header>
	);
};

export default Header;
