import { INode } from './calendar';

export interface IEvent extends INode {
	title: string;
	description?: string;
}
