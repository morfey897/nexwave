export type TWrapperProps = {
	wrapperClassName?: string;
};

export type TBadgeProps = {
	count: string | number | undefined;
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
