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
	const [result, setResult] = useState(0);

	const onScroll = useMemo(
		() =>
			throttle(() => {
				const scrollTop = getScrollPercent();
				setResult(scrollTop);
			}, 400),
		[],
	);

	useEffect(() => {
		if (isBrowser()) {
			setResult(getScrollPercent());
			window.addEventListener('scroll', onScroll);
			return () => {
				onScroll.cancel();
				window.removeEventListener('scroll', onScroll);
			};
		}
	}, [onScroll]);

	return result > threshold;
}
