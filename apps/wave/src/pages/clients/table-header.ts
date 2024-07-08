import { IHeadProps } from '~/components/table';
import { EnumDeviceType } from '~/constants/enums';
import {
	BADGES,
	LAST_VISIT,
	NAME,
	SEASON_TICKETS,
	ACTIONS,
} from '~/constants/keys';

const header: IHeadProps[] = [
	{
		title: undefined,
		key: NAME,
	},
	{
		title: undefined,
		key: BADGES,
		device: EnumDeviceType.TABLET,
	},
	{
		title: undefined,
		key: SEASON_TICKETS,
		device: EnumDeviceType.TABLET,
	},
	{
		title: undefined,
		key: LAST_VISIT,
		device: EnumDeviceType.TABLET,
	},
	{
		title: undefined,
		key: ACTIONS,
	},
];

export default header;
