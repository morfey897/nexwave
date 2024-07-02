'use client';
import BaseInput, { type TInput } from './BaseInput';
import { useRef, useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';

function Masked({
	maskedProps,
	icon,
	...props
}: TInput & {
	maskedProps?: Parameters<typeof Inputmask>[0];
}) {
	const [masked, setMasked] = useState(false);
	const maskedRef = useRef<Inputmask.Static | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const init = () => {
			if (inputRef.current && maskedRef.current) {
				maskedRef.current(maskedProps).mask(inputRef.current);
				setMasked(true);
			}
		};

		if (!maskedRef.current) {
			import('inputmask').then(({ default: Inputmask }) => {
				maskedRef.current = Inputmask;
				init();
			});
		} else {
			init();
		}
	}, [maskedProps]);

	return (
		<BaseInput {...props} ref={inputRef} icon={!masked ? <Spinner /> : icon} />
	);
}

export default Masked;
