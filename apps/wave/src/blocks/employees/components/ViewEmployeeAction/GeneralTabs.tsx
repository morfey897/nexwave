import ButtonViewEmployee from './ButtonViewEmployee';
import EmployeeActionContentLayout from './EmployeeActionContentLayout';
import { GeneralViewEmployeeContent } from './ViewEmployeeContent';

function GeneralTabs() {
	return (
		<div className='bg-secondary flex flex-col'>
			<div className='flex w-auto flex-col space-y-4 md:w-[30rem]'>
				{GeneralViewEmployeeContent.map((item, index) => (
					<EmployeeActionContentLayout
						key={index}
						name={item.name}
						value={item.value}
						picture={item.picture}
					/>
				))}
			</div>
			<ButtonViewEmployee />
		</div>
	);
}

export default GeneralTabs;
