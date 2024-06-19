'use client';
import useNWStore from '~root/lib/store';
import ToggleGroup from './components/ToggleGroup';
import HamburgerIcon from '~icons/HamburgerIcon';

const Header = () => {
	const seUI = useNWStore((state) => state.setUI);

	return (
		// TODO header should be sticky
		// <div className='sticky h-24 w-full'>
		<header className='sticky flex h-24 items-center justify-between bg-gray-50 dark:bg-gray-800'>
			<div>
				<button onClick={() => seUI({ sidebar: true })}>
					<HamburgerIcon />
				</button>
				<h1 className='text-xl font-semibold dark:text-white'>Dashboard</h1>
				<p className='text-sm text-gray-500'>
					General statistic for Ballet School
				</p>
			</div>
			<ToggleGroup />
		</header>
		// </div>
	);
};

export default Header;
