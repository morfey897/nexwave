'use client';
import SignUpForm from '@/views/auth/SignUp';
import withModal from '@/components/Modal';
function SignInModalPage({ onDismiss }: { onDismiss: () => void }) {
	return <SignUpForm className='mx-auto' />;
}

export default withModal(SignInModalPage);
