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
				'group flex justify-center items-center p-8 border-2 border-blue-400 dark:border-blue-300 rounded-xl hover:shadow-lg hover:shadow-slate-800/10 dark:hover:shadow-slate-300/10',
				className,
			)}
			{...props}
		>
			<span className='inline-block rounded-full p-2 bg-blue-100 text-blue-500 dark:bg-blue-500 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-100'>
				<MdAdd size={48} />
			</span>
		</button>
	);
}

export default AddProject;
