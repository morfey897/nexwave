import * as Tabs from '@radix-ui/react-tabs';
import clsx from 'clsx';

export const Content = ({
	className,
	...props
}: Parameters<typeof Tabs.Content>[0]) => (
	<Tabs.Content
		className={clsx(
			'hide-scroll mt-5 overflow-y-auto pb-20 outline-none',
			className
		)}
		{...props}
	/>
);

export const List = ({
	className,
	classNameLayout,
	...props
}: Parameters<typeof Tabs.List>[0] & {
	classNameLayout?: string;
}) => (
	<div className={clsx('bg-secondary z-10', classNameLayout)}>
		<Tabs.List
			className={clsx(
				'flex w-full flex-col md:w-[621px] md:flex-row',
				className
			)}
			{...props}
		/>
	</div>
);

export const Trigger = ({
	className,
	...props
}: Parameters<typeof Tabs.Trigger>[0]) => (
	<Tabs.Trigger
		className={clsx(
			'text-primary-text-gray data-[state=active]:text-blue-1 border-user-selected flex h-[45px] flex-1 select-none items-center justify-center px-5 text-[16px] font-semibold leading-6 outline-none data-[state=active]:border-b-2',
			className
		)}
		{...props}
	/>
);

export const Root = ({
	className,
	...rest
}: Parameters<typeof Tabs.Root>[0]) => (
	<Tabs.Root
		className={clsx('flex h-full w-full flex-col', className)}
		{...rest}
	/>
);
