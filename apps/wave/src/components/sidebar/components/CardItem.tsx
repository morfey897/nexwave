'use client';

import Image from 'next/image';
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
import { fullname } from '~/utils';
import { EnumRole, EnumProtectedRoutes } from '~/constants/enums';

const Roles = Object.values(EnumRole) as string[];

const CustomRole = (role: string) => {
	const roleComponent = () => <span className='text-blue-500'>{role}</span>;
	return roleComponent;
};

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
				<div className='mb-5 hidden cursor-pointer items-center outline-none md:flex md:px-2 lg:ps-2.5'>
					<Image
						src='/assets/test-avatar.png'
						alt='User profile'
						width={40}
						height={40}
						className='rounded-lg'
					/>
					<Flex justify='space-between' align='center' className='w-full'>
						<Box className='ml-3 text-left md:hidden lg:block'>
							<p className='text-sm font-medium'>{fullname(user)}</p>
							<p className='text-primary-text text-xs'>
								{/* Has role in translation */}
								{project?.role &&
									Roles.includes(project.role) &&
									t(`crud.role.${project.role}`)}
								{/* Has not role in translation */}
								{project?.role &&
									!Roles.includes(project.role) &&
									t.rich('crud.role.your_role_rt', {
										span: CustomRole(project.role),
									})}
							</p>
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
