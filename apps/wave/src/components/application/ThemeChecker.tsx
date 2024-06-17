'use client';
import { useEffect } from 'react';
import { COOKIES } from '@nw/config';

function ThemeChecker() {
	useEffect(() => {
		const classList = document.documentElement.classList;
		if (!classList.contains('dark') && !classList.contains('light')) {
			const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light';
			document.documentElement.classList.add(theme);
			document.cookie = `${COOKIES.THEME}=${theme};path=/`;
		}
	}, []);

	return null;
}

export default ThemeChecker;
