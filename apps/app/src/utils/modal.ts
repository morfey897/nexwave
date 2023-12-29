import { EnumSearchParams } from '@/types/search';
import { encode, decode } from 'js-base64';

const getModalName = (name: string) => `${EnumSearchParams.DIALOG}${name}`;

export const pureModalName = (name: string) =>
	name.replace(EnumSearchParams.DIALOG, '');

export const encodeParams = (params: any | null | undefined) => {
	let str = '';
	try {
		str = JSON.stringify(typeof params === 'object' ? params : null);
	} catch (e) {
		console.log('ERROR', e);
	}
	return encode(str);
};

export const decodeParams = (str: string | null | undefined) => {
	try {
		return !str ? null : JSON.parse(decode(str));
	} catch (e) {}
	return null;
};

export const hasModal = (name: string, base?: URLSearchParams) => {
	const clone = new URLSearchParams(base);
	return clone.has(`${getModalName(name)}`);
};

export const getModalParams = (name: string, base?: URLSearchParams) => {
	const clone = new URLSearchParams(base);
	const params = clone.get(`${getModalName(name)}`);
	return decodeParams(params);
};

export const openModal = (
	name: string,
	props?: any,
	base?: URLSearchParams,
) => {
	const clone = new URLSearchParams(base);
	clone.set(`${getModalName(name)}`, encodeParams(props));
	return `?${clone.toString()}`;
};

export const closeModal = (name: string, base?: URLSearchParams) => {
	const clone = new URLSearchParams(base);
	clone.delete(`${getModalName(name)}`);
	return `?${clone.toString()}`;
};

export const closeAllModal = (base?: URLSearchParams) => {
	const clone = new URLSearchParams(base);
	for (const [key] of clone.entries()) {
		if (key.startsWith(EnumSearchParams.DIALOG)) {
			clone.delete(key);
		}
	}
	return `?${clone.toString()}`;
};
