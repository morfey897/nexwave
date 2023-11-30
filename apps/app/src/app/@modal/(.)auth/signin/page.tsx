'use client';
import SignInForm from '@/views/auth/SignIn';
import withModal from '@/components/Modal';

function SignInModalPage() {
	return <SignInForm className='mx-auto' />;
}

export default withModal(SignInModalPage);
