import ToggleGroup from './components/ToggleGroup';

const Header = () => {
	return (
		<div className='relative h-24 w-full'>
			<header className='fixed flex h-24 w-5/6 items-center justify-between bg-gray-50 dark:bg-gray-800'>
				<div>
					<h1 className='text-xl font-semibold dark:text-white'>Dashboard</h1>
					<p className='text-sm text-gray-500'>
						General statistic for Ballet School
					</p>
				</div>
				<ToggleGroup />
			</header>
		</div>
	);
};

export default Header;
