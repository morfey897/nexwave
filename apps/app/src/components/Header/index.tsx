'use client';
import { EXTERNAL } from '@/constants/routes';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { HiMenuAlt3, HiX, HiCog, HiLogout } from 'react-icons/hi';
import { TiWaves } from 'react-icons/ti';
import ThemeSwithcer from '@/components/Theme';
import DropDown from '@/components/DropDown';
import NavItem from '@/components/NavItem';
import User from './User';
import Search from '@/components/Controls/Search';

function Header() {
	const t = useTranslations('common');
	const [menu, setMenu] = useState(false);

	const [user, setUser] = useState({
		avatar:
			'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200',
		name: 'Jane',
		surname: 'Doe',
		email: 'janedoe@exampl.com',
	});

	const onToggleMenu = useCallback(() => {
		setMenu((menu) => !menu);
	}, []);

	const onCloseMenu = useCallback(() => {
		setMenu(false);
	}, []);

	return (
		<>
			<div className='relative w-full h-[80px]' />
			<nav className='fixed bg-white shadow dark:bg-gray-800 top-0 w-full z-30'>
				<div className='px-6 py-4 mx-auto'>
					<div className='lg:flex lg:items-center lg:justify-between'>
						<div className='flex items-center justify-between'>
							<Link
								href='/'
								className='flex items-center gap-2 text-gray-900 dark:text-white'
							>
								<TiWaves size={48} />
							</Link>

							<div className='mx-10'>
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
							<div className='flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8'>
								<a
									href={EXTERNAL.site}
									className='px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
								>
									{t('links.cms')}
								</a>
								<a
									href={EXTERNAL.site}
									className='px-3 py-2 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
								>
									{t('links.site')}
								</a>
							</div>

							<div className='flex items-center mt-4 lg:mt-0 gap-4'>
								<ThemeSwithcer className='hidden lg:block' />

								{/* Desktop version */}
								<DropDown
									className='hidden lg:block'
									direction={{ y: 'bottom', x: 'left' }}
									element={
										<>
											<button className='w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full'>
												<Image
													width={24}
													height={24}
													src={user.avatar}
													className='object-cover w-full h-full'
													alt='avatar'
												/>
											</button>
										</>
									}
								>
									<div className='px-2 py-4 flex flex-col'>
										<User
											className='flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 cursor-default'
											user={user}
										/>

										<hr className='border-gray-200 dark:border-gray-700' />
										<NavItem Icon={HiCog} label={t('settings')} />
										<hr className='border-gray-200 dark:border-gray-700' />
										<NavItem Icon={HiLogout} label={t('sign_out')} />
									</div>
								</DropDown>

								{/* Mobile version */}
								<div className='flex flex-col w-full lg:hidden'>
									<hr className='border-gray-200 dark:border-gray-700 my-2' />

									<User
										className='flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300'
										user={user}
									/>

									<NavItem
										className='[&>span]:!block !flex-row'
										Icon={HiCog}
										label={t('settings')}
									/>
									<NavItem
										className='[&>span]:!block !flex-row'
										Icon={HiLogout}
										label={t('sign_out')}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				{menu && (
					<div
						onClick={onCloseMenu}
						className='inset-0 fixed bg-transparent backdrop-blur-sm'
					/>
				)}
			</nav>
		</>
	);
}

export default Header;
