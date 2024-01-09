import React from 'react';
import clsx from 'clsx';
import { MdAdd } from 'react-icons/md';

function AddProject({
	className,
	...props
}: React.HTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			className={clsx(
				'bg-white dark:bg-gray-800',
				'group flex justify-center items-center p-8 border-2 border-blue-400 dark:border-blue-300 rounded-xl hover:shadow-lg hover:shadow-slate-800/10 dark:hover:shadow-slate-300/10',
				className,
			)}
			{...props}
		>
			<span
				className={clsx(
					'inline-block rounded-full p-2',
					'bg-blue-100 text-blue-500 dark:bg-blue-500 dark:text-white',
					'transition-all duration-300 ease-linear',
					'group-hover:text-green-300 dark:group-hover:text-green-300',
				)}
			>
				<MdAdd size={48} />
			</span>
		</button>
	);
}

export default AddProject;
