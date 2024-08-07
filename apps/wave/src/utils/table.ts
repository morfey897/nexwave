import { EnumSortBy } from '~/constants/enums';

export const hasType = (type: EnumSortBy | EnumSortBy[], input: EnumSortBy) =>
	type === input || (Array.isArray(type) && type.includes(input));
