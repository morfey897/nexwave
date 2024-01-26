'use client';
import Button from '@/components/Button';
import { useTranslations } from 'next-intl';
import { type IModal, Position, Blur, withModal } from '@nw/modal';
import clsx from 'clsx';
import { HiX } from 'react-icons/hi';
import Headline from '@/components/Headline';
import { Input, TextArea } from '@/components/Controls/Form';
import Spinner from '@/components/Spinner';
import { useCallback } from 'react';
import { useAction } from '@/hooks/action';
import { actionCreateNewProject } from '@/actions/project-action';
import { CREATE_FAILED, USER_UNAUTHORIZED } from '@/errorCodes';
import { useRouter } from 'next/navigation';
import { APP } from '@/routes';
import { EnumResponse } from '@/enums';
import { BiChevronDown } from 'react-icons/bi';
import Accordion from '@/components/Accordion';

function CreateBranch(props: IModal) {
	const router = useRouter();
	const { action, submit, reset, pending, result } = useAction(
		actionCreateNewProject,
	);
	const responseError = result?.error?.code;

	const t = useTranslations();

	const signIn = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			router.push(APP);
		},
		[router],
	);

	return (
		<div
			className={clsx(
				'relative md:w-[475px] w-[95vw] bg-gray-100 dark:bg-gray-900 px-12 py-6 my-4 rounded-lg border shadow dark:border-gray-600',
			)}
		>
			<Button
				variant='text'
				className='absolute top-2 right-0.5 hover:underline hover:bg-gray-200 dark:hover:bg-gray-800'
				icon={<HiX size={28} />}
				onClick={props.closeMe}
			/>

			<Headline
				headline={t('page.add_branch.headline')}
				subheadline={t('page.add_branch.subheadline')}
				className='text-lg md:text-xl font-semibold text-center'
				bodyClassName='text-center'
			/>
			<form
				className='w-full'
				onSubmit={submit}
				action={action}
				onChange={reset}
			>
				<div className='space-y-4 mt-6'>
					<Input
						autoComplete='branch-name'
						name='name'
						type='text'
						placeholder={t('form.name')}
					/>
					<TextArea name='info' placeholder={t('form.info')} />
					<Accordion
						id='branch-settings-new'
						head={
							<Button
								tag='div'
								variant='dark'
								message={t('form.address')}
								className='justify-between text-gray-400 dark:text-gray-500'
								iconAfter={
									<span className='icon shrink-0 block transition-transform rotate-0 ease-out self-baseline'>
										<BiChevronDown size={24} className={''} />
									</span>
								}
							/>
						}
					>
						<div className='space-y-3 border rounded-lg dark:border-gray-600 p-4'>
							<Input
								disabled={pending}
								autoComplete='country'
								placeholder={t('form.country')}
								name='address.country'
								type='text'
							/>
							<Input
								disabled={pending}
								autoComplete='city'
								placeholder={t('form.city')}
								name='address.city'
								type='text'
							/>
							<Input
								disabled={pending}
								placeholder={t('form.address_line')}
								name='address.address_line'
								type='text'
							/>
							<Input
								disabled={pending}
								placeholder={t('form.address_line_2')}
								name='address.address_line_2'
								type='text'
							/>
						</div>
					</Accordion>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-2 my-6'>
					<p className='text-xs text-red-600 dark:text-red-400 break-words hyphens-auto'>
						{responseError?.includes(USER_UNAUTHORIZED) &&
							t.rich('error.unauthorized_rt', {
								button: (chunks) => (
									<button
										onClick={signIn}
										className='text-blue-500 underline dark:text-blue-400'
									>
										{chunks}
									</button>
								),
							})}
						{responseError?.includes(CREATE_FAILED) && t('error.create_failed')}
						{result?.status === EnumResponse.FAILED &&
							!responseError?.includes(USER_UNAUTHORIZED) &&
							!responseError?.includes(CREATE_FAILED) &&
							t('error.wrong')}
					</p>

					<div className='flex justify-end gap-x-2'>
						<Button
							onClick={props.closeMe}
							variant='default'
							className='capitalize'
							message={t('button.cancel')}
							disabled={pending}
							icon={pending && <Spinner variant='primary' />}
						/>

						<Button
							variant='primary'
							type='submit'
							className='capitalize'
							message={t('button.create')}
							disabled={pending}
							icon={pending && <Spinner variant='primary' />}
						/>
					</div>
				</div>
			</form>
		</div>
	);
}

export default withModal(CreateBranch, {
	zIndex: 30,
	position: Position.CENTER,
	wrapper: {
		className: '[&>.box]:max-h-[100vh] [&>.box]:overflow-y-auto',
	},
	overlay: {
		blur: Blur.MD,
		className: 'bg-gray-100/20 dark:bg-black/60',
	},
});
