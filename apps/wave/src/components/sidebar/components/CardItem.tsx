'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import RightArrow from '~/icons/RightArrow';
import ProfileIcon from '~/icons/ProfileIcon';
import SignOutIcon from '~/icons/SignOutIcon';
import LangIcon from '~/icons/LangIcon';
import { Box, Flex } from '~/components/layout';
import { Button } from '~/components/buttons/Button';
import Separator from './Separator';
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
	const destroyStore = useNWStore((state) => state.dengirousDestroyStore);

	const route = useRouter();

	const onSignOut = useCallback(async () => {
		destroyStore();
		await signOut();
		route.push(EnumProtectedRoutes.APP);
	}, [route, destroyStore]);

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
			<DropdownMenu.Content
				side='left'
				className='animate-slideRightAndFade relative will-change-[opacity,transform]'
			>
				<div className='bg-secondary w-60 space-y-4 rounded-lg px-px py-2.5 shadow-xl'>
					<DropdownMenu.Item className='outline-none'>
						<Button
							variant='tertiary'
							icon={<ProfileIcon />}
							className='!justify-start px-3'
							message={t('button.my_profile')}
						/>
					</DropdownMenu.Item>
					<Separator className='mx-3' />
					<DropdownMenu.Item className='outline-none'>
						<Button
							variant='tertiary'
							icon={<LangIcon />}
							className='!justify-start px-3'
							message={t(`i18n.${locale}.title`)}
						/>
					</DropdownMenu.Item>
					<ThemeSwithcer className='!justify-start px-3' />
					<Separator className='mx-3' />
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
		</DropdownMenu.Root>
	);
}

export default CardItem;
