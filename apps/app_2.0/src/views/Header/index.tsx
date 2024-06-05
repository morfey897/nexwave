import { APP } from '@/routes';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { TiWaves } from 'react-icons/ti';
import Block from '@/components/Block';
import Container from '@/components/Containers';
import User from './User.client';
import Locale from './Locale.client';
import Theme from './Theme.client';
import Search from '@/components/Controls/Search';
import { TLocale } from '@/types';

function Server() {
	const t = useTranslations();
	const locale = useLocale();

	const localeProps: Parameters<typeof Locale>[0] = {
		messages: {
			en: { abr: t('i18n.en.abr'), title: t('i18n.en.title') },
			ru: { abr: t('i18n.ru.abr'), title: t('i18n.ru.title') },
			uk: { abr: t('i18n.uk.abr'), title: t('i18n.uk.title') },
		},
		active: locale as TLocale,
	};

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
								<div className='mr-2 md:mr-10'>
									<Search placeholder={t('button.search')} />
								</div>
								<div className='flex gap-2'>
									<Locale {...localeProps} />
									<Theme />
									<User />
								</div>
							</div>
						</div>
					</Container>
				</Block>
			</nav>
		</>
	);
}

export default Server;
