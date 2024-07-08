import React from 'react';
import ThreeDotsVerticalIcon from '~/icons/ThreeDotsVerticalIcon';
import { Flex } from '~/components/layout';
import { IClient } from '@nw/storage';

const ActionsRenderer = ({ item }: { item: IClient }) => (
	<Flex>
		<button type='button' aria-label='More options' className='ml-4'>
			<ThreeDotsVerticalIcon />
		</button>
	</Flex>
);

export default ActionsRenderer;
