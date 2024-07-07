/* eslint-disable @typescript-eslint/no-unused-vars */
import { IEmployee } from '@nw/storage';
import { BADGES, SCHEDULE, NAME, ACCESS, ACTIONS } from '~/constants/keys';
import NameRenderer from './NameRenderer';
import AccessRenderer from './AccessRenderer';
import ActionsRenderer from './ActionsRenderer';
import BadgesGenerator from './BadgesRenderer';
import TicketsRenderer from './ScheduleRenderer';

const factory = (key: string, item: IEmployee) => {
	switch (key) {
		case NAME:
			return <NameRenderer item={item} />;
		case BADGES:
			return <BadgesGenerator item={item} />;
		case SCHEDULE:
			return <TicketsRenderer item={item} />;
		case ACCESS:
			return <AccessRenderer item={item} />;
		case ACTIONS:
			return <ActionsRenderer item={item} />;
		default:
			return null;
	}
};

export default factory;
