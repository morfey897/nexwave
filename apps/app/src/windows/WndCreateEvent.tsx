'use client';
import Button from '@/components/Button';
import { useTranslations } from 'next-intl';
import { type IModal, Position, withModal, useCloseAllModal } from '@nw/modal';
import {
	Input,
	Textarea,
	File,
	Select,
	Masked,
	Fieldset,
	Autocomplete,
} from '@/components/Controls/Form';

import Spinner from '@/components/Spinner';
import { useAction } from '@/hooks/action';
import { actionCreateNewBranch } from '@/actions/branch-action';
import { ACCESS_DENIED, CREATE_FAILED, USER_UNAUTHORIZED } from '@/errorCodes';
import { BiChevronDown } from 'react-icons/bi';
import { HiOutlineClock } from 'react-icons/hi';
import Accordion from '@/components/Accordion';
import {
	AsideWrapper,
	AsideHeader,
	AsideBody,
	WndFooter,
} from '@/components/Windows';
import ErrorCopy from '@/components/ErrorCopy';
import { MdOutlineCloudUpload } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useNWStore from '@/lib/store';
import { CREATE } from '@/crud';
import { hasAccess } from '@/utils';
import AccessDenied from '@/components/AccessDenied';
import clsx from 'clsx';
import { EnumColor, EnumResponse, COLORS, CURRENCIES } from '@/enums';
import { useState } from 'react';
import { generateColor } from '@/utils';
import Marker from '@/components/ColorMarker';
import SVGIcon from '@/components/SVGIcon';

function CreateEvent({ closeMe }: IModal) {
	const project = useNWStore((state) => state.project);
	const hasPermission = hasAccess(project?.permission, CREATE.EVENT);

	const [color, setColor] = useState(generateColor());
	const [branchUUID, setBranchUUID] = useState('');

	const router = useRouter();
	const closeAll = useCloseAllModal();
	const { action, submit, reset, pending, result } = useAction(
		actionCreateNewBranch,
	);
	const t = useTranslations();

	useEffect(() => {
		if (result?.status === EnumResponse.SUCCESS && result.data) {
			closeAll();
			router.refresh();
		}
	}, [result, router, closeAll]);

	useEffect(() => {
		if (project?.branches?.length === 1) {
			setBranchUUID(project?.branches[0].uuid);
		}
	}, [project?.branches]);

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(form);
		console.log('SUBMIT:', Object.fromEntries(data.entries()));
		// submit(data);
	};

	return (
		<AsideWrapper className='!w-full md:w-96'>
			<AsideHeader
				headline={t('page.add_event.headline')}
				subheadline={t('page.add_event.subheadline')}
				onClose={closeMe}
			/>
			<AsideBody>
				{hasPermission ? (
					// <form onSubmit={submit} action={action} onChange={reset}>
					<form onSubmit={onSubmit}>
						<div className='space-y-4'>
							<input type='hidden' name='id' value={project?.id} />
							<Input name='name' type='text' placeholder={t('form.name')} />
							<Autocomplete
								name='direction'
								searchOptions={{
									fields: ['label'],
									storeFields: ['id', 'label'],
									searchOptions: {
										fuzzy: 0.2,
										prefix: true,
									},
								}}
								placeholder={t('form.direction')}
							/>
							<Select
								name='branch_uuid'
								placeholder={t('form.select_branch')}
								icon={<SVGIcon type='branch' size={24} />}
								onChange={(event) => setBranchUUID(event.target.value)}
							>
								{project?.branches?.map((branch) => (
									<option key={branch.uuid} value={branch.uuid}>
										{branch.name}
									</option>
								))}
							</Select>
							<Select name='space_id' placeholder={t('form.select_space')}>
								{project?.branches
									?.find((branch) => branch.uuid === branchUUID)
									?.spaces?.map((space) => (
										<option key={space.shortId} value={space.shortId}>
											{space.name}
										</option>
									))}
							</Select>
							<Fieldset legend={t('form.date')}>
								<div className='grid grid-cols-2 gap-4'>
									<Masked
										name='from'
										placeholder={t('form.from')}
										maskedProps={{
											alias: 'datetime',
											inputFormat: 'HH:MM',
											showMaskOnHover: false,
										}}
									/>
									<Masked
										name='to'
										placeholder={t('form.to')}
										maskedProps={{
											alias: 'datetime',
											inputFormat: 'HH:MM',
											showMaskOnHover: false,
										}}
										className={clsx(
											'[&:before]:content-[""] [&:before]:absolute',
											'[&:before]:border-gray-400 [&:before]:dark:border-gray-600 [&:before]:border',
											'[&:before]:w-2 [&:before]:-left-3 [&:before]:top-7',
										)}
									/>
									<Input
										className='col-span-2'
										name='date'
										type='date'
										placeholder={t('form.date')}
										min={new Date().toISOString()}
									/>
								</div>
							</Fieldset>

							<Select
								onChange={(event) => setColor(event.target.value as EnumColor)}
								icon={<Marker size={12} color={color} className='block' />}
								name='color'
								placeholder={t('form.select_color')}
								defaultValue={color}
							>
								{COLORS.map((clr) => (
									<option key={clr} value={clr}>
										{t(`color.${clr}`)}
									</option>
								))}
							</Select>

							{/* <input type='color' name='head' />
							<input
								type='time'
								name='time'
								step='3600'
								min='00:00'
								max='23:59'
								pattern='[0-2][0-9]:[0-5][0-9]'
							/> */}
							{/* <Duration
								name='duration'
								placeholder={'form.duration'}
								icon={<HiOutlineClock size={24} />}
							/>
							<Masked
								name='duration'
								placeholder={'form.duration'}
								icon={<HiOutlineClock size={24} />}
							/> */}

							{/* <Select name='type' placeholder={t('form.type')}>
								<option value='event'>{t('form.event')}</option>
								<option value='meeting'>{t('form.meeting')}</option>
							</Select> */}
							{/* <TextArea name='info' placeholder={t('form.info')} /> */}
							{/* <Accordion
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
							</Accordion> */}
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
			</AsideBody>
		</AsideWrapper>
	);
}

export default withModal(CreateEvent, {
	position: [Position.RIGHT, Position.TOP],
	wrapper: {
		className: 'z-20',
	},
	overlay: {
		className: 'bg-gray-100/20 dark:bg-black/60 backdrop-blur',
	},
});
