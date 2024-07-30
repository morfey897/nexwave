import * as Toggle from '@radix-ui/react-toggle';
import clsx from 'clsx';

function ToggleView({ className, ...rest }: Parameters<typeof Toggle.Root>[0]) {
	return (
		<Toggle.Root
			{...rest}
			aria-label={rest['aria-label'] || 'View/edit mode'}
			className={clsx(
				'rounded-lg px-2 py-1.5',
				'hover:outline-user-selected outline-1 hover:outline',
				'data-[state=on]:bg-gray-2 dark:data-[state=on]:bg-gray-700',
				className
			)}
		/>
	);
}

export default ToggleView;
