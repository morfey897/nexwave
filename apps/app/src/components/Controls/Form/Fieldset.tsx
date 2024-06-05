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
			className={clsx('rounded-lg border p-4 dark:border-gray-600', className)}
			{...props}
		>
			{!!legend && (
				<legend className='px-1 text-xs text-gray-400 dark:text-gray-500'>
					{legend}
				</legend>
			)}
			{children}
		</fieldset>
	);
}

export default FieldSet;
