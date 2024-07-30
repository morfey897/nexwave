import React from 'react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { FaUserLock } from 'react-icons/fa';
import Button from '~/components/controls/Button';
import { EnumProtectedRoutes } from '~/constants/enums';

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
				<Button.Link
					href={EnumProtectedRoutes.APP}
					message={t('button.try_again')}
				/>
			</div>
		</div>
	);
}

export default AccessDenied;
