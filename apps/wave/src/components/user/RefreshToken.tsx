'use client';

import { useEffect } from 'react';
import { EnumApiRoutes } from '~enums';
import { useRouter } from 'next/navigation';
import { ms } from '~utils/datetime';

function RefreshToken({ refreshToken }: { refreshToken: string | undefined }) {
	const router = useRouter();

	useEffect(() => {
		const refresh = () => {
			if (!refreshToken) return;
			fetch(EnumApiRoutes.AUTH_REFRESH_TOKEN)
				.then((response) => response.json())
				.catch(() => {
					router.refresh();
				});
		};

		refresh();
		const timer = setInterval(
			refresh,
			ms(process.env.NEXT_PUBLIC_REFRESH_TOKEN_INTERVAL!)
		);
		return () => clearInterval(timer);
	}, [router, refreshToken]);

	return null;
}

export default RefreshToken;
