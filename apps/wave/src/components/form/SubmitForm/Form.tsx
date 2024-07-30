'use client';

import * as Form from '@radix-ui/react-form';
import { useEffect, useMemo } from 'react';
import Buttons from './Buttons';
import { useNWAction } from '~/hooks/action';
import { EnumResponseStatus } from '~/constants/enums';
import { useRouter } from 'next/navigation';
import { IResponse } from '~/types';

function SubmitForm<T>({
	hiddens,
	children,
	onSuccess,
	serverAction,
}: {
	hiddens?: Record<string, string>;
	children?: React.ReactNode;
	onSuccess?: (data: T) => void;
	serverAction: (data: FormData) => Promise<IResponse<T>>;
}) {
	const route = useRouter();

	const { result, pending, formProps } = useNWAction(serverAction);

	useEffect(() => {
		if (result?.status === EnumResponseStatus.SUCCESS) {
			if (result.data) {
				onSuccess?.(result.data);
			}
			route.refresh();
		}
	}, [result, route, onSuccess]);

	const hiddenFields = useMemo(
		() =>
			Object.entries(hiddens || {}).map(([name, value]) => (
				<input key={name} type='hidden' name={name} value={value} />
			)),
		[hiddens]
	);

	return (
		<Form.Root {...formProps}>
			{hiddenFields}
			{children}
			<Buttons pending={pending} className='mt-4' />
		</Form.Root>
	);
}

export default SubmitForm;
