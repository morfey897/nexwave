'use client';
import { useTranslations } from 'next-intl';
import {
	HiMiniPencilSquare,
	HiArchiveBox,
	HiShieldCheck,
} from 'react-icons/hi2';
import { MdWarningAmber } from 'react-icons/md';
import { EnumState } from '@/enums';
import { Group, Button, IButtonProps } from '@/components/Button';
import Skeleton from '@/components/Skeleton';
import { hasAccess } from '@/utils';
import { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { useAction } from '@/hooks/action';
import Spinner from '@/components/Spinner';
import * as ErrorCodes from '@/errorCodes';
import { EnumResponse } from '@/enums';
import { useRouter } from 'next/navigation';
import { APP } from '@/routes';
import { IResponse } from '@/types';
import ErrorCopy from '@/components/ErrorCopy';

export type UnitAction = 'publish' | 'unpublish' | 'delete';
const WrapButton = ({
	permission,
	brole,
	active,
	name,
	disabled,
	icon,
	...props
}: {
	permission: number | undefined;
	brole: number;
	name: UnitAction;
	active: UnitAction | '';
} & IButtonProps &
	React.ButtonHTMLAttributes<HTMLButtonElement>) => {
	if (!hasAccess(permission, brole)) return null;

	return (
		<Button
			size='sm'
			name={name}
			disabled={disabled}
			icon={active === name && disabled ? <Spinner variant='primary' /> : icon}
			{...props}
		/>
	);
};

type TProps = {
	id: number | string;
	state: string | null | undefined;
	permission: number | undefined;
};

type TActions<T> = {
	serverAction: (formData: FormData) => Promise<IResponse<T> | never>;
	postProcess: (data: T) => TProps;
};

function StateSettings<T>({
	item,
	roles,
	serverAction,
	postProcess,
	...rest
}: { item: T | null } & TActions<T> & {
		roles: Record<UnitAction, number>;
	} & React.HTMLAttributes<HTMLDivElement>) {
	const { action, submit, reset, pending, result } = useAction(serverAction);

	const router = useRouter();

	const t = useTranslations();

	const [activeItem, setActiveItem] = useState<TProps | null>(null);

	const [currentAction, setCurrenAction] = useState<UnitAction | ''>('');

	const responseError = result?.error?.code;

	useLayoutEffect(() => {
		!!item && setActiveItem(postProcess(item));
	}, [item, postProcess]);

	const signIn = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			router.push(APP);
		},
		[router],
	);

	const onSubmit = useCallback(
		(formData: FormData) => {
			action(formData);
		},
		[action],
	);

	const onChangeState: React.MouseEventHandler<HTMLButtonElement> = useCallback(
		(event) => {
			const activeAction = event.currentTarget.name;
			setCurrenAction(activeAction as UnitAction);
			const formData = new FormData();
			formData.append('id', (activeItem?.id || '').toString());
			formData.append('action', activeAction);
			reset();
			submit();
			onSubmit(formData);
		},
		[activeItem, action, reset],
	);

	useEffect(() => {
		if (!!result?.status) {
			setCurrenAction('');
		}
	}, [result]);

	useEffect(() => {
		if (result?.status === EnumResponse.SUCCESS && result.data) {
			router.refresh();
		}
	}, [result, router]);

	const state = activeItem?.state;
	const permission = activeItem?.permission || 0;

	return (
		<div {...rest}>
			{activeItem ? (
				<div className='grid grid-cols-12 grid-rows-1 gap-2'>
					<div className='col-span-12 md:col-span-7'>
						<p className='text-3xl font-semibold text-gray-500 dark:text-gray-400'>
							{(state === EnumState.DRAFT || !state) && (
								<>
									{t(`state.draft`)}
									<span className='text-blue-500 inline-block align-bottom ml-2'>
										<HiMiniPencilSquare size={38} />
									</span>
								</>
							)}
							{state === EnumState.ACTIVE && (
								<>
									{t(`state.published`)}
									<span className='text-green-400 inline-block align-bottom ml-2'>
										<HiShieldCheck size={38} />
									</span>
								</>
							)}
							{state === EnumState.INACTIVE && (
								<>
									{t(`state.unpublished`)}
									<span className='text-yellow-500 inline-block align-bottom ml-2'>
										<HiArchiveBox size={38} />
									</span>
								</>
							)}
						</p>
					</div>
					{/* Actions */}
					<div className='col-span-12 md:col-span-5 flex flex-col items-start md:items-end'>
						<Group>
							{(state === EnumState.DRAFT || !state) && (
								<>
									<WrapButton
										permission={permission}
										brole={roles['publish']}
										name='publish'
										active={currentAction}
										disabled={pending}
										variant='secondary'
										message={t('button.publish')}
										icon={<HiShieldCheck size={20} />}
										onClick={onChangeState}
									/>
									<WrapButton
										permission={permission}
										brole={roles['delete']}
										name='delete'
										variant='warn'
										active={currentAction}
										disabled={pending}
										message={t('button.delete')}
										icon={<MdWarningAmber size={20} />}
										onClick={onChangeState}
									/>
								</>
							)}
							{state === EnumState.ACTIVE && (
								<>
									<WrapButton
										active={currentAction}
										permission={permission}
										brole={roles['unpublish']}
										onClick={onChangeState}
										name='unpublish'
										variant='dark'
										message={t('button.unpublish')}
										disabled={pending}
										icon={<HiArchiveBox size={20} />}
									/>
								</>
							)}
							{state === EnumState.INACTIVE && (
								<>
									<WrapButton
										active={currentAction}
										permission={permission}
										brole={roles['publish']}
										onClick={onChangeState}
										name='publish'
										variant='secondary'
										message={t('button.publish')}
										disabled={pending}
										icon={<HiShieldCheck size={20} />}
									/>

									<WrapButton
										active={currentAction}
										permission={permission}
										brole={roles['delete']}
										onClick={onChangeState}
										name='delete'
										variant='danger'
										message={t('button.delete')}
										disabled={pending}
										icon={<MdWarningAmber size={20} />}
									/>
								</>
							)}
						</Group>
						{result?.status === EnumResponse.FAILED && (
							<div className='flex justify-end my-2'>
								<ErrorCopy
									code={result?.error?.code}
									codes={{
										[ErrorCodes.USER_UNAUTHORIZED]: true,
										[ErrorCodes.ACCESS_DENIED]: true,
										[ErrorCodes.UPDATE_FAILED]: true,
										[ErrorCodes.DELETE_FAILED]: true,
										[ErrorCodes.DELETE_LAST_FAILED]: t(
											'error.delete_last_failed',
										),
									}}
								/>
							</div>
						)}
					</div>
				</div>
			) : (
				<Skeleton className='h-[45px]' />
			)}
		</div>
	);
}

export default StateSettings;
