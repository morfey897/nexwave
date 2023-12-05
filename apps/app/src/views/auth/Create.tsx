'use client';
import { LoginView } from '@/views/Modal/Login';
import { useRouter, usePathname } from 'next/navigation';
function Create() {
	const route = useRouter();
	const pathname = usePathname();
	return (
		<LoginView
			onConfirm={() => {
				route.refresh();
			}}
			onDismiss={() => {}}
			name=''
			params={{ mode: 'new' }}
		/>
	);
}

export default Create;
