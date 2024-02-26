'use client';
import Input from './Input';
import { useRef, useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';

function Masked({
	maskedProps,
	icon,
	...props
}: Parameters<typeof Input>[0] & {
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
		<Input
			{...props}
			ref={inputRef}
			icon={!masked ? <Spinner /> : icon}
		/>
	);
}

export default Masked;
