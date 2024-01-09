'use client';
import Button from '@/components/Button';
import { HiOutlinePlus, HiChevronDown } from 'react-icons/hi';
import { BsDiagram2 } from 'react-icons/bs';
import { useTranslations } from 'next-intl';
import Accordion from '@/components/Accordion';
import Branch from '@/components/Sidebar/Branch';
import Marker from '@/components/Project/Marker';
import { type IModal, Position, Blur, withModal } from '@nw/modal';
import clsx from 'clsx';
import { HiX } from 'react-icons/hi';
import Headline from '@/components/Headline';
import Input from '@/components/Controls/Form/input';
import Select from '@/components/Controls/Form/select';
import Spinner from '@/components/Spinner';
import { HiOutlineColorSwatch } from 'react-icons/hi';
import { MdLabelOutline } from 'react-icons/md';
import { EnumColor } from '@nw/storage';
import { useMemo, useState } from 'react';
import { random } from '@/utils';

function AddProject(props: IModal) {
	const t = useTranslations();

	const [color, setColor] = useState(
		random<EnumColor>(Object.values(EnumColor)),
	);

	const submit = () => {};
	const reset = () => {};
	const pending = false;

	const colors = useMemo(() => Object.values(EnumColor), []);

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
				headline={t('add_project_page.headline')}
				subheadline={t('add_project_page.subheadline')}
				className='text-lg md:text-xl font-semibold text-center'
				bodyClassName='text-center'
			/>

			<form
				className='w-full max-w-md'
				onSubmit={submit}
				// action={action}
				onChange={reset}
			>
				<div className='space-y-4 mt-6'>
					<Input
						autoComplete='name'
						icon={<MdLabelOutline size={24} />}
						name='name'
						type='text'
						placeholder={t('add_project_page.name')}
					/>
					<Select
						onChange={(event) => setColor(event.target.value as EnumColor)}
						autoComplete='name'
						icon={<Marker size={32} color={color} className='block -ml-1.5'/>}
						name='color'
						type='text'
						placeholder={t('add_project_page.color')}
					>
						{colors.map((clr) => (
							<option selected={color === clr} key={clr} value={clr}>
								{t(`common.colors.${clr}`)}
							</option>
						))}
					</Select>
				</div>

				{/* <p className='text-xs text-red-600 dark:text-red-400 break-words hyphens-auto flex items-center'>
					{result?.error?.code?.includes(ErrorCodes.EMAIL_EXISTS) && (
						<>
							<span className='pr-1'>{t('email_in_use')}</span>
							<Button
								onClick={changeMode}
								variant='text'
								className='text-sm text-blue-500 hover:underline dark:text-blue-400'
								message={t('sign_in')}
							/>
						</>
					)}
				</p> */}

				<div className='flex justify-between mt-6'>
					<Button
						onClick={props.closeMe}
						variant='default'
						className='capitalize'
						message={t('add_project_page.cancel')}
						disabled={pending}
						icon={pending && <Spinner variant='primary' />}
					/>

					<Button
						variant='primary'
						type='submit'
						className='capitalize'
						message={t('add_project_page.submit')}
						disabled={pending}
						icon={pending && <Spinner variant='primary' />}
					/>
				</div>
			</form>
		</div>
	);
}

export default withModal(AddProject, {
	zIndex: 30,
	position: Position.CENTER,
	overlay: {
		blur: Blur.MD,
		className: 'bg-gray-100/20 dark:bg-black/60',
	},
});
