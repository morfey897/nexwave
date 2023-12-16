'use client';
import { useEffect } from 'react';
import { API } from '@/routes';
import { useRouter } from 'next/navigation';
import { ms } from '@/utils/datetime';

function RefreshToken() {
	const router = useRouter();

	useEffect(() => {
		const timer = setInterval(() => {
			fetch(API.AUTH_REFRESH_TOKEN)
				.then((response) => response.json())
				.catch(() => {
					router.refresh();
				});
		}, ms(process.env.NEXT_PUBLIC_REFRESH_TOKEN_INTERVAL!));
		return () => clearInterval(timer);
	}, [router]);

	return null;
}

export default RefreshToken;
