'use client';

import { useCallback, useLayoutEffect, useMemo } from 'react';
import { COOKIES } from '@nw/config';
import { EnumTheme } from '~enums';
import { getClassTheme, getSystemTheme } from '~utils';
import useNWStore from '~root/lib/store';

export function useTheme() {
	const setTheme = useNWStore((state) => state.setTheme);
	const theme = useNWStore((state) => state.theme);

	useLayoutEffect(() => {
		const classTheme = getClassTheme();
		if (classTheme) {
			if (classTheme !== theme) {
				setTheme(classTheme);
			}
		} else {
			const systemTheme = getSystemTheme();
			if (systemTheme !== theme) {
				setTheme(systemTheme);
			}
		}
	}, [theme, setTheme]);

	const onSetTheme = useCallback(
		(value: EnumTheme) => {
			if (value !== theme) {
				const { classList } = document.documentElement;
				classList.remove(EnumTheme.LIGHT, EnumTheme.DARK);
				classList.add(value);
				document.cookie = `${COOKIES.THEME}=${value};path=/`;
				setTheme(value);
			}
		},
		[theme, setTheme]
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
