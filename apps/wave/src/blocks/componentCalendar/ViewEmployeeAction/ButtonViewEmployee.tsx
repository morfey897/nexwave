import { useTranslations } from 'next-intl';
import Button from '~/components/buttons/Button';
import CalendarIcon from '~/icons/CalendarIcon';
import UnionIcon from '~/icons/UnionIcon';

const ButtonViewEmployee = () => {
	const t = useTranslations();

	return (
		<div className='mt-5 flex justify-end'>
			<div className='flex flex-col gap-2 md:flex-row'>
				<div className='w-full'>
					<Button message={t('button.add_vacation')} icon={<UnionIcon />} />
				</div>
				<div className='w-full'>
					<Button
						message={t('button.assign_to_event')}
						icon={<CalendarIcon />}
					/>
				</div>
			</div>
		</div>
	);
};

export default ButtonViewEmployee;
