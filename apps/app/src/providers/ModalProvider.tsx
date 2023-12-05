'use client';
import { Fragment, useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { EnumSearchParams } from '@/types/search';
import { decode } from 'js-base64';

type TModal = {
	name: string;
	params: Record<string, string | number | boolean | null>;
};

function ModalProvider({
	children,
}: {
	children: (
		name: TModal['name'],
		params: TModal['params'],
	) => JSX.Element | null;
}) {
	const searchParams = useSearchParams();
	const [dialogs, setDialogs] = useState<Array<TModal>>([]);

	useEffect(() => {
		const newList = [];
		for (const [key, value] of searchParams.entries()) {
			if (key.startsWith(EnumSearchParams.MODAL)) {
				let params = {};
				try {
					params = JSON.parse(decode(value));
				} catch (error) {
					params = {};
				}
				const name = key.replace(EnumSearchParams.MODAL, '');

				newList.push({
					name,
					params,
				});
			}
		}
		setDialogs(newList);
	}, [searchParams]);

	return (
		<div className='absolute' id='modal-provider'>
			{dialogs.map(({ name, params }) => (
				<Fragment key={name}>{children(name, params)}</Fragment>
			))}
		</div>
	);
}

export default ModalProvider;
