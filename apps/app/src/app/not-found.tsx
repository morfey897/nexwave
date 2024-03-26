import { HiOutlineArrowLongLeft } from 'react-icons/hi2';
import Button from '@/components/Button';
import { APP } from '@/routes';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getLocale } from '@/headers';

export default function Page() {
	const locale = getLocale();
	unstable_setRequestLocale(locale);
	const t = useTranslations();

	return (
		<section className='bg-white dark:bg-gray-900 w-full'>
			<div className='container flex items-center justify-center min-h-screen px-6 py-12 mx-auto'>
				<div className='w-full '>
					<div className='flex flex-col items-center max-w-lg mx-auto text-center'>
						<p className='text-4xl font-medium text-blue-500 dark:text-blue-400'>
							404
						</p>
						<h1 className='mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl'>
							{t('page.not_found.headline')}
						</h1>
						<p className='mt-4 text-gray-500 dark:text-gray-400'>
							{t('page.not_found.subheadline')}
						</p>

						<div className='flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
							<Button
								message={t('button.go_back')}
								icon={<HiOutlineArrowLongLeft size={24} />}
							/>

							<Button<React.AnchorHTMLAttributes<HTMLAnchorElement>>
								href={APP}
								tag='link'
								variant='primary'
								message={t('button.go_home')}
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
