import { useTranslations } from 'next-intl';
import Button from '~/components/buttons/Button';

const ButtonEditViewActionCallendar = () => {
	const t = useTranslations();

	return (
		<div className='mt-5 flex justify-end'>
			<div className='flex flex-row gap-2'>
				<div className='w-[108px]'>
					<Button message={t('button.cancel')} />
				</div>
				<div className='w-[94px]'>
					<Button message={t('button.save')} variant='primary' />
				</div>
			</div>
		</div>
	);
};

export default ButtonEditViewActionCallendar;
