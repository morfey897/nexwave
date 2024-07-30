import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Button from '~/components/controls/Button';
import Spinner from '~/components/spinner';

const Buttons = ({
	pending,
	className,
}: { pending?: boolean } & React.HTMLAttributes<HTMLDivElement>) => {
	const t = useTranslations();
	return (
		<div className={clsx('flex flex-row justify-end gap-2', className)}>
			<Button
				message={pending ? undefined : t('button.save')}
				variant='primary'
				type='submit'
				icon={pending ? <Spinner size={20} /> : undefined}
				disabled={pending}
			/>
			<Button message={t('button.cancel')} disabled={pending} type='reset' />
		</div>
	);
};

export default Buttons;
