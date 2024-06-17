'use client';
import { useCallback, useState, useLayoutEffect, useMemo } from 'react';
import { COOKIES } from '@nw/config';
import { EnumTheme } from '~enums';
import { getClassTheme, getSystemTheme } from '~utils';

export function useTheme() {
	const [theme, setTheme] = useState<EnumTheme | undefined>();

	useLayoutEffect(() => {
		const classTheme = getClassTheme();
		if (classTheme) {
			setTheme(classTheme);
		} else {
			const systemTheme = getSystemTheme();
			setTheme(systemTheme);
		}
	}, []);

	const onSetTheme = useCallback(
		(value: EnumTheme) => {
			if (value !== theme) {
				const classList = document.documentElement.classList;
				classList.remove(EnumTheme.LIGHT, EnumTheme.DARK);
				classList.add(value);
				document.cookie = `${COOKIES.THEME}=${value};path=/`;
				setTheme(value);
			}
		},
		[theme]
	);

	const toggleTheme = useCallback(() => {
		onSetTheme(theme === EnumTheme.DARK ? EnumTheme.LIGHT : EnumTheme.DARK);
	}, [theme, onSetTheme]);

	const memoizedValue = useMemo(
		() => ({ theme, setTheme: onSetTheme, toggleTheme }),
		[theme, onSetTheme, toggleTheme]
	);

	return memoizedValue;
}

export default useTheme;
