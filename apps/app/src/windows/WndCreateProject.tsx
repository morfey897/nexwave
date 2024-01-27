'use client';
import Button from '@/components/Button';
import { useTranslations } from 'next-intl';
import Marker from '@/components/Project/Marker';
import { type IModal, Position, Blur, withModal } from '@nw/modal';
import clsx from 'clsx';
import { HiX } from 'react-icons/hi';
import Headline from '@/components/Headline';
import { Input, Select, File, TextArea } from '@/components/Controls/Form';
import Spinner from '@/components/Spinner';
import { MdLabelOutline, MdOutlineCloudUpload } from 'react-icons/md';
import { useCallback, useMemo, useState } from 'react';
import { generateColor } from '@/utils';
import { useAction } from '@/hooks/action';
import { actionCreateNewProject } from '@/actions/project-action';
import { CREATE_FAILED, USER_UNAUTHORIZED } from '@/errorCodes';
import { useRouter } from 'next/navigation';
import { APP } from '@/routes';
import { EnumResponse, EnumColor, EnumCurrency } from '@/enums';
import { MdOutlineCurrencyExchange } from 'react-icons/md';

const COLORS = Object.values(EnumColor);
const CURRENCIES = Object.values(EnumCurrency);

function CreateProject(props: IModal) {
	const router = useRouter();
	const { action, submit, reset, pending, result } = useAction(
		actionCreateNewProject,
	);
	const responseError = result?.error?.code;

	const t = useTranslations();
	const [color, setColor] = useState(generateColor());

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
				'relative rounded-lg border shadow dark:border-gray-600 bg-gray-100 dark:bg-gray-900',
				'md:w-[475px] w-[95vw]',
			)}
		>
			<div className='sticky top-0 z-10 pt-6 pb-3 w-full bg-gray-100 dark:bg-gray-900 rounded-lg'>
				<Button
					variant='text'
					className='absolute top-2 right-0.5 hover:underline hover:bg-gray-200 dark:hover:bg-gray-800'
					icon={<HiX size={28} />}
					onClick={props.closeMe}
				/>

				<Headline
					headline={t('page.add_project.headline')}
					subheadline={t('page.add_project.subheadline')}
					className='text-lg md:text-xl font-semibold text-center'
					bodyClassName='text-center'
				/>
			</div>
			<form
				className='w-full px-6 md:px-12 my-6'
				onSubmit={submit}
				action={action}
				onChange={reset}
			>
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

				<div className='grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-6'>
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
