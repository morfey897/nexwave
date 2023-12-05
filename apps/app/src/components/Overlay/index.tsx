import clsx from 'clsx';
import { forwardRef } from 'react';

type TBlur = 'none' | 'sm' | 'md' | 'lg' | 'xl' | true;

const Overlay = forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & { blur?: TBlur }
>(function Component({ children, className, blur, ...props }, ref) {
	return (
		<div
			ref={ref}
			className={clsx(
				'inset-0 fixed bg-transparent',
				{
					'backdrop-blur-sm': blur === 'sm',
					'backdrop-blur-md': blur === 'md',
					'backdrop-blur': blur === true,
					'backdrop-blur-lg': blur === 'lg',
					'backdrop-blur-xl': blur === 'xl',
					'backdrop-blur-none': blur === 'none',
				},
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
});

export default Overlay;
