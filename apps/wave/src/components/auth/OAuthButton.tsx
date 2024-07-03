import React from 'react';
import { signInWithOauth } from '~/actions/auth-action';

function OAuthButton({
	redirect_to,
	provider,
	children,
}: {
	provider: 'google' | 'instagram';
	redirect_to?: string;
	children: React.ReactNode;
}) {
	return (
		<form
			action={signInWithOauth}
			className='w-full'
			name={`${provider}-provider`}
		>
			<input type='hidden' name='provider' value={provider} />
			<input type='hidden' name='redirect_to' value={redirect_to} />
			{children}
		</form>
	);
}

export default OAuthButton;
