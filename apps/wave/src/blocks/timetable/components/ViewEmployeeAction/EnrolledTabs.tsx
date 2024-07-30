import Button from '~/components/controls/Button';
import CalendaryViewActionContentLayout from './CalendaryViewActionContentLayout';
import { EnrolledContent } from './ViewEmployeeContent';
import PersonIconFill from '~/icons/PersonIconFill';

function EnrolledTabs() {
	return (
		<div className='bg-secondary mt-2 flex h-[25rem] flex-col space-y-4 overflow-auto md:h-[35rem] lg:h-1/2'>
			{EnrolledContent.map((item, index) => (
				<CalendaryViewActionContentLayout
					key={index}
					name={item.name}
					number={item.number}
					picture={item.picture}
					badge={item.badge}
					iconBlock={item.iconBlock}
					iconHidden={item.iconHidden}
				/>
			))}
			<div className='flex w-full justify-end p-2'>
				<div className='w-[125px]'>
					<Button isFullWidth message='Enroll' icon={<PersonIconFill />} />
				</div>
			</div>
		</div>
	);
}

export default EnrolledTabs;
