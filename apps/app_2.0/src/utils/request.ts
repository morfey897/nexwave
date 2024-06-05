export function getString(
	data: FormData | URLSearchParams,
	key: string,
): string | undefined;
export function getString(
	data: FormData | URLSearchParams,
	key: string,
	defaultValue: string,
): string;
export function getString(
	data: FormData | URLSearchParams,
	key: string,
	defaultValue?: string,
) {
	return data.get(key)?.toString() || defaultValue;
}

export function getNumber(
	data: FormData | URLSearchParams,
	key: string,
	defaultNumber?: number,
): number {
	const value = data.get(key)?.toString();
	const number = Number.parseInt(value || '');
	if (typeof defaultNumber === 'number' && Number.isNaN(number))
		return defaultNumber;
	return number;
}

export const getBoolean = (data: FormData | URLSearchParams, key: string) => {
	const value = (data.get(key)?.toString() || '').toLowerCase();
	return value === 'on' || value === 'true' || value === '1' || value === 'yes';
};
