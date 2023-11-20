export type TWrapperProps = {
	wrapperClassName?: string;
};

export type TBadgeProps = {
	count: string | number | undefined;
};

export enum EnumDevice {
	MOBILE = 'mobile',
	DESKTOP = 'desktop',
	TABLET = 'tablet',
}

export type TDeviceProps = {
	device?: EnumDevice;
};

type Union = string | number | undefined;

export type TMessage = {
	message?: Union;
};

export type TMessages = {
	messages?: Record<string, Union>;
};

export interface IButtonProps extends TMessage {
	variant?: 'primary' | 'default';
	icon?: React.ReactNode;
	iconAfter?: React.ReactNode;
}
