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
			<div className='relative h-[80px] w-full' />
			<nav className='fixed top-0 z-30 w-full bg-white shadow dark:bg-gray-800'>
				<Link
					href={APP}
					className='absolute top-4 flex items-center gap-2 text-xl font-semibold text-gray-900 lg:left-6 dark:text-white'
				>
					<TiWaves size={52} />
					<p className='hidden lg:block'>{process.env.NEXT_PUBLIC_TITLE}</p>
					<p className='hidden md:block lg:hidden'>
						{process.env.NEXT_PUBLIC_TITLE_SHORT}
					</p>
				</Link>
				<Block>
					<Container>
						<div className='mx-auto py-4'>
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
