import Button from '~/components/buttons/Button';
import FirstHallBlock from './components/FirstHallBlock';
import SecondHallBlock from './components/SecondHallBlock';
import RoundedPlus from '~/icons/RoundedPlus';

const HallsSettings = () => (
	<div className='flex flex-col gap-5'>
		<span className='font-inter text-xl font-semibold leading-7'>Halls</span>
		<div className='flex flex-col gap-5'>
			<FirstHallBlock />
			<SecondHallBlock />
			<Button
				message='Add Hall'
				className='text-user-selected w-[150px]'
				icon={<RoundedPlus />}
			/>
		</div>
		<div className='flex justify-end'>
			<div className='flex flex-row gap-2'>
				<Button message='Cancel' className='w-[108px]' />
				<Button message='Save' variant='primary' className='w-[94px]' />
			</div>
		</div>
	</div>
);

export default HallsSettings;
