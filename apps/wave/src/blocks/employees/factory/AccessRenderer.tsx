import React from 'react';
import { IEmployee } from '@nw/storage';
import Roles from '~/components/roles';

const AccessRenderer = ({ item }: { item: IEmployee }) => (
	<Roles role={item.role} />
);

export default AccessRenderer;
