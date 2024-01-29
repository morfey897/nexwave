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
				'flex flex-col items-center max-w-sm mx-auto text-center',
				className,
			)}
			{...props}
		>
			<p className='p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800'>
				<FaUserLock size={32} />
			</p>
			<h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
				{t('page.access_denied.headline')}
			</h1>
			<p className='mt-4 text-gray-500 dark:text-gray-400'>
				{t('page.access_denied.subheadline')}
			</p>

			<div className='w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
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
