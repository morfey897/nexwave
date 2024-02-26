import clsx from 'clsx';
import { InputProps } from '../utils';

const getPlaceholder = (
	placeholder: string | undefined,
	required?: boolean,
) => {
	if (!!required) return `${placeholder || 'Required'} *`;
	return placeholder;
};

function Placeholder({
	icon,
	hidePlaceholder,
	placeholder,
	required,
	className,
}: React.HTMLAttributes<HTMLLabelElement> & InputProps) {
	return !!required || !!placeholder ? (
		<label
			className={clsx(
				'label',
				'absolute top-4 px-1 pointer-events-none',
				!!icon ? 'ml-12' : 'ml-4',
				// !!icon ? `w-[calc(100%-4.6rem)]` : `w-[calc(100%-2.6rem)]`,
				'text-gray-600 dark:text-gray-500',
				'bg-white dark:bg-gray-900',
				'transform transition-all',
				'rounded-t',
				hidePlaceholder
					? 'peer-focus:!opacity-0'
					: 'peer-focus:!-top-2 peer-focus:!text-xs peer-focus:!ml-4 peer-focus:!w-fit',
				hidePlaceholder
					? 'peer-[&:not(:placeholder-shown)]:!opacity-0'
					: 'peer-[&:not(:placeholder-shown)]:!-top-2 peer-[&:not(:placeholder-shown)]:!text-xs peer-[&:not(:placeholder-shown)]:!ml-4 peer-[&:not(:placeholder-shown)]:!w-fit',
				className,
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
