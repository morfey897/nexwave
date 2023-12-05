'use client';
import { useState, useEffect, Fragment } from 'react';
import { useSearchParams } from 'next/navigation';
import { hasModal, pureName } from '@/utils/modal';

function ModalProvider({
	children,
}: {
	children: (name: string) => JSX.Element | null;
}) {
	const searchParams = useSearchParams();
	const [modals, setModals] = useState<Array<string>>([]);

	useEffect(() => {
		const newList: Array<string> = [];
		for (const [key] of searchParams.entries()) {
			const name = pureName(key);
			if (hasModal(name, searchParams)) {
				newList.push(name);
			}
		}
		setModals((modals) => {
			if (modals.length !== newList.length) return newList;
			return newList.every((modal, index) => modals[index] === modal)
				? modals
				: newList;
		});
	}, [searchParams]);

	return (
		<div className='absolute' id='modal-provider'>
			{modals.map((name) => (
				<Fragment key={name}>{children(name)}</Fragment>
			))}
		</div>
	);
}

export default ModalProvider;
