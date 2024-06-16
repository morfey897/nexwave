'use client';
import { EnumDeviceType } from '~constants/enums';
import { useCallback, useState, useEffect } from 'react';

const MIN_WIDTH = {
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	xxl: 1536,
};

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
	}, [query, updateTarget]);

	return targetReached;
};

export const useBreakpoint = () => {
	const xs = useMediaQuery(`(max-width: ${MIN_WIDTH.sm - 1}px)`);
	const sm = useMediaQuery(`(min-width: ${MIN_WIDTH.sm}px)`);
	const md = useMediaQuery(`(min-width: ${MIN_WIDTH.md}px)`);
	const lg = useMediaQuery(`(min-width: ${MIN_WIDTH.lg}px)`);
	const xl = useMediaQuery(`(min-width: ${MIN_WIDTH.xl}px)`);
	const xxl = useMediaQuery(`(min-width: ${MIN_WIDTH.xxl}px)`);
	return {
		xs,
		sm,
		md,
		lg,
		xl,
		xxl,
	};
};

export const useDevice = (): EnumDeviceType => {
	const { xs, sm, md, lg, xl, xxl } = useBreakpoint();
	if (xxl || xl || lg) return EnumDeviceType.DESKTOP;
	if (md) return EnumDeviceType.TABLET;
	if (sm || xs) return EnumDeviceType.MOBILE;
	return EnumDeviceType.NONE;
};
