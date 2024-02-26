'use client';
import Button from '@/components/Button';
import { useTranslations } from 'next-intl';
import Marker from '@/components/ColorMarker';
import { type IModal, Position, withModal, useCloseAllModal } from '@nw/modal';
import { Input, Select, File, Textarea } from '@/components/Controls/Form';
import Spinner from '@/components/Spinner';
import { MdLabelOutline, MdOutlineCloudUpload } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { generateColor } from '@/utils';
import { useAction } from '@/hooks/action';
import { actionCreateNewProject } from '@/actions/project-action';
import { ACCESS_DENIED, CREATE_FAILED, USER_UNAUTHORIZED } from '@/errorCodes';
import { EnumColor, EnumResponse, COLORS, CURRENCIES } from '@/enums';
import { MdOutlineCurrencyExchange } from 'react-icons/md';
import {
	WndWrapper,
	WndHeader,
	WndBody,
	WndFooter,
} from '@/components/Windows';
import ErrorCopy from '@/components/ErrorCopy';
import { useRouter } from 'next/navigation';

function CreateProject({ closeMe }: IModal) {
	const router = useRouter();
	const closeAll = useCloseAllModal();
	const { action, submit, reset, pending, result } = useAction(
		actionCreateNewProject,
	);

	useEffect(() => {
		if (result?.status === EnumResponse.SUCCESS) {
			closeAll();
			router.refresh();
		}
	}, [result, closeAll, router]);

	const t = useTranslations();
	const [color, setColor] = useState(generateColor());

	return (
		<WndWrapper>
			<WndHeader
				headline={t('page.add_project.headline')}
				subheadline={t('page.add_project.subheadline')}
				onClose={closeMe}
			/>
			<WndBody>
				<form onSubmit={submit} action={action} onChange={reset}>
					<div className='space-y-4'>
						<Input
							autoComplete='project-name'
							icon={<MdLabelOutline size={32} />}
							name='name'
							type='text'
							placeholder={t('form.project_name')}
						/>
						<Textarea name='info' placeholder={t('form.info')} />
						<Select
							onChange={(event) => setColor(event.target.value as EnumColor)}
							icon={<Marker size={12} color={color} className='block' />}
							name='color'
							placeholder={t('form.select_color')}
						>
							{COLORS.map((clr) => (
								<option selected={color === clr} key={clr} value={clr}>
									{t(`color.${clr}`)}
								</option>
							))}
						</Select>
						<Select
							icon={<MdOutlineCurrencyExchange size={24} />}
							name='currency'
							placeholder={t('form.select_currency')}
						>
							{CURRENCIES.map((currency) => (
								<option key={currency} value={currency}>
									{t(`currency.${currency}`)}
								</option>
							))}
						</Select>
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

export default withModal(CreateProject, {
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
