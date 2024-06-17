'use client';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { useRouter } from 'next/navigation';
import { EnumRoutes } from '~constants/enums';
// import { Position, ModalState, Modal } from '@nw/modal';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import SignIn from './SignIn';
// import SignUp from './SignUp_old';
// import { Dialog, Button, Text, TextField, Flex } from '@radix-ui/themes';
// import { WndWrapper, WndHeader, WndBody } from '~dialogs/index';
// import clsx from 'clsx';

function Auth({ mode }: { mode: 'signIn' | 'signUp' }) {
	// const t = useTranslations();
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

	return null;
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
