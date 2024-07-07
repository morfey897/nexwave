import { IHeadProps } from '~/components/table';
import { EnumDeviceType } from '~/constants/enums';
import { BADGES, NAME, ACCESS, ACTIONS, SCHEDULE } from '~/constants/keys';

const header: IHeadProps[] = [
	{
		title: undefined,
		key: NAME,
	},
	{
		title: undefined,
		key: ACCESS,
		device: EnumDeviceType.TABLET,
	},
	{
		title: undefined,
		key: BADGES,
		device: EnumDeviceType.TABLET,
	},

	{
		title: undefined,
		key: SCHEDULE,
		device: EnumDeviceType.TABLET,
	},
	{
		title: undefined,
		key: ACTIONS,
	},
];

export default header;
