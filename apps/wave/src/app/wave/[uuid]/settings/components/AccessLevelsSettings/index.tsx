import Button from '~/components/buttons/Button';
import AccessLevelsTable from './components/AccessLevelsTable';
import RoundedPlus from '~/icons/RoundedPlus';

const AccessLevelsSettings = () => (
	<div className='flex flex-col gap-5'>
		<span className='font-inter text-xl font-semibold leading-7'>
			Access levels
		</span>
		<div className='overflow-auto'>
			<AccessLevelsTable />
		</div>
		<Button
			className='text-user-selected border-user-selected mt-3 w-[150px]'
			message='Add row'
			icon={<RoundedPlus />}
		/>
		<div className='flex justify-end'>
			<div className='flex flex-row gap-2'>
				<Button message='Cancel' className='w-[108px]' />
				<Button message='Save' variant='primary' className='w-[94px]' />
			</div>
		</div>
	</div>
);

export default AccessLevelsSettings;
