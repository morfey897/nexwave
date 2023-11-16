import { TSort } from '@/types/table';

export const hasType = (type: TSort | TSort[], input: TSort) =>
	type === input || (Array.isArray(type) && type.includes(input));
