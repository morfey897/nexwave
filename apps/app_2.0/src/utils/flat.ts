type FlattenObject<T> = {
	[K in keyof T]: T[K] extends object ? FlattenObject<T[K]> : T[K];
};

export function flatten<T extends Record<string, any>>(
	obj: T,
	prefix = '',
): FlattenObject<T> {
	const result: FlattenObject<T> = {} as FlattenObject<T>;

	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const propName = prefix ? `${prefix}.${key}` : key;
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				Object.assign(result, flatten(obj[key], propName));
			} else {
				(result as Record<string, any>)[propName] = obj[key];
			}
		}
	}

	return result;
}

export function unflatten<T extends Record<string, any>>(
	obj: FlattenObject<T>,
): T {
	const result = {} as T;

	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const keys = key.split('.');
			let current = result;

			for (let i = 0; i < keys.length; i++) {
				const prop = keys[i];
				if (!current[prop]) {
					(current as Record<string, any>)[prop] = {} as T;
				}
				if (i === keys.length - 1) {
					(current as Record<string, any>)[prop] = obj[key];
				}
				current = current[prop];
			}
		}
	}

	return result;
}
