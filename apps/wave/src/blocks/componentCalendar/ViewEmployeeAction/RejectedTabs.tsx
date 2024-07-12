import CalendaryViewActionContentLayout from './CalendaryViewActionContentLayout';
import { RejectedContent } from './ViewEmployeeContent';

function RejectedTabs() {
	return (
		<div className='bg-secondary mt-2 flex h-[25rem] flex-col space-y-4 overflow-auto md:h-[35rem] lg:h-1/2'>
			{RejectedContent.map((item, index) => (
				<CalendaryViewActionContentLayout
					key={index}
					name={item.name}
					number={item.number}
					picture={item.picture}
					badge={item.badge}
					iconPlus={item.iconPlus}
				/>
			))}
		</div>
	);
}

export default RejectedTabs;
