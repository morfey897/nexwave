'use client';

import { LOCALES, COOKIES } from '@nw/config';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Box, Flex } from '~/components/layout';
import Button from '~/components/controls/Button';
import ThemeSwithcer from './ThemeSwitcher';
import { useTranslations, useLocale } from 'next-intl';
import { useCallback } from 'react';
import { signOut } from '~/actions/auth-action';
import { useRouter } from 'next/navigation';
import useNWStore from '~/lib/store';
import { fullname, abbrev } from '~/utils';
import { EnumProtectedRoutes } from '~/constants/enums';
import Roles from '~/components/roles';
import Picture from '~/components/picture/Picture';
import { isEmail } from '~/utils/validation';
import {
	RightArrow,
	ProfileIcon,
	SignOutIcon,
	LangIcon,
	CheckIcon,
} from '~/icons';
import clsx from 'clsx';

const UserSkeleton = () => (
	<div className='flex animate-pulse items-center'>
		<div className='h-[42px] w-[42px] rounded bg-gray-700' />
		<div className='ml-3 hidden h-6 w-24 rounded bg-gray-700 md:hidden lg:block' />
	</div>
);

function CardItem() {
	const t = useTranslations();
	const locale = useLocale();
	const user = useNWStore((state) => state.user);
	const project = useNWStore((state) => state.project);
	const destroyStore = useNWStore((state) => state.dangerousDestroyStore);

	const router = useRouter();

	const onSignOut = useCallback(async () => {
		destroyStore();
		await signOut();
		router.push(EnumProtectedRoutes.APP);
	}, [router, destroyStore]);

	const onChangeLocale = useCallback(
		(newLocale: string) => {
			document.cookie = `${COOKIES.LOCALE}=${newLocale};path=/`;
			router.refresh();
		},
		[router]
	);

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger className='outline-none'>
				<div className='mb-5 flex cursor-pointer items-center outline-none md:px-2 lg:ps-2.5'>
					{user ? (
						<Picture
							photo={user?.avatar}
							name={fullname(user)}
							size={40}
							abbrev={abbrev(
								[user?.name, user?.surname],
								isEmail(user?.login) ? user?.login.split('@') : undefined
							)}
						/>
					) : (
						<UserSkeleton />
					)}
					<Flex
						justify='space-between'
						align='center'
						className='w-full md:hidden lg:flex'
					>
						<Box className='ml-3 text-left md:hidden lg:block'>
							<p className='text-sm font-medium'>{fullname(user)}</p>
							<Roles
								className='text-primary-text text-xs'
								role={project?.role}
							/>
						</Box>
						<RightArrow />
					</Flex>
				</div>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					side='left'
					className='animate-slideRightAndFade relative will-change-[opacity,transform]'
				>
					<div className='bg-secondary min-w-60 rounded-lg px-px py-2.5 shadow-xl'>
						<DropdownMenu.Item className='outline-none'>
							<Button
								isFullWidth
								variant='tertiary'
								icon={<ProfileIcon />}
								className='!justify-start px-3'
								message={t('button.my_profile')}
							/>
						</DropdownMenu.Item>
						<DropdownMenu.Separator className='border-gray-7 m-[5px] mx-3 h-[1px] border' />
						<DropdownMenu.Group>
							<DropdownMenu.Sub>
								<DropdownMenu.SubTrigger className='outline-none data-[disabled]:pointer-events-none'>
									<Button.Div
										variant='tertiary'
										icon={<LangIcon />}
										iconAfter={
											<span className='pl-5'>
												<RightArrow />
											</span>
										}
										className='!justify-start px-3'
										message={t(`i18n.${locale}.title`)}
									/>
								</DropdownMenu.SubTrigger>
								<DropdownMenu.Portal>
									<DropdownMenu.SubContent
										className={clsx(
											'data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade',
											'bg-secondary min-w-[220px] rounded-md p-[5px] shadow-xl will-change-[opacity,transform]',
											'outline-none'
										)}
										sideOffset={2}
										alignOffset={-5}
									>
										{LOCALES.LIST.map((loc) => (
											<DropdownMenu.Item key={loc} className='outline-none'>
												<Button
													variant='tertiary'
													className='!justify-start'
													icon={
														<div
															className={clsx(
																'flex items-center justify-center rounded-lg border-2 px-2 py-1 text-[12px] font-semibold uppercase'
															)}
														>
															<span>{t(`i18n.${loc}.abr`)}</span>
														</div>
													}
													iconAfter={loc === locale ? <CheckIcon /> : undefined}
													onClick={() => onChangeLocale(loc)}
													message={t(`i18n.${loc}.title`)}
												/>
											</DropdownMenu.Item>
										))}
									</DropdownMenu.SubContent>
								</DropdownMenu.Portal>
							</DropdownMenu.Sub>
							<ThemeSwithcer className='!justify-start px-3' />
						</DropdownMenu.Group>
						<DropdownMenu.Separator className='border-gray-7 m-[5px] mx-3 h-[1px] border' />
						<DropdownMenu.Item className='outline-none'>
							<Button
								onClick={onSignOut}
								variant='tertiary'
								icon={<SignOutIcon />}
								className='!justify-start px-3'
								message={t('button.sign_out')}
							/>
						</DropdownMenu.Item>
					</div>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}

export default CardItem;
