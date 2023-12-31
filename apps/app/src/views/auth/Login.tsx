'use client';
import LoginView from '@/views/Modal/Login';
import { useRouter } from 'next/navigation';
import { HOME } from '@/routes';
import Overlay from '@/components/Overlay';
import { useTranslations } from 'next-intl';

function Auth({ uid }: { uid?: string | null }) {
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
					params={!!uid ? null : { mode: 'new' }}
				/>
			</div>
		</Overlay>
	);
}

export default Auth;
