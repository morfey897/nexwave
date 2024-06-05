'use client';
import Button from '@/components/Button';
import { useTranslations } from 'next-intl';
import { type IModal, Position, withModal, useCloseAllModal } from '@nw/modal';
import { Input, Textarea, File } from '@/components/Controls/Form';
import Spinner from '@/components/Spinner';
import { useAction } from '@/hooks/action';
import { actionCreateNewBranch } from '@/actions/branch-action';
import { ACCESS_DENIED, CREATE_FAILED, USER_UNAUTHORIZED } from '@/errorCodes';
import { BiChevronDown } from 'react-icons/bi';
import Accordion from '@/components/Accordion';
import {
	WndWrapper,
	WndHeader,
	WndBody,
	WndFooter,
} from '@/components/Windows';
import ErrorCopy from '@/components/ErrorCopy';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { EnumResponse } from '@/enums';
import useNWStore from '@/lib/store';
import { CREATE } from '@/crud';
import { hasAccess } from '@/utils';
import AccessDenied from '@/components/AccessDenied';

function CreateBranch({ closeMe }: IModal) {
	const project = useNWStore((state) => state.project);
	const hasPermission = hasAccess(project?.permission, CREATE.BRANCH);

	const router = useRouter();
	const closeAll = useCloseAllModal();
	const { action, submit, reset, pending, result } = useAction(
		actionCreateNewBranch
	);
	const t = useTranslations();

	useEffect(() => {
		if (result?.status === EnumResponse.SUCCESS && result.data) {
			closeAll();
			router.refresh();
		}
	}, [result, router, closeAll]);

	return (
		<WndWrapper>
			<WndHeader
				headline={t('page.add_branch.headline')}
				subheadline={t('page.add_branch.subheadline')}
				onClose={closeMe}
			/>
			<WndBody>
				{hasPermission ? (
					<form onSubmit={submit} action={action} onChange={reset}>
						<div className='space-y-4'>
							<input type='hidden' name='id' value={project?.id} />
							<Input
								autoComplete='branch-name'
								name='name'
								type='text'
								placeholder={t('form.name')}
							/>
							<Textarea name='info' placeholder={t('form.info')} />
							<Accordion
								inputProps={{
									children: (
										<Button
											tag='div'
											variant='dark'
											message={t('form.address')}
											className='justify-between text-gray-400 dark:text-gray-500'
											iconAfter={
												<span className='icon block shrink-0 rotate-0 self-baseline transition-transform ease-out'>
													<BiChevronDown size={24} className={''} />
												</span>
											}
										/>
									),
								}}
							>
								<div className='space-y-3 rounded-lg border p-4 dark:border-gray-600'>
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
							<File
								icon={<MdOutlineCloudUpload size={24} />}
								name='image'
								placeholder={t('form.select_image')}
								hint={t('form.image_hint')}
								accept='image/png, image/jpeg'
							/>
						</div>
						<WndFooter
							errorCopy={
								<ErrorCopy
									code={result?.error?.code}
									codes={{
										[USER_UNAUTHORIZED]: true,
										[CREATE_FAILED]: true,
										[ACCESS_DENIED]: true,
									}}
								/>
							}
						>
							<Button
								onClick={closeMe}
								variant='default'
								className='capitalize'
								message={t('button.cancel')}
								disabled={pending}
							/>

							<Button
								variant='primary'
								type='submit'
								className='capitalize'
								message={t('button.create')}
								disabled={pending}
								icon={pending && <Spinner variant='primary' />}
							/>
						</WndFooter>
					</form>
				) : (
					<AccessDenied />
				)}
			</WndBody>
		</WndWrapper>
	);
}

export default withModal(CreateBranch, {
	position: [Position.CENTER, `-${Position.TOP}`],
	wrapper: {
		className: 'z-30',
	},
	container: {
		className: 'mt-20 mb-0 md:mb-12',
	},
	overlay: {
		className: 'bg-gray-100/20 dark:bg-black/60 backdrop-blur',
	},
});
