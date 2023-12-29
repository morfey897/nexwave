import { useState, useEffect, useMemo } from 'react';
import { throttle } from 'lodash';

const isBrowser = () => typeof window === 'object';

const getScrollPercent = () => {
	let h = document.documentElement,
		b = document.body;
	return (
		(h.scrollTop || b.scrollTop) /
		((h.scrollHeight || b.scrollHeight) - h.clientHeight)
	);
};

export function useScrollDetect(threshold: number) {
	const [isScrolling, setIsScrolling] = useState(false);

	const onScroll = useMemo(
		() =>
			throttle(
				() => {
					const scrollTop = getScrollPercent();
					setIsScrolling(scrollTop > threshold);
				},
				400,
				{ leading: false },
			),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	useEffect(() => {
		if (isBrowser()) {
			const scrollTop = getScrollPercent();
			setIsScrolling(scrollTop > threshold);
			window.addEventListener('scroll', onScroll);
			return () => {
				onScroll.cancel();
				window.removeEventListener('scroll', onScroll);
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onScroll]);

	return isScrolling;
}
