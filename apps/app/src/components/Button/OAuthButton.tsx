'use client';
import React from 'react';
import Button from '.';
import { signInWithOauth } from '@/actions/auth-action';

function OAuthButton({
	redirect_to,
	provider,
	...props
}: { provider: 'google' | 'instagram'; redirect_to?: string } & Parameters<
	typeof Button
>[0]) {
	return (
		<form
			action={signInWithOauth}
			className='w-full'
			name={`${provider}-provider`}
		>
			<input type='hidden' name='provider' value={provider} />
			<input type='hidden' name='redirect_to' value={redirect_to} />
			<Button {...props} type='submit' />
		</form>
	);
}

export default OAuthButton;
