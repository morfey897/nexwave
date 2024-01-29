import clsx from 'clsx';

function FieldSet({
	className,
	children,
	legend,
	...props
}: {
	legend?: React.ReactNode;
} & React.FieldsetHTMLAttributes<HTMLFieldSetElement>) {
	return (
		<fieldset
			className={clsx('border rounded-lg dark:border-gray-600 p-4', className)}
			{...props}
		>
			<legend className='text-gray-400 dark:text-gray-500 px-1 text-xs'>
				{legend}
			</legend>
			{children}
		</fieldset>
	);
}

export default FieldSet;
