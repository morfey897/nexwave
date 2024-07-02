'use client';
import { COOKIES, LOCALES } from '@nw/config';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import DropDown from '@/components/DropDown';
import clsx from 'clsx';
import Button from '../../components/Button';
import { TLocale } from '@/types';

function Locale({
	messages,
	active,
}: {
	messages: Record<TLocale, { abr: string; title: string }>;
	active: TLocale;
}) {
	const router = useRouter();

	const onChangeLocale = useCallback(
		(newLocale: string) => {
			document.cookie = `${COOKIES.LOCALE}=${newLocale};path=/`;
			router.refresh();
		},
		[router]
	);

	return (
		<DropDown
			direction={{ y: 'bottom', x: 'left' }}
			element={
				<button className='rounded-lg border-2 px-2 py-1 text-[12px] font-semibold uppercase'>
					{messages[active].abr}
				</button>
			}
		>
			<div className='flex flex-col px-2 py-4'>
				{LOCALES.LIST.map((locale) => (
					<Button
						key={locale}
						size='md'
						className={clsx(
							'!justify-start',
							locale === active && 'bg-gray-200 dark:bg-gray-700'
						)}
						icon={
							<div
								className={clsx(
									'flex items-center justify-center rounded-lg border-2 px-2 py-1 text-[12px] font-semibold uppercase'
								)}
							>
								<span>{messages[locale].abr}</span>
							</div>
						}
						onClick={() => onChangeLocale(locale)}
						message={messages[locale].title}
					/>
				))}
			</div>
		</DropDown>
	);
}

export default Locale;
