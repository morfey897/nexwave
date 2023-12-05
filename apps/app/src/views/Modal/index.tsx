'use client';
import * as modals from '@/constants/modals';
import LoginView, { TLoginProps } from '@/views/Modal/Login';
import withModal from '@/components/Modal/HOC';
import ModalProvider from '@/providers/ModalProvider';

function Container() {
	return (
		<ModalProvider>
			{(name: string) => {
				let Component;
				switch (name) {
					case modals.LOGIN:
						Component = withModal<TLoginProps>(LoginView, name);
						break;
				}
				return !!Component ? <Component /> : null;
			}}
		</ModalProvider>
	);
}

export default Container;
