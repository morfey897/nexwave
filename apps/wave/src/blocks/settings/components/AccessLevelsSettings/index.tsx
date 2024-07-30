import Button from '~/components/controls/Button';
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
		<div className='mt-3 w-[150px]'>
			<Button
				className='text-user-selected border-user-selected'
				message='Add row'
				icon={<RoundedPlus />}
			/>
		</div>
		<div className='flex justify-end'>
			<div className='flex flex-row gap-2'>
				<div className='w-[108px]'>
					<Button message='Cancel' />
				</div>
				<div className='w-[94px]'>
					<Button message='Save' variant='primary' />
				</div>
			</div>
		</div>
	</div>
);

export default AccessLevelsSettings;
