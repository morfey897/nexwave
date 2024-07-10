import { ErrorLayoutProps } from '~/types';
import Button from '../buttons/Button';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

const ErrorLayout: React.FC<ErrorLayoutProps> = ({
	icon,
	title,
	description,
	instructions,
	showForgotPassword,
}) => {
	const t = useTranslations();

	return (
		<div className='flex min-h-screen flex-col items-center justify-center'>
			<div className='border-gray-3 bg-secondary m-2 rounded-lg border p-6 shadow-md'>
				<div className='flex flex-col items-center'>
					<div className='mb-4'>{icon}</div>
					<h1 className='mb-2 text-2xl font-semibold'>{title}</h1>
					<p className='mb-4'>{description}</p>
					<h2 className='text-blue-1 mb-2 w-full text-left'>
						{t('error.advice')}
					</h2>
					<ol className='list-inside list-decimal'>
						{instructions.map((instruction, index) => (
							<li key={index}>{instruction}</li>
						))}
					</ol>
					<div
						className={clsx('mb-4 w-full text-left', {
							hidden: !showForgotPassword,
						})}
					>
						<a
							href='#'
							className='mb-2 w-full text-left text-blue-500 hover:text-blue-600'
						>
							{t('error.forgot_password')}
						</a>
					</div>
					<div className='mt-4 flex flex-row space-x-4'>
						<div>
							<Button message={t('button.home_page')} variant='primary' />
						</div>
						<div>
							<Button message={t('button.contact_us')} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ErrorLayout;
