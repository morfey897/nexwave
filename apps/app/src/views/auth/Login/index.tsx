'use client';
import SignInView from './SignIn';
import SignUpView from './SignUp';
import { useSearchParams } from 'next/navigation';

function LoginView({ className }: { className?: string }) {
	const searchParams = useSearchParams();

	return searchParams.get('user') ? (
		<SignUpView className={className} />
	) : (
		<SignInView className={className} />
	);
}

export default LoginView;
