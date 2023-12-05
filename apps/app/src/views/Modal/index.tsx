'use client';
import {MODALS} from '@/routes';
import LoginView, { TLoginProps } from '@/views/Modal/Login';
import withModal from '@/providers/modal/withModal';
import ModalProvider from '@/providers/modal/provider';

function Container() {
	return (
		<ModalProvider>
			{(name: string) => {
				let Component;
				switch (name) {
					case MODALS.LOGIN:
						Component = withModal<TLoginProps>(LoginView, name);
						break;
				}
				return !!Component ? <Component /> : null;
			}}
		</ModalProvider>
	);
}

export default Container;
