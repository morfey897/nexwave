'use client';
import Login from '@/views/auth/Login';
import withModal from '@/components/Modal/withModal';
function LoginModal({ onDismiss }: { onDismiss: () => void }) {
	return <Login className='mx-auto' />;
}

export default withModal(LoginModal);
