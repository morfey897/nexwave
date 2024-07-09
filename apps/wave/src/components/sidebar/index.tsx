'use client';

import clsx from 'clsx';
import * as Collapsible from '@radix-ui/react-collapsible';
import { useEffect, useMemo } from 'react';
import { Box } from '~/components/layout';
import { useDevice } from '~/hooks/device';
import { EnumDeviceType } from '~/constants/enums';
import useNWStore from '~/lib/store';
import { usePathname } from 'next/navigation';
import { useMounted } from '~/hooks/mounted';
import Content from './Content';
import Skeleton from './Skeleton';

const Sidebar = () => {
	const device = useDevice();
	const isMounted = useMounted();
	const ui = useNWStore((state) => state.ui);
	const setUI = useNWStore((state) => state.setUI);
	const pathname = usePathname();

	useEffect(() => {
		if (ui.sidebar === true) {
			setUI({ sidebar: false });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, setUI]);

	return (
		<Box
			className={clsx('relative z-30 w-0 md:w-[54px] lg:w-[250px]')}
			flexShrink='0'
		>
			<Content className='fixed hidden md:block' />
			<Collapsible.Root className='fixed block md:hidden' open={ui.sidebar}>
				<Collapsible.Content className='animate-slideRightAndFade data-[state=closed]:animate-slideLeftAndFade shadow-md will-change-[opacity,transform]'>
					<Content />
				</Collapsible.Content>
			</Collapsible.Root>
		</Box>
	);
};

export default Sidebar;
