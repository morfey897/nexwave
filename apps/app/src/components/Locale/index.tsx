'use client';
import { useLocale, useTranslations } from 'next-intl';
import { locales, cookies as cookiesConfig } from 'config';
import React, { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import NavItem from '../NavItem';
import DropDown from '@/components/DropDown';
import clsx from 'clsx';

function LocaleSwitcher() {
	const t = useTranslations('common');
	const locale = useLocale();
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
			direction={{ y: 'top', x: 'right' }}
			element={
				<button className='uppercase border-4 rounded-lg px-2 py-1 font-semibold'>
					{t(`i18n.${locale}.abr`)}
				</button>
			}
		>
			<div className='px-2 py-4 flex flex-col'>
				{locales.LOCALES.map((locale) => (
					<NavItem
						key={locale}
						className={clsx(
							'[&>span]:!block [&>span]:text-sm [&>svg]:rounded-full',
						)}
						Icon={({ className }) => (
							<div
								className={clsx(
									'uppercase border-2 rounded-lg px-2 py-1 font-semibold text-[11px] flex items-center justify-center',
									className,
								)}
							>
								<span>{t(`i18n.${locale}.abr`)}</span>
							</div>
						)}
						onClick={() => onChangeLocale(locale)}
						label={t(`i18n.${locale}.title`)}
					/>
				))}
			</div>
		</DropDown>
	);
}

export default LocaleSwitcher;
