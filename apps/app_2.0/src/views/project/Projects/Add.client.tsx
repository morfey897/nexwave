'use client';
import { useOpenModal } from '@nw/modal';
import { useCallback } from 'react';
import { MODALS } from '@/routes';
import { MdAdd } from 'react-icons/md';
import clsx from 'clsx';

function AddProject() {
	const openModal = useOpenModal();
	const onAddProject = useCallback(() => {
		openModal(MODALS.CREATE_PROJECT);
	}, [openModal]);

	return (
		<button
			className={clsx(
				'bg-white dark:bg-gray-800',
				'group flex items-center justify-center rounded-xl border-2 border-blue-400 p-8 hover:shadow-lg hover:shadow-slate-800/10 dark:border-blue-300 dark:hover:shadow-slate-300/10'
			)}
			onClick={onAddProject}
		>
			<span
				className={clsx(
					'inline-block rounded-full p-2',
					'bg-blue-100 text-blue-500 dark:bg-blue-500 dark:text-white',
					'transition-all duration-300 ease-linear',
					'group-hover:text-green-300 dark:group-hover:text-green-300'
				)}
			>
				<MdAdd size={48} />
			</span>
		</button>
	);
}

export default AddProject;
