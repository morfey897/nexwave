import { EnumSort } from '@/types/table';

export const hasType = (type: EnumSort | EnumSort[], input: EnumSort) =>
	type === input || (Array.isArray(type) && type.includes(input));
