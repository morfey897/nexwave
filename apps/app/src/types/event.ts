import { INode } from './calendar';
import { TGenerator } from './view';

export enum EnumFilter {
	ALL = 'all',
	ACTIVE = 'active',
	INACTIVE = 'inactive',
}

export interface IEvent extends INode {
	title: string;
	description?: string;
}
