import { useTranslations } from 'next-intl';
import Button from '~/components/controls/Button';
import Spinner from '~/components/spinner';

const ButtonViewEmployee = ({ pending }: { pending?: boolean }) => {
	const t = useTranslations();

	return (
		<div className='flex justify-end'>
			<div className='flex flex-row gap-2'>
				<div className='w-[108px]'>
					<Button message={t('button.cancel')} disabled={pending} />
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

export default ButtonViewEmployee;
