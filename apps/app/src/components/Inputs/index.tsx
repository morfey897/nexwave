import clsx from 'clsx';
import { HiOutlineSearch } from 'react-icons/hi';
import { TWrapperProps } from '@/types/view';

export function Search({
	wrapperClassName,
	className,
	type,
	...props
}: TWrapperProps & React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<div className={clsx('relative text-base', wrapperClassName)}>
			<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
				<HiOutlineSearch size={16} />
			</span>

			<input
				className={clsx(
					'w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300',
					className,
				)}
				type={type || 'text'}
				{...props}
			/>
		</div>
	);
}
