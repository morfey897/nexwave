'use client';
import { EnumDevice } from '@/types/view';
import { useCallback, useState, useEffect } from 'react';

export const useMediaQuery = (query: string) => {
	const [targetReached, setTargetReached] = useState(false);

	const updateTarget = useCallback((event: any) => {
		if (event.matches) setTargetReached(true);
		else setTargetReached(false);
	}, []);

	useEffect(() => {
		const media = window.matchMedia(query);
		media.addEventListener('change', updateTarget);

		// Check on mount (callback is not called until a change occurs)
		if (media.matches) setTargetReached(true);

		return () => media.removeEventListener('change', updateTarget);
	}, []);

	return targetReached;
};

export const useBreakpoint = () => {
	const sm = useMediaQuery('(min-width: 640px)');
	const md = useMediaQuery('(min-width: 768px)');
	const ls = useMediaQuery('(min-width: 1024px)');
	const xl = useMediaQuery('(min-width: 1280px)');
	const xxl = useMediaQuery('(min-width: 1536px)');
	return {
		sm,
		md,
		ls,
		xl,
		xxl,
	};
};

export const useDevice = (): EnumDevice => {
	const md = useMediaQuery('(min-width: 768px)');
	const ls = useMediaQuery('(min-width: 1024px)');
	const xl = useMediaQuery('(min-width: 1280px)');
	const xxl = useMediaQuery('(min-width: 1536px)');
	if (xxl || xl || ls) return EnumDevice.DESKTOP;
	if (md) return EnumDevice.TABLET;
	return EnumDevice.MOBILE;
};
