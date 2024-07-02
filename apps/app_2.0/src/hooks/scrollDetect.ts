import { useState, useEffect, useMemo } from 'react';
import { throttle } from 'lodash';

const isBrowser = () => typeof window === 'object';

const getScrollTop = () => {
	let h = document.documentElement,
		b = document.body;
	return h.scrollTop || b.scrollTop;
};

const getScrollPercent = () => {
	let h = document.documentElement,
		b = document.body;
	return (
		(h.scrollTop || b.scrollTop) /
		((h.scrollHeight || b.scrollHeight) - h.clientHeight)
	);
};

const isScroll = (threshold: number | string) => {
	let h = document.documentElement,
		b = document.body;

	const top = h.scrollTop || b.scrollTop;

	if (typeof threshold === 'string') {
		return top > Number.parseInt(threshold);
	}
	return (
		top / ((h.scrollHeight || b.scrollHeight) - h.clientHeight) > threshold
	);
};

export function useScrollDetect(threshold: number | string) {
	const [isScrolling, setIsScrolling] = useState(false);

	const onScroll = useMemo(
		() =>
			throttle(
				() => {
					setIsScrolling(isScroll(threshold));
				},
				400,
				{ leading: false }
			),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	useEffect(() => {
		if (isBrowser()) {
			setIsScrolling(isScroll(threshold));
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
