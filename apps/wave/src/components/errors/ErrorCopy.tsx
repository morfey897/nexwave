'use client';

import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import * as ErrorCodes from '~errorCodes';
import ButtoBlock from '~components/richText/ButtonBlock';

/**
 * Default error messages
 * @param param0
 * @returns
 */
function DefaultNode({ errorKey }: { errorKey: string }) {
	const t = useTranslations();

	switch (errorKey) {
		case ErrorCodes.USER_UNAUTHORIZED: {
			return t.rich('error.unauthorized_rt', {
				button: ButtoBlock,
			});
		}
		case ErrorCodes.ACCESS_DENIED:
			return t('error.access_denied');
		case ErrorCodes.CREATE_FAILED:
			return t('error.create_failed');
		case ErrorCodes.UPDATE_FAILED:
			return t('error.update_failed');
		case ErrorCodes.DELETE_FAILED:
			return t('error.delete_failed');
		default:
			return t('error.wrong');
	}

	return null;
}

function ErrorCopy({
	codes,
	list,
	className,
	...rest
}: {
	list: Record<string, React.ReactNode>;
	codes: string[] | null | undefined;
} & React.HTMLAttributes<HTMLParagraphElement>) {
	const t = useTranslations();
	const copy = useMemo(() => {
		if (!codes) return null;

		const entries = Object.entries(list);
		const defaultNode = entries.find(([key]) => codes.includes(key));

		if (defaultNode) {
			return defaultNode[1] === true ? (
				<DefaultNode errorKey={defaultNode[0]} />
			) : (
				defaultNode[1]
			);
		}

		return t('error.wrong');
	}, [codes, list, t]);

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
