import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Button from '~/components/controls/Button';
import Spinner from '~/components/spinner';

const ButtonEditViewAction = ({
	pending,
	className,
}: { pending?: boolean } & React.HTMLAttributes<HTMLDivElement>) => {
	const t = useTranslations();

	return (
		<div className={clsx('flex justify-end', className)}>
			<div className='flex flex-row gap-2'>
				<div className='w-[108px]'>
					<Button
						message={t('button.cancel')}
						disabled={pending}
						type='reset'
					/>
				</div>
				<div className='w-[94px]'>
					<Button
						message={t('button.save')}
						variant='primary'
						type='submit'
						icon={pending ? <Spinner /> : undefined}
						disabled={pending}
					/>
				</div>
			</div>
		</div>
	);
};

export default ButtonEditViewAction;
