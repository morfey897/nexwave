'use client';
import * as Switch from '@radix-ui/react-switch';
import { useTheme } from '~hooks/theme';
import { useCallback } from 'react';
import { useMounted } from '~hooks/mounted';

function ThemeSwithcer() {
	const mounted = useMounted();

	const { theme, toggleTheme } = useTheme();

	return mounted ? (
		<div>
			<Switch.Root
				checked={theme === 'dark'}
				onClick={toggleTheme}
				className='bg-blackA6 shadow-blackA4 relative h-[25px] w-[42px] cursor-pointer rounded-full shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black'
			>
				<Switch.Thumb className='shadow-blackA4 block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]' />
			</Switch.Root>
		</div>
	) : (
		<div className='animate-pulse'>
			<h2 className='mx-auto h-6 w-full rounded-lg bg-gray-700'></h2>
			<div className='h-[25px] w-[42px] bg-gray-700' />
		</div>
	);
}

export default ThemeSwithcer;
