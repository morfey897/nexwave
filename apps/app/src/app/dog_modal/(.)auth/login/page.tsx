'use client';
import Login from '@/views/auth/Login';
import withModal, { ModalType } from '@/components/Modal/HOC';
function LoginModal(props: ModalType) {
	return <Login className='mx-auto' {...props} />;
}

export default withModal(LoginModal);
