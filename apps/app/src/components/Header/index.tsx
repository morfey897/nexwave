'use client';
import { APP, MODALS } from '@/routes';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useCallback } from 'react';
import { TiWaves } from 'react-icons/ti';
import ThemeSwithcer from '@/components/ThemeSwithcer';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import Picture from './Picture';
import Search from '@/components/Controls/Search';
import Block from '@/components/Block';
import Container from '@/components/Containers';
import { useNWStore } from '@/hooks/store';
import { abbrev, fullname } from '@/utils';
import Button from '../Button';
import { useOpenModal } from '@nw/modal';

function Header() {
	const openModal = useOpenModal();
	const user = useNWStore((state) => state.user);
	const t = useTranslations();

	const onOpenSettings = useCallback(() => {
		if (!user) return;
		openModal({
			name: MODALS.SETTINGS,
		});
	}, [openModal, user]);

	return (
		<>
			<div className='relative w-full h-[80px]' />
			<nav className='fixed bg-white shadow dark:bg-gray-800 top-0 w-full z-30'>
				<Link
					href={APP}
					className='lg:left-6 top-4 flex items-center gap-2 text-gray-900 dark:text-white absolute font-semibold text-xl'
				>
					<TiWaves size={52} />
					<p className='hidden lg:block'>{process.env.NEXT_PUBLIC_TITLE}</p>
					<p className='hidden md:block lg:hidden'>
						{process.env.NEXT_PUBLIC_TITLE_SHORT}
					</p>
				</Link>
				<Block>
					<Container>
						<div className='py-4 mx-auto'>
							<div className='flex items-center justify-between'>
								<div className='mr-10'>
									<Search placeholder={t('button.search')} />
								</div>
								{/* <!-- Mobile menu button --> */}
								<div className='flex gap-2'>
									<LocaleSwitcher />
									<ThemeSwithcer />
									<Button
										variant='text'
										className='mr-1 mb-1 !p-0'
										onClick={onOpenSettings}
										icon={
											<Picture
												variant='primary'
												size={32}
												photo={user?.avatar}
												abbrev={abbrev([
													[user?.name, user?.surname],
													user?.email.split('@').slice(0, 2),
												])}
												name={fullname(user)}
											/>
										}
									/>
								</div>
							</div>
						</div>
					</Container>
				</Block>
			</nav>
		</>
	);
}

export default Header;
