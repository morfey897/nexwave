import { IoIosWarning } from 'react-icons/io';
import { useTranslations } from 'next-intl';
import ErrorLayout from '~/components/errors/ErrorLayout';

export default function Page() {
	const t = useTranslations();

	return (
		<ErrorLayout
			icon={<IoIosWarning className='h-12 w-12 text-yellow-500' />}
			title='Bad request'
			description='The size of the request headers is too long.'
			instructions={[
				'Clear your cache and refresh the page.',
				'If you were downloading a large file and saw this message, try downloading a smaller file.',
			]}
		/>
		// <section className='w-full bg-white dark:bg-gray-900'>
		// 	<div className='container mx-auto flex min-h-screen items-center justify-center px-6 py-12'>
		// 		<div className='w-full '>
		// 			<div className='mx-auto flex max-w-lg flex-col items-center text-center'>
		// 				<p className='text-4xl font-medium text-blue-500 dark:text-blue-400'>
		// 					404
		// 				</p>
		// 				<h1 className='mt-3 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white'>
		// 					{t('page.not_found.headline')}
		// 				</h1>
		// 				<p className='mt-4 text-gray-500 dark:text-gray-400'>
		// 					{t('page.not_found.subheadline')}
		// 				</p>

		// 				<div className='mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto'>
		// 					<Button
		// 						message={t('button.go_back')}
		// 						icon={<HiOutlineArrowLongLeft size={24} />}
		// 					/>

		// 					<Link
		// 						href={EnumProtectedRoutes.APP}
		// 						variant='primary'
		// 						message={t('button.go_home')}
		// 					/>
		// 				</div>
		// 			</div>
		// 		</div>
		// 	</div>
		// </section>
	);
}
