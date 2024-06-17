'use client';
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { COOKIES } from '@nw/config';
import { getClassTheme, getSystemTheme } from '~utils';

function Theme() {
	useLayoutEffect(() => {
		const classTheme = getClassTheme();
		if (!classTheme) {
			const systemTheme = getSystemTheme();
			document.documentElement.classList.add(systemTheme);
			document.cookie = `${COOKIES.THEME}=${systemTheme};path=/`;
		}
	}, []);

	return null;
}

export default Theme;
