'use client';
import { Text, Switch } from '@radix-ui/themes';
import { useTheme } from 'next-themes';
import { useCallback, useState, useEffect } from 'react';

export default function ThemeSwitcher() {
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	const onToggle = useCallback(() => {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
	}, [resolvedTheme, setTheme]);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return <Switch checked={resolvedTheme === 'dark'} onClick={onToggle} />;
}
