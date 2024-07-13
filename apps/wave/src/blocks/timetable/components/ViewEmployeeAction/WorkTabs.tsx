import { WorkViewEmployeeContent } from '~/blocks/employees/components/ViewEmployeeAction/ViewEmployeeContent';
import ButtonViewEmployee from './ButtonViewEmployee';
import EmployeeActionContentLayout from '~/blocks/employees/components/ViewEmployeeAction/EmployeeActionContentLayout';

function WorkTabs() {
	return (
		<div className='bg-secondary mt-2 flex h-full flex-col overflow-auto'>
			<div className='flex w-auto flex-col space-y-4 md:w-[30rem]'>
				{WorkViewEmployeeContent.map((item, index) => (
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

export default WorkTabs;
