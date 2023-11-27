import { useState, useEffect, useMemo } from 'react';
import { throttle } from 'lodash';
import { th } from 'date-fns/locale';

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
			throttle(() => {
				const scrollTop = getScrollPercent();
				setIsScrolling(scrollTop > threshold);
			}, 400),
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
