import React from 'react';
import ThreeDotsVerticalIcon from '~/icons/ThreeDotsVerticalIcon';
import { Flex } from '~/components/layout';
import { IEmployee } from '@nw/storage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ActionsRenderer = ({ item }: { item: IEmployee }) => (
	<Flex>
		<button type='button' aria-label='More options' className='ml-4'>
			<ThreeDotsVerticalIcon />
		</button>
	</Flex>
);

export default ActionsRenderer;
