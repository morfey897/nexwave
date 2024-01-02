import { encode, decode } from 'js-base64';

const PREFIX = 'dlg';
export const getModalName = (name: string) => `${PREFIX}${name}`;
export const pureModalName = (name: string) =>
	name.startsWith(PREFIX) ? name.replace(PREFIX, '') : name;
export const isModalByName = (name: string) => name.startsWith(PREFIX);

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

export const openModal = (
	name: string,
	props: Record<string, string | boolean | number> | null = null,
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
