'use client';
import Button from '@/components/Button';
import { useTranslations } from 'next-intl';
import Marker from '@/components/Project/Marker';
import { type IModal, Position, Blur, withModal } from '@nw/modal';
import { Input, Select, File, TextArea } from '@/components/Controls/Form';
import Spinner from '@/components/Spinner';
import { MdLabelOutline, MdOutlineCloudUpload } from 'react-icons/md';
import { useState } from 'react';
import { generateColor } from '@/utils';
import { useAction } from '@/hooks/action';
import { actionCreateNewProject } from '@/actions/project-action';
import { ACCESS_DENIED, CREATE_FAILED, USER_UNAUTHORIZED } from '@/errorCodes';
import { EnumColor, EnumCurrency } from '@/enums';
import { MdOutlineCurrencyExchange } from 'react-icons/md';
import {
	WndWrapper,
	WndHeader,
	WndBody,
	WndFooter,
} from '@/components/Windows';
import ErrorCopy from '@/components/ErrorCopy';

const COLORS = Object.values(EnumColor);
const CURRENCIES = Object.values(EnumCurrency);

function CreateProject(props: IModal) {
	const { action, submit, reset, pending, result } = useAction(
		actionCreateNewProject,
	);

	const t = useTranslations();
	const [color, setColor] = useState(generateColor());

	return (
		<WndWrapper>
			<WndHeader
				headline={t('page.add_project.headline')}
				subheadline={t('page.add_project.subheadline')}
				onClose={props.closeMe}
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
						<TextArea name='info' placeholder={t('form.info')} />
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
							onClick={props.closeMe}
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
