type DebounceFunction<T extends (...args: unknown[]) => void> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

/**
 * Debounce function
 * @param func
 * @param wait
 * @returns
 */
const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  wait: number,
): DebounceFunction<T> => {
  let timeoutId: NodeJS.Timeout | null;

  const debounced: DebounceFunction<T> = (...args: Parameters<T>) => {
    const later = () => {
      timeoutId = null;
      func(...args);
    };

    const callNow = !timeoutId;

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(later, wait);

    if (callNow) {
      func(...args);
    }
  };

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced;
};

export default debounce;
