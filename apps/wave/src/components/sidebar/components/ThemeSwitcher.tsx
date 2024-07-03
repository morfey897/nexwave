'use client';

import * as Switch from '@radix-ui/react-switch';
import { useTheme } from '~/hooks/theme';
import { useMounted } from '~/hooks/mounted';
import { useTranslations } from 'next-intl';
import { EnumTheme } from '~/constants/enums';
import MoonFullIcon from '~/icons/MoonFullIcon';
import clsx from 'clsx';
import { DivButton } from '~/components/buttons/Button';

const Toggle = ({
	theme,
	toggleTheme,
}: Omit<ReturnType<typeof useTheme>, 'setTheme'>) => (
	<Switch.Root
		checked={theme === 'dark'}
		onClick={toggleTheme}
		className='bg-blackA6 shadow-blackA4 relative h-[25px] w-[42px] cursor-pointer rounded-full shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black'
	>
		<Switch.Thumb className='shadow-blackA4 block h-[21px] w-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]' />
	</Switch.Root>
);

function ThemeSwithcer({ className }: { className?: string }) {
	const t = useTranslations();
	const mounted = useMounted();

	const { theme, toggleTheme } = useTheme();

	return mounted ? (
		<div>
			<DivButton
				variant='tertiary'
				icon={<MoonFullIcon />}
				iconAfter={<Toggle theme={theme} toggleTheme={toggleTheme} />}
				className={clsx(className)}
				message={t(
					theme === EnumTheme.DARK ? 'general.dark_mode' : 'general.light_mode'
				)}
			/>
		</div>
	) : (
		<div className='animate-pulse'>
			<div className='h-[25px] w-[42px] bg-gray-700' />
		</div>
	);
}

export default ThemeSwithcer;
