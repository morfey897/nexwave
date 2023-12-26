'use client';
import { APP } from '@/routes';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { HiMenuAlt3, HiX, HiLogout } from 'react-icons/hi';
import { TiWaves } from 'react-icons/ti';
import ThemeSwithcer from '@/components/ThemeSwithcer';
import DropDown from '@/components/DropDown';
import NavItem from '@/components/NavItem';
import User from './User';
import Picture from './Picture';
import Project from './Project';
import Search from '@/components/Controls/Search';
import Block from '@/components/Block';
import Container from '@/components/Containers';
import { useRouter } from 'next/navigation';
import { HOME } from '@/routes';
import Overlay from '@/components/Overlay';
import { signOut } from '@/actions/auth';
import { useNWStore } from '@/hooks/store';
import { abbrev, fullname } from '@/utils';

function Header() {
	const user = useNWStore((state) => state.user);
	const projects = useNWStore((state) => state.projects);
	const t = useTranslations('common');
	const route = useRouter();

	const [menu, setMenu] = useState(false);

	const onToggleMenu = useCallback(() => {
		setMenu((menu) => !menu);
	}, []);

	const onCloseMenu = useCallback(() => {
		setMenu(false);
	}, []);

	const onExit = useCallback(async () => {
		await signOut();
		route.push(HOME);
	}, []);

	return (
		<>
			<div className='relative w-full h-[80px]' />
			<nav className='fixed bg-white shadow dark:bg-gray-800 top-0 w-full z-30'>
				<Link
					href={APP}
					className='lg:left-6 top-4 flex items-center gap-2 text-gray-900 dark:text-white absolute font-semibold text-xl'
				>
					<TiWaves size={52} />
					<p className='hidden lg:block'>NextWave</p>
					<p className='hidden md:block lg:hidden'>NW</p>
				</Link>
				<Block>
					<Container>
						<div className='py-4 mx-auto'>
							<div className='lg:flex lg:items-center lg:justify-between'>
								<div className='flex items-center justify-between'>
									<div className='mr-10'>
										<Search placeholder={t('search')} />
									</div>

									{/* <!-- Mobile menu button --> */}
									<div className='flex lg:hidden gap-2'>
										<ThemeSwithcer />

										<button
											onClick={onToggleMenu}
											type='button'
											className='text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400'
											aria-label='toggle menu'
										>
											{!menu ? <HiMenuAlt3 size={24} /> : <HiX size={24} />}
										</button>
									</div>
								</div>

								<div
									onClick={onCloseMenu}
									className={clsx(
										'absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center',
										menu
											? 'translate-x-0 opacity-100 shadow'
											: 'opacity-0 -translate-x-full',
									)}
								>
									<div className='flex items-center mt-4 lg:mt-0 gap-4'>
										<ThemeSwithcer className='hidden lg:block' />

										{/* Desktop version */}
										<DropDown
											wrapperClassName='hidden lg:block'
											direction={{ y: 'bottom', x: 'left' }}
											element={
												<button className='mr-1'>
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
												</button>
											}
										>
											<div className='px-2 py-4 flex flex-col min-w-[300px]'>
												<User user={user} />
												<hr className='border-gray-200 dark:border-gray-700' />
												<div className='space-y-2 p-3'>
													{projects?.map((project) => (
														<Project
															key={project.uuid}
															project={project}
															variant='small'
														/>
													))}
												</div>

												<hr className='border-gray-200 dark:border-gray-700' />
												<NavItem
													Icon={HiLogout}
													label={t('sign_out')}
													onClick={onExit}
												/>
											</div>
										</DropDown>

										{/* Mobile version */}
										<div className='flex flex-col w-full lg:hidden'>
											<User user={user} />

											<hr className='border-gray-200 dark:border-gray-700 my-2' />

											<div className='space-y-4 p-3'>
												{projects?.map((project) => (
													<Project
														key={project.uuid}
														project={project}
														variant='medium'
													/>
												))}
											</div>

											<NavItem
												className='[&>span]:!block !flex-row'
												Icon={HiLogout}
												label={t('sign_out')}
												onClick={onExit}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						{menu && <Overlay onClick={onCloseMenu} blur='sm' />}
					</Container>
				</Block>
			</nav>
		</>
	);
}

export default Header;
