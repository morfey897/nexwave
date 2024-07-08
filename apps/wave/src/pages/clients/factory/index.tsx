/* eslint-disable @typescript-eslint/no-unused-vars */
import ProjectPic from '~/components/picture/PersonPic';
import ThreeDotsVerticalIcon from '~/icons/ThreeDotsVerticalIcon';
import { Flex } from '~/components/layout';
import { IClient } from '@nw/storage';
import { useDateLocale } from '~/hooks/datetime';
import { differenceInDays, format } from 'date-fns';
import {
	BADGES,
	LAST_VISIT,
	NAME,
	SEASON_TICKETS,
	ACTIONS,
} from '~/constants/keys';
import NameRenderer from './NameRenderer';
import LastVisitRenderer from './LastVisitRenderer';
import ActionsRenderer from './ActionsRenderer';
import BadgesGenerator from './BadgesRenderer';
import TicketsRenderer from './TicketsRenderer';

const factory = (key: string, item: IClient) => {
	switch (key) {
		case NAME:
			return <NameRenderer item={item} />;
		case BADGES:
			return <BadgesGenerator item={item} />;
		case SEASON_TICKETS:
			return <TicketsRenderer item={item} />;
		case LAST_VISIT:
			return <LastVisitRenderer item={item} />;
		case ACTIONS:
			return <ActionsRenderer item={item} />;
		default:
			return null;
	}
};

export default factory;
