'use client';
import Button from '@/components/Button';
import { useTranslations } from 'next-intl';
import { type IModal, Position, Blur, withModal } from '@nw/modal';
import { Input, TextArea, File } from '@/components/Controls/Form';
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

function CreateBranch({ closeMe, name, params }: IModal) {
	const router = useRouter();
	const { action, submit, reset, pending, result } = useAction(
		actionCreateNewBranch,
	);
	const t = useTranslations();

	useEffect(() => {
		if (result?.status === EnumResponse.SUCCESS && result.data) {
			if (typeof closeMe === 'function') closeMe();
			router.refresh();
		}
	}, [result, router, closeMe]);

	const projectId = (params && params['projectId']) || '';
	return (
		<WndWrapper>
			<WndHeader
				headline={t('page.add_branch.headline')}
				subheadline={t('page.add_branch.subheadline')}
				onClose={closeMe}
			/>
			<WndBody>
				<form onSubmit={submit} action={action} onChange={reset}>
					<div className='space-y-4'>
						<input type='hidden' name='id' value={projectId.toString()} />
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
			</WndBody>
		</WndWrapper>
	);
}

export default withModal(CreateBranch, {
	zIndex: 30,
	position: [Position.CENTER, `-${Position.TOP}`],
	container: {
		className: 'mt-20 mb-0 md:mb-12',
	},
	overlay: {
		blur: Blur.MD,
		className: 'bg-gray-100/20 dark:bg-black/60',
	},
});
