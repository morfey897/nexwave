import { StateEnum } from '@nw/storage';
import { IProject } from '~/types';
import { ROLES } from '~/constants/crud';
import { EnumRole, EnumColor, EnumCurrency } from '~/constants/enums';

export const MOCKED_PROJECT: IProject = {
	id: 1,
	uuid: '00000000-0000-0000-0000-000000000000',
	role: EnumRole.owner,
	permission: ROLES.owner,
	roles: ROLES,
	name: 'Test project long name',
	color: EnumColor.BLUE,
	info: 'Test project info text here maybe some long text',
	currency: EnumCurrency.UAH,
	state: StateEnum.Active,
	image: null,
	timezone: 'Europe/Kiev',
	langs: ['en', 'uk'],
	createdAt: new Date(),
	updatedAt: new Date(),
};
