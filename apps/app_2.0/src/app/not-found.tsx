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
		<section className='w-full bg-white dark:bg-gray-900'>
			<div className='container mx-auto flex min-h-screen items-center justify-center px-6 py-12'>
				<div className='w-full '>
					<div className='mx-auto flex max-w-lg flex-col items-center text-center'>
						<p className='text-4xl font-medium text-blue-500 dark:text-blue-400'>
							404
						</p>
						<h1 className='text-gray-8 mt-3 text-2xl font-semibold md:text-3xl'>
							{t('page.not_found.headline')}
						</h1>
						<p className='text-gray-5 mt-4'>
							{t('page.not_found.subheadline')}
						</p>

						<div className='mt-6 flex w-full shrink-0 items-center gap-x-3 sm:w-auto'>
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
