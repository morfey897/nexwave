'use client';
import LoginView, { TLoginProps } from '@/views/Modal/Login';
import { useRouter } from 'next/navigation';
import { HOME } from '@/routes';
import Overlay from '@/components/Overlay';
import { useTranslations } from 'next-intl';

function Auth({ params }: { params: TLoginProps }) {
	const route = useRouter();
	const t = useTranslations('auth_page');
	return (
		<Overlay blur='sm' className='bg-gray-100/20 dark:bg-black/60 z-50'>
			<div className='mt-[100px]'>
				<LoginView
					headline={t('headline')}
					subheadline={t('subheadline')}
					onConfirm={() => {
						route.refresh();
					}}
					onDismiss={() => {
						route.push(HOME);
					}}
					name=''
					params={params}
				/>
			</div>
		</Overlay>
	);
}

export default Auth;
