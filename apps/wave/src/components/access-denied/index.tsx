import React from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { FaUserLock } from 'react-icons/fa';

function AccessDenied({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const t = useTranslations();
	return (
		<div
			className={clsx(
				'mx-auto flex max-w-sm flex-col items-center text-center',
				className
			)}
			{...props}
		>
			<p className='rounded-full bg-blue-50 p-3 text-sm font-medium text-blue-500 dark:bg-gray-800'>
				<FaUserLock size={32} />
			</p>
			<h2 className='mt-3 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white'>
				{t('page.access_denied.headline')}
			</h2>
			<p className='mt-4 text-gray-500 dark:text-gray-400'>
				{t('page.access_denied.subheadline')}
			</p>

			<div className='mt-6 w-full shrink-0 gap-x-3 sm:w-auto'>
				{/* <button
					onClick={reset}
					className='w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600'
				>
					{t('button.try_again')}
				</button> */}
			</div>
		</div>
	);
}

export default AccessDenied;
