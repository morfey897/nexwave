'use client';
import { Button, IButtonProps } from '@/components/Button';
import { useCallback, useEffect, useState } from 'react';

import { useSearchParams, useRouter } from 'next/navigation';
import { S_PARAMS } from '@nw/config';
import { TAB_GENERAL } from './config';
import Spinner from '@/components/Spinner';

function Tab({
	name,
	icon,
	...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & IButtonProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [pending, setPending] = useState(false);

	useEffect(() => {
		const tab = searchParams.get(S_PARAMS.TAB);
		if (tab === name || (!tab && name === TAB_GENERAL)) {
			setPending(false);
		}
	}, [searchParams, name]);

	const onClick = useCallback(
		(event: React.MouseEvent) => {
			setPending(true);
			const clone = new URLSearchParams(searchParams);
			if (name === TAB_GENERAL) {
				clone.delete(S_PARAMS.TAB);
			} else {
				clone.set(S_PARAMS.TAB, name!);
			}
			clone.delete(S_PARAMS.ACTIVE);
			const str = clone.toString();
			router.push(`?${str}`);
		},
		[router, searchParams, name],
	);

	return (
		<Button
			onClick={onClick}
			name={name}
			icon={icon}
			{...rest}
			iconAfter={pending && <Spinner />}
		/>
	);
}
export default Tab;
