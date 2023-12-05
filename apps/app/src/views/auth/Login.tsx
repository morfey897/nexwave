'use client';
import LoginView from '@/views/Modal/Login';
import { useRouter } from 'next/navigation';
import { HOME } from '@/constants/routes';

function Auth({ uid }: { uid?: string | null }) {
	const route = useRouter();
	return (
		<LoginView
			onConfirm={() => {
				route.refresh();
			}}
			onDismiss={() => {
				route.push(HOME);
			}}
			name=''
			params={!!uid ? null : { mode: 'new' }}
		/>
	);
}

export default Auth;
