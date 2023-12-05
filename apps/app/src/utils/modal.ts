import { EnumSearchParams } from '@/types/search';
import { encode, decode } from 'js-base64';

const getName = (name: string) => `${EnumSearchParams.MODAL}${name}`;

export const pureName = (name: string) =>
	name.replace(EnumSearchParams.MODAL, '');

export const encodeModalParams = (params: any | null | undefined) => {
	let str = '';
	try {
		str = JSON.stringify(typeof params === 'object' ? params : null);
	} catch (e) {
		console.log('ERROR', e);
	}
	return encode(str);
};

export const decodeModalParams = (str: string | null | undefined) => {
	try {
		return !str ? null : JSON.parse(decode(str));
	} catch (e) {}
	return null;
};

export const hasModal = (name: string, base?: URLSearchParams) => {
	const clone = new URLSearchParams(base);
	return clone.has(`${getName(name)}`);
};

export const getModalParams = (name: string, base?: URLSearchParams) => {
	const clone = new URLSearchParams(base);
	const params = clone.get(`${getName(name)}`);
	return decodeModalParams(params);
};

export const openModal = (
	name: string,
	props?: any,
	base?: URLSearchParams,
) => {
	const clone = new URLSearchParams(base);
	clone.set(`${getName(name)}`, encodeModalParams(props));
	return `?${clone.toString()}`;
};

export const closeModal = (name: string, base?: URLSearchParams) => {
	const clone = new URLSearchParams(base);
	clone.delete(`${getName(name)}`);
	return `?${clone.toString()}`;
};

export const closeAllModal = (base?: URLSearchParams) => {
	const clone = new URLSearchParams(base);
	for (const [key] of clone.entries()) {
		if (key.startsWith(EnumSearchParams.MODAL)) {
			clone.delete(key);
		}
	}
	return `?${clone.toString()}`;
};
