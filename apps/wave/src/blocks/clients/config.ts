import { IHeadProps } from '~/components/table';
import { EnumDeviceType } from '~/constants/enums';
import {
	BADGES,
	LAST_VISIT,
	NAME,
	SEASON_TICKETS,
	ACTIONS,
} from '~/constants/keys';

export const headerData: IHeadProps[] = [
	{
		key: NAME,
	},
	{
		key: BADGES,
		device: EnumDeviceType.TABLET,
	},
	{
		key: SEASON_TICKETS,
		device: EnumDeviceType.TABLET,
	},
	{
		key: LAST_VISIT,
		device: EnumDeviceType.TABLET,
	},
	{
		key: ACTIONS,
	},
];

export const headerOptions: Array<{
	key: string;
	title?: string;
	checked?: boolean;
}> = [
	{ key: NAME, checked: true },
	{ key: BADGES },
	{ key: SEASON_TICKETS },
	{ key: LAST_VISIT },
	{ key: ACTIONS, checked: true },
];
