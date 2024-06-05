import clsx from 'clsx';
import { type IInputProps } from '../BaseInput';

function Placeholder({
	icon,
	hidePlaceholder,
	placeholder,
	required,
	className,
}: React.HTMLAttributes<HTMLLabelElement> & IInputProps) {
	return !!required || !!placeholder ? (
		<label
			className={clsx(
				'label',
				'pointer-events-none absolute top-4 px-1',
				!!icon ? 'ml-12' : 'ml-4',
				// !!icon ? `w-[calc(100%-4.6rem)]` : `w-[calc(100%-2.6rem)]`,
				'text-gray-600 dark:text-gray-500',
				'bg-white dark:bg-gray-900',
				'transform transition-all',
				'rounded-t',
				hidePlaceholder
					? 'peer-focus:!opacity-0'
					: 'peer-focus:!-top-2 peer-focus:!ml-4 peer-focus:!w-fit peer-focus:!text-xs',
				hidePlaceholder
					? 'peer-[&:not(:placeholder-shown)]:!opacity-0'
					: 'peer-[&:not(:placeholder-shown)]:!-top-2 peer-[&:not(:placeholder-shown)]:!ml-4 peer-[&:not(:placeholder-shown)]:!w-fit peer-[&:not(:placeholder-shown)]:!text-xs',
				className
			)}
		>
			{required ? (
				<>
					{`${placeholder || 'Required'}`}
					<span className='ml-1 mt-1 text-red-400'>*</span>
				</>
			) : (
				placeholder
			)}
		</label>
	) : null;
}

export default Placeholder;
