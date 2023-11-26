import { INode } from './calendar';

export enum EnumFilter {
	ALL = 'all',
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

export interface IEvent extends INode {
	title: string;
	description?: string;
}
