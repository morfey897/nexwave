import { useState } from 'react';
import CheckboxSettings from '../../GeneralSettings/CheckboxSettings';

const AccessLevelsTable = () => {
	const [permissions, setPermissions] = useState({
		viewCalendar: {
			employee: false,
			manager: true,
			owner: true,
			name: 'View Calendar',
		},
		editCalendar: {
			employee: false,
			manager: false,
			owner: true,
			name: 'Edit Calendar',
		},
		viewClients: {
			employee: false,
			manager: true,
			owner: true,
			name: 'View Clients',
		},
		editClients: {
			employee: false,
			manager: true,
			owner: true,
			name: 'Edit Clients',
		},
		enrollClients: {
			employee: false,
			manager: true,
			owner: true,
			name: 'Enroll Clients',
		},
		viewEmployees: {
			employee: false,
			manager: true,
			owner: true,
			name: 'View Employees',
		},
		editEmployees: {
			employee: false,
			manager: true,
			owner: true,
			name: 'Edit Employees',
		},
		employeeSalary: {
			employee: false,
			manager: true,
			owner: true,
			name: 'Employee Salary',
		},
		businessInformation: {
			employee: false,
			manager: true,
			owner: true,
			name: 'Business Information',
		},
		viewDashboard: {
			employee: false,
			manager: true,
			owner: true,
			name: 'View Dashboard',
		},
		editSettings: {
			employee: false,
			manager: true,
			owner: true,
			name: 'Edit Settings',
		},
	});

	const handleCheckboxChange = (func, role) => {
		setPermissions({
			...permissions,
			[func]: { ...permissions[func], [role]: !permissions[func][role] },
		});
	};

	return (
		<table className='w-full table-auto text-left'>
			<thead>
				<tr className='bg-gray-1'>
					<th className='text-primary-text-gray font-inter px-4 py-2 text-sm font-medium leading-6'>
						Function
					</th>
					<th className='text-primary-text-gray font-inter px-4 py-2 text-sm font-medium leading-6'>
						Employee
					</th>
					<th className='text-primary-text-gray font-inter px-4 py-2 text-sm font-medium leading-6'>
						Manager
					</th>
					<th className='text-primary-text-gray font-inter px-4 py-2 text-sm font-medium leading-6'>
						Owner
					</th>
				</tr>
			</thead>
			<tbody>
				{Object.values(permissions).map((func) => (
					<tr key={func.name}>
						<td className='text-primary-text-gray font-inter border-y px-4 py-2 text-sm font-normal leading-6'>
							{func.name}
						</td>
						{['employee', 'manager', 'owner'].map((role) => (
							<td key={role} className='border-y px-4 py-2'>
								<CheckboxSettings
									id={func.name}
									label={func.name}
									onChange={() => handleCheckboxChange(func.name, role)}
									checked={func[role]}
								/>
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default AccessLevelsTable;
