'use client';
import Button from '@/components/Button';
import { useTranslations } from 'next-intl';
import Marker from '@/components/Project/Marker';
import { type IModal, Position, Blur, withModal } from '@nw/modal';
import clsx from 'clsx';
import { HiX } from 'react-icons/hi';
import Headline from '@/components/Headline';
import { Input, Select, File } from '@/components/Controls/Form';
import Spinner from '@/components/Spinner';
import { MdLabelOutline, MdOutlineCloudUpload } from 'react-icons/md';
import { useCallback, useMemo, useState } from 'react';
import { generateColor } from '@/utils';
import { useAction } from '@/hooks/action';
import { createProject } from '@/actions/project';
import * as ErrorCodes from '@/errorCodes';
import { useRouter } from 'next/navigation';
import { APP } from '@/routes';
import { EnumResponse, EnumColor } from '@/enums';

function CreateProject(props: IModal) {
	const router = useRouter();
	const { action, submit, reset, pending, result } = useAction(createProject);

	const t = useTranslations();
	const [color, setColor] = useState(generateColor());
	const colors = useMemo(() => Object.values(EnumColor), []);

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
				'relative max-w-[375px] bg-gray-100 dark:bg-gray-900 px-12 py-6 rounded-lg border shadow dark:border-gray-600',
			)}
		>
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

			<form
				className='w-full max-w-md'
				onSubmit={submit}
				action={action}
				onChange={reset}
			>
				<div className='space-y-4 mt-6'>
					<Input
						autoComplete='name'
						icon={<MdLabelOutline size={32} />}
						name='name'
						type='text'
						placeholder={t('form.project_name')}
					/>
					<Select
						onChange={(event) => setColor(event.target.value as EnumColor)}
						autoComplete='name'
						icon={<Marker size={32} color={color} className='block -ml-1.5' />}
						name='color'
						type='text'
						placeholder={t('form.select_color')}
					>
						{colors.map((clr) => (
							<option selected={color === clr} key={clr} value={clr}>
								{t(`color.${clr}`)}
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

				<p className='text-xs text-red-600 dark:text-red-400 break-words hyphens-auto mt-4'>
					{result?.error?.code?.includes(ErrorCodes.USER_UNAUTHORIZED) &&
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
					{result?.status === EnumResponse.FAILED && t('error.wrong')}
				</p>

				<div className='flex justify-between mt-6'>
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
			</form>
		</div>
	);
}

export default withModal(CreateProject, {
	zIndex: 30,
	position: Position.CENTER,
	overlay: {
		blur: Blur.MD,
		className: 'bg-gray-100/20 dark:bg-black/60',
	},
});
