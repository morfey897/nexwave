'use client';
import { LoginView } from '@/views/Modal/Login';
import { useRouter } from 'next/navigation';
function Auth() {
	const route = useRouter();
	return (
		<LoginView
			onConfirm={() => {
				route.refresh();
			}}
			onDismiss={() => {}}
			name=''
			params={null}
		/>
	);
}

export default Auth;