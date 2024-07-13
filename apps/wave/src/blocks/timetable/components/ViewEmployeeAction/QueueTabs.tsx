import Button from '~/components/buttons/Button';
import { RoundedPlus } from '~/icons';

function QueueTabs() {
	return (
		<div className='flex w-full justify-end p-2'>
			<div className='w-auto'>
				<Button
					message='Add to queue'
					icon={<RoundedPlus fill='#637381' width='24' height='24' />}
				/>
			</div>
		</div>
	);
}

export default QueueTabs;
