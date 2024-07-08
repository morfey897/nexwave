type FlattenObject<T> = {
	[K in keyof T]: T[K] extends object ? FlattenObject<T[K]> : T[K];
};

export function flatten<T extends Record<string, unknown>>(
	obj: T,
	prefix = ''
): FlattenObject<T> {
	const result: FlattenObject<T> = {} as FlattenObject<T>;

	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const propName = prefix ? `${prefix}.${key}` : key;
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				Object.assign(
					result,
					flatten(obj[key] as unknown as Record<string, unknown>, propName)
				);
			} else {
				(result as Record<string, unknown>)[propName] = obj[key];
			}
		}
	}

	return result;
}

export function unflatten<T extends Record<string, unknown>>(
	obj: FlattenObject<T>
): T {
	const result = {} as T;

	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const keys = key.split('.');
			let current: unknown = result;

			for (let i = 0; i < keys.length; i++) {
				const prop = keys[i];
				if (!(current as Record<string, unknown>)[prop]) {
					(current as Record<string, unknown>)[prop] = {} as T;
				}
				if (i === keys.length - 1) {
					(current as Record<string, unknown>)[prop] = obj[key];
				}
				current = (current as Record<string, unknown>)[prop];
			}
		}
	}

	return result;
}
