import React from 'react';

import { EnumRole } from '~/constants/enums';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';

const Roles = Object.values(EnumRole) as string[];

const CustomRole = (role: string) => {
	const roleComponent = () => <span className='text-blue-500'>{role}</span>;
	return roleComponent;
};

const Role = ({ className, role }: { className?: string; role?: string }) => {
	const t = useTranslations();
	return (
		<p className={clsx(className)}>
			{/* Has role in translation */}
			{role && Roles.includes(role) && t(`crud.role.${role}`)}
			{/* Has not role in translation */}
			{role &&
				!Roles.includes(role) &&
				t.rich('crud.role.your_role_rt', {
					span: CustomRole(role),
				})}
		</p>
	);
};

export default Role;
