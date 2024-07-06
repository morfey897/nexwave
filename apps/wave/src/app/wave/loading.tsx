import React from 'react';
import HeaderSkeleton from '~/components/skeleton/HeaderSkeleton';
import DashboardSkeleton from '~/components/skeleton/DashboardSkeleton';

export default function Loading() {
	return (
		<>
			<header>
				<HeaderSkeleton />
			</header>
			<main>
				<DashboardSkeleton />
			</main>
		</>
	);
}
