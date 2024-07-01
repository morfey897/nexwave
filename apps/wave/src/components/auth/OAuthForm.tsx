import React from 'react';
import { signInWithOauth } from '~actions/auth-action';
import { EnumOAuthProvider } from '~enums';
import Button from '~components/buttons/Button';

function OAuthForm({
	redirectTo,
	provider,
	children,
	buttonProps,
}: {
	provider: EnumOAuthProvider;
	redirectTo?: string;
	children: React.ReactNode;
	buttonProps?: React.ComponentProps<
		typeof Button
	>;
}) {
	return (
		<form
			action={signInWithOauth}
			className='w-full'
			name={`${provider}-provider`}
		>
			<input type='hidden' name='provider' value={provider} />
			<input type='hidden' name='redirect_to' value={redirectTo} />
			<Button type='submit' {...buttonProps}>
				{children}
			</Button>
		</form>
	);
}

export default OAuthForm;
