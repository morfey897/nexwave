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
		<section className='bg-white dark:bg-gray-900 mx-auto w-full'>
			<div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
				<div className='flex flex-col items-center max-w-sm mx-auto text-center'>
					<p className='p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50 dark:bg-gray-800'>
						<BiSolidErrorAlt size={32} />
					</p>
					<h1 className='mt-3 text-2xl font-semibold text-gray-8 md:text-3xl'>
						{t('headline')}
					</h1>
					<p className='mt-4 text-gray-6'>
						{t('subheadline')}
					</p>

					<div className='w-full mt-6 gap-x-3 shrink-0 sm:w-auto'>
						<Button variant='primary' onClick={reset} message={t('cta')} />
					</div>
				</div>
			</div>
		</section>
	);
}

export default ErrorComponent;
