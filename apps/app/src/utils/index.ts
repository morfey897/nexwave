import { humanId } from 'human-id';
import { EnumColor } from '@/enums';

export const addZiro = (str: string | number) => `0${str}`.slice(-2);

export function isNotNull<T>(key: string) {
	return (item: any): item is T => item[key] !== null;
}

export function dynamicHref(href: string, params: Record<string, string>) {
	return Object.entries(params).reduce(
		(acc, [key, value]) => acc.replace(`[${key}]`, value),
		href,
	);
}

export function findDynamicPath(pathname: string, dynamicPaths: string[]) {
	return dynamicPaths.find((path) => {
		const regex = new RegExp(`^${path.replace(/\[.*?\]/g, '.*')}$`);
		return regex.test(pathname);
	});
}

export const abbrev = (
	pairs: Array<Array<string | undefined | null> | undefined | null>,
) => {
	const [first, last] =
		pairs.find((list) => !!list && !!list[0] && !!list[1]) ||
		Math.random().toString(36).substring(2, 2);
	return `${!!first ? first[0] : ''}${!!last ? last[0] : ''}`.toUpperCase();
};

export const fullname = (
	user:
		| {
				name?: string | null;
				surname?: string | null;
		  }
		| null
		| undefined,
) => [user?.name, user?.surname].filter((v) => !!v).join(' ');

export const random = <T>(array: Array<T>) =>
	array[Math.floor(Math.random() * array.length)];

export function generateName() {
	return humanId({
		separator: ' ',
		capitalize: true,
	});
}

export function generateColor() {
	return random<EnumColor>(Object.values(EnumColor));
}


export function getError(error: any) {
	return {
		code: String(error?.code || error?.cause?.code || 'unknown'),
		message: String(error.message || ''),
	};
}
