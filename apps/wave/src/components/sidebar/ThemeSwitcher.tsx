'use client';
import { Text, Switch } from '@radix-ui/themes';
import { useTheme } from '~hooks/theme';
import { useCallback, useState, useEffect } from 'react';

export default function ThemeSwitcher() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	const onToggle = useCallback(() => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	}, [theme, setTheme]);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return <Switch checked={theme === 'dark'} onClick={onToggle} />;
}
