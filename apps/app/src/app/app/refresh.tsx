'use client';
import { useEffect, useLayoutEffect } from 'react';
import { API } from '@/routes';
import { useRouter } from 'next/navigation';
import { ms } from '@/utils/datetime';

function Refresh({ forceUpdate }: { forceUpdate: boolean }) {
	const router = useRouter();

	useLayoutEffect(() => {
		if (!forceUpdate) return;
		fetch(API.AUTH_REFRESH_TOKEN)
			.then((response) => response.json())
			.then(({ success }) => {
				if (success) router.refresh();
			});
	}, [forceUpdate, router]);

	useEffect(() => {
		const timer = setInterval(() => {
			fetch(API.AUTH_REFRESH_TOKEN)
				.then((response) => response.json())
				.catch(() => {
					router.refresh();
				});
		}, ms(process.env.NEXT_PUBLIC_REFRESH_TOKEN_INTERVAL!));
		return () => clearInterval(timer);
	}, []);

	return null;
}

export default Refresh;
