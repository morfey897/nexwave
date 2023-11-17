import { TWrapperProps } from '@/types/view';
import clsx from 'clsx';
import { ReactNode } from 'react';

function DropDown({
	element,
	direction,
	children,
	className,
	wrapperClassName,
}: {
	element: ReactNode;
	direction: { y: 'top' | 'bottom'; x?: 'left' | 'right' };
} & TWrapperProps &
	React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div className={clsx('group relative', wrapperClassName)}>
			{element}
			<div
				className={clsx(
					'absolute z-10 flex-col rounded-md shadow-xl overflow-hidden bg-white dark:bg-gray-800',
					'max-h-0',
					'transition-all ease-in-out duration-300',
					'group-hover:max-h-[100vh]',
					{
						'origin-bottom-left':
							direction.y === 'top' && direction.x === 'right',
						'origin-top-left':
							direction.y === 'bottom' && direction.x !== 'left',
						'origin-bottom-right':
							direction.y === 'top' && direction.x === 'left',
						'origin-top-right':
							direction.y === 'bottom' && direction.x === 'left',
					},
					{
						'top-0': direction.y === 'top',
						'top-full': direction.y === 'bottom',
						'left-1/2': direction.x === 'right',
						'right-1/2': direction.x === 'left',
						'-translate-y-[100%]': direction.y === 'top',
						'translate-y-0': direction.y === 'bottom',
					},
					className,
				)}
			>
				{children}
			</div>
		</div>
	);
}

export default DropDown;
