import { EnumDeviceType } from '@/enums';

export type TGenerator<T> = React.FC<
	{
		item: T;
	} & {
		device?: EnumDeviceType;
	}
>;