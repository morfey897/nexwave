'use client';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Form from '@radix-ui/react-form';
import { useRouter } from 'next/navigation';
import { EnumOAuthProvider, EnumRoutes } from '~constants/enums';
// import { Position, ModalState, Modal } from '@nw/modal';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import SignIn from './SignIn';
// import SignUp from './SignUp_old';
// import { Dialog, Button, Text, TextField, Flex } from '@radix-ui/themes';
// import { WndWrapper, WndHeader, WndBody } from '~dialogs/index';
import clsx from 'clsx';
import OAuthForm from './OAuthForm';
import { EnumProtectedRoutes } from '~constants/enums';
import GoogleIcon from '~root/icons/GoogleIcon';
import { Box } from '../layout';
import { Button } from '~components/buttons';

function Auth({ mode }: { mode: 'signIn' | 'signUp' }) {
	const t = useTranslations();
	// const route = useRouter();

	// const [localMode, setLocalMode] = useState(mode);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	// const onConfirm = useCallback(() => {
	// 	route.refresh();
	// }, [route]);

	// const onDismiss = useCallback(() => {
	// 	route.push(EnumRoutes.HOME);
	// }, [route]);

	// const onToggleView = useCallback(() => {
	// 	setLocalMode((prev) => (prev === 'signIn' ? 'signUp' : 'signIn'));
	// }, []);

	// if (!mounted) return null;

	return (
		<AlertDialog.Root open>
			<AlertDialog.Portal>
				<AlertDialog.Overlay
					className={clsx(
						'data-[state=open]:animate-overlayShow fixed inset-0',
						'bg-black/20 backdrop-blur-md',
						'z-20'
					)}
				/>
				<AlertDialog.Content
					className={clsx(
						'data-[state=open]:animate-contentShow z-30 focus:outline-none',
						'fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]',
						'rounded-lg p-6',
						'max-h-[85vh] w-[90vw] max-w-[500px]',
						'shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]',
						'bg-secondary text-primary-text'
					)}
				>
					<AlertDialog.Title className='text-primary-text text-xl font-semibold'>
						{t('page.auth.headline')}
					</AlertDialog.Title>
					<AlertDialog.Description className='text-secondary-text mt-4'>
						{t('page.auth.subheadline')}
					</AlertDialog.Description>
					<Box className='mt-4 w-full'>
						<OAuthForm
							redirectTo={EnumProtectedRoutes.APP}
							provider={EnumOAuthProvider.GOOGLE}
							buttonProps={{
								icon: <GoogleIcon />,
								variant: 'default',
							}}
						>
							{t('page.sign_in.with_google')}
						</OAuthForm>
					</Box>
					<div className='my-4 flex items-center justify-between'>
						<span className='border-stroke w-1/5 border-b'></span>

						<p className='text-secondary-text text-center text-sm'>
							{t('page.sign_in.with_email')}
						</p>

						<span className='border-stroke w-1/5 border-b'></span>
					</div>
					<Form.Root className='gap-4'>
						<Form.Field className='mb-[10px] grid' name='email'>
							<div className='flex items-baseline justify-between'>
								<Form.Label className='text-primary-text text-sm font-medium'>
									Email<span className='text-red-1 ml-1 mt-1'>*</span>
								</Form.Label>
								<Form.Message
									className='text-secondary-text text-sm'
									match='valueMissing'
								>
									Please enter your email
								</Form.Message>
								<Form.Message
									className='text-[13px] text-white opacity-[0.8]'
									match='typeMismatch'
								>
									Please provide a valid email
								</Form.Message>
							</div>
							<Form.Control asChild>
								<input
									type='email'
									className='bg-secondary border-stroke inline-flex rounded-md border py-3 pl-5 pr-4 text-base data-[invalid]:border-red-1'
									required
								/>
							</Form.Control>
						</Form.Field>
						<Form.Field className='mb-[10px] grid' name='question'>
							<div className='flex items-baseline justify-between'>
								<Form.Label className='text-[15px] font-medium leading-[35px] text-white'>
									Question
								</Form.Label>
								<Form.Message
									className='text-[13px] text-white opacity-[0.8]'
									match='valueMissing'
								>
									Please enter a question
								</Form.Message>
							</div>
							<Form.Control asChild>
								<textarea
									className='bg-blackA2 shadow-blackA6 selection:color-white selection:bg-blackA6 box-border inline-flex w-full resize-none appearance-none items-center justify-center rounded-[4px] p-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]'
									required
								/>
							</Form.Control>
						</Form.Field>
						<Form.Submit asChild>
							<Button type='submit' variant='primary'>
								Post question
							</Button>
						</Form.Submit>
					</Form.Root>
					{/* <div className='flex justify-end gap-[25px]'>
						<AlertDialog.Cancel asChild>
							<button
								type='button'
								className='text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]'
							>
								Cancel
							</button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<button
								type='button'
								className='text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]'
							>
								Yes, delete account
							</button>
						</AlertDialog.Action>
					</div> */}
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	);
	return (
		<AlertDialog.Root>
			{/* <AlertDialog.Trigger asChild>
				<button className='text-violet11 hover:bg-mauve3 shadow-blackA4 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black'>
					Delete account
				</button>
			</AlertDialog.Trigger>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className='bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0' />
				<AlertDialog.Content className='data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none'>
					<AlertDialog.Title className='text-mauve12 m-0 text-[17px] font-medium'>
						Are you absolutely sure?
					</AlertDialog.Title>
					<AlertDialog.Description className='text-mauve11 mb-5 mt-4 text-[15px] leading-normal'>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialog.Description>
					<div className='flex justify-end gap-[25px]'>
						<AlertDialog.Cancel asChild>
							<button className='text-mauve11 bg-mauve4 hover:bg-mauve5 focus:shadow-mauve7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]'>
								Cancel
							</button>
						</AlertDialog.Cancel>
						<AlertDialog.Action asChild>
							<button className='text-red11 bg-red4 hover:bg-red5 focus:shadow-red7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]'>
								Yes, delete account
							</button>
						</AlertDialog.Action>
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal> */}
		</AlertDialog.Root>
	);

	// export default AlertDialogDemo;
	// <Dialog.Root open>
	// 	{localMode === 'signIn' && mounted && (
	// 		<SignIn
	// 			name='signIn'
	// 			changeMode={onToggleView}
	// 			confirm={onConfirm}
	// 			close={onDismiss}
	// 		/>
	// 	)}
	// 	{/* {localMode === 'signUp' && mounted && (
	// 		<SignUp name='signUp' changeMode={onToggleView} confirm={onConfirm} />
	// 	)} */}
	// </Dialog.Root>
	// );
}

export default Auth;
