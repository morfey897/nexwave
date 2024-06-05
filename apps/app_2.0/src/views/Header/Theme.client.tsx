'use client';
import { useCallback, useState, useEffect } from 'react';
import { HiMoon, HiSun } from 'react-icons/hi';
import clsx from 'clsx';
import { COOKIES } from '@nw/config';

type ThemeType = 'dark' | 'light' | 'none';

function Theme({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
	const [theme, setTheme] = useState<ThemeType>('none');

	useEffect(() => {
		const classList = document.documentElement.classList;
		if (classList.contains('dark')) {
			setTheme('dark');
		} else if (classList.contains('light')) {
			setTheme('light');
		}
	}, []);

	const onToggleDarkMode = useCallback(() => {
		let newTheme: ThemeType = 'none';
		if (theme === 'dark') {
			newTheme = 'light';
		} else if (theme === 'light') {
			newTheme = 'dark';
		}
		if (newTheme != 'none') {
			const classList = document.documentElement.classList;
			setTheme(newTheme);
			document.cookie = `${COOKIES.THEME}=${newTheme};path=/`;
			if (newTheme === 'dark') {
				classList.remove('light');
				classList.add('dark');
			} else {
				classList.remove('dark');
				classList.add('light');
			}
		}
	}, [theme]);

	return theme === 'none' ? (
		<div className={clsx('h-6 w-6', className)} />
	) : (
		<button
			onClick={onToggleDarkMode}
			className={clsx(
				'text-gray-5 hover:text-gray-6 focus:text-gray-6 focus:outline-none',
				className
			)}
		>
			{theme === 'dark' && <HiMoon size={24} />}
			{theme === 'light' && <HiSun size={24} />}
		</button>
	);
}

export default Theme;
