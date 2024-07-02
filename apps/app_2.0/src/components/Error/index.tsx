'use client'; // Error components must be Client Components
import { BiSolidErrorAlt } from 'react-icons/bi';
import Button from '@/components/Button';
import { LOCALES } from '@nw/config';
import { useMessages } from '@/hooks/i18n';

const MESSAGES = {
	[LOCALES.EN]: {
		headline: 'Oops! Something went wrong.',
		subheadline:
			"We did our best, but we couldn't avoid making a mistake. Let's try again.",
		cta: 'Try again',
	},
	[LOCALES.RU]: {
		headline: 'Упс! Что-то пошло не так.',
		subheadline:
			'Мы сделали все возможное, но не смогли избежать ошибки. Попробуем еще раз.',
		cta: 'Попробовать снова',
	},
	[LOCALES.UK]: {
		headline: 'Упс! Щось пішло не так.',
		subheadline:
			'Ми зробили все можливе, але не змогли уникнути помилки. Спробуємо ще раз.',
		cta: 'Спробувати знову',
	},
};

function ErrorComponent({ reset }: { reset: () => void }) {
	const t = useMessages(MESSAGES);

	return (
		<section className='mx-auto w-full bg-white dark:bg-gray-900'>
			<div className='container mx-auto flex min-h-screen items-center px-6 py-12'>
				<div className='mx-auto flex max-w-sm flex-col items-center text-center'>
					<p className='rounded-full bg-blue-50 p-3 text-sm font-medium text-blue-500 dark:bg-gray-800'>
						<BiSolidErrorAlt size={32} />
					</p>
					<h1 className='text-gray-8 mt-3 text-2xl font-semibold md:text-3xl'>
						{t('headline')}
					</h1>
					<p className='text-gray-6 mt-4'>{t('subheadline')}</p>

					<div className='mt-6 w-full shrink-0 gap-x-3 sm:w-auto'>
						<Button variant='primary' onClick={reset} message={t('cta')} />
					</div>
				</div>
			</div>
		</section>
	);
}

export default ErrorComponent;
