'use client';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import * as ErrorCodes from '@/errorCodes';
import { APP } from '@/routes';
import Link from 'next/link';

/**
 * Default error messages
 * @param param0
 * @returns
 */
function DefaultNode({ errorKey }: { errorKey: string }) {
	const t = useTranslations();

	switch (errorKey) {
		case ErrorCodes.USER_UNAUTHORIZED:
			return t.rich('error.unauthorized_rt', {
				button: (chunks) => (
					<Link
						href={APP}
						title={'Go to the start page'}
						className='cursor-pointer text-blue-500 underline dark:text-blue-400'
					>
						{chunks}
					</Link>
				),
			});
		case ErrorCodes.ACCESS_DENIED:
			return t('error.access_denied');
		case ErrorCodes.CREATE_FAILED:
			return t('error.create_failed');
		case ErrorCodes.UPDATE_FAILED:
			return t('error.update_failed');
		case ErrorCodes.DELETE_FAILED:
			return t('error.delete_failed');
	}

	return t('error.wrong');
}

function ErrorCopy({
	code,
	codes,
	className,
	children,
	...rest
}: {
	codes: Record<string, React.ReactNode>;
	code: string | null | undefined;
} & React.HTMLAttributes<HTMLParagraphElement>) {
	const t = useTranslations();
	const copy = useMemo(() => {
		if (!code) return null;

		for (let [key, value] of Object.entries(codes)) {
			if (code.includes(key)) {
				return value === true ? <DefaultNode errorKey={key} /> : value;
			}
		}

		return t('error.wrong');
	}, [code, codes, t]);
	return (
		<p
			className={clsx(
				'hyphens-auto break-words text-xs text-red-600 dark:text-red-400',
				className
			)}
			{...rest}
		>
			{copy}
		</p>
	);
}

export default ErrorCopy;
