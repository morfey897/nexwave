'use client';
import { useLocale, useTranslations } from 'next-intl';
import { locales, cookies as cookiesConfig } from '@nw/config';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import DropDown from '@/components/DropDown';
import clsx from 'clsx';
import Button from '../Button';

function LocaleSwitcher() {
	const t = useTranslations();
	const active = useLocale();
	const router = useRouter();

	const onChangeLocale = useCallback(
		(newLocale: string) => {
			document.cookie = `${cookiesConfig.LOCALE}=${newLocale};path=/`;
			router.refresh();
		},
		[router],
	);

	return (
		<DropDown
			direction={{ y: 'bottom', x: 'left' }}
			element={
				<button className='uppercase border-2 rounded-lg px-2 py-1 font-semibold text-[12px]'>
					{t(`i18n.${active}.abr`)}
				</button>
			}
		>
			<div className='px-2 py-4 flex flex-col'>
				{locales.LOCALES.map((locale) => (
					<Button
						key={locale}
						size='md'
						className={clsx(
							'!justify-start',
							locale === active && 'bg-gray-200 dark:bg-gray-700',
						)}
						icon={
							<div
								className={clsx(
									'uppercase border-2 rounded-lg px-2 py-1 font-semibold text-[12px] flex items-center justify-center',
								)}
							>
								<span>{t(`i18n.${locale}.abr`)}</span>
							</div>
						}
						onClick={() => onChangeLocale(locale)}
						message={t(`i18n.${locale}.title`)}
					/>
				))}
			</div>
		</DropDown>
	);
}

export default LocaleSwitcher;
