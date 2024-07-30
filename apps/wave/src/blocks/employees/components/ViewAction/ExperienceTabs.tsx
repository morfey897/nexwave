import ButtonViewEmployee from './ButtonViewEmployee';
import EmployeeActionContentLayout from './EmployeeActionContentLayout';
import { ExperienceViewEmployeeContent } from './ViewEmployeeContent';

function ExperienceTabs() {
	return (
		<div className='bg-secondary mt-2 flex flex-col'>
			<div className='flex w-auto flex-col space-y-4 md:w-[30rem]'>
				{ExperienceViewEmployeeContent.map((item, index) => (
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

export default ExperienceTabs;
