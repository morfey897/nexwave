'use client';
import Login from '@/views/auth/Login';
import withModal, { ModalType } from '@/providers/modal/withModal';
function LoginModal(props: ModalType) {
	return <Login className='mx-auto' {...props} />;
}

export default withModal(LoginModal);
