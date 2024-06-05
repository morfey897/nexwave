type ThrottleFunction<T extends (...args: unknown[]) => void> = {
	(...args: Parameters<T>): void;
	cancel: () => void;
};

/**
 * Throttle function
 * @param func
 * @param wait
 * @returns
 */
const throttle = <T extends (...args: unknown[]) => void>(
	func: T,
	wait: number
): ThrottleFunction<T> => {
	let timeout: NodeJS.Timeout | null;

	const throttled: ThrottleFunction<T> = (...args) => {
		if (!timeout) {
			timeout = setTimeout(() => {
				func(...args);
				timeout = null;
			}, wait);
		} else {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				func(...args);
				timeout = null;
			}, wait);
		}
	};

	throttled.cancel = () => {
		clearTimeout(timeout!);
		timeout = null;
	};

	return throttled;
};

export default throttle;
