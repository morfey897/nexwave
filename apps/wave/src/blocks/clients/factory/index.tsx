/* eslint-disable @typescript-eslint/no-unused-vars */
import { IClient } from '@nw/storage';
import {
	BADGES,
	LAST_VISIT,
	NAME,
	SEASON_TICKETS,
	ACTIONS,
} from '~/constants/keys';
import NameRenderer from '~/components/renderers/NameRenderer';
import LastVisitRenderer from './LastVisitRenderer';
import ActionsRenderer from './ActionsRenderer';
import BadgesRenderer from '~/components/renderers/BadgesRenderer';
import TicketsRenderer from './TicketsRenderer';
import { BadgeLevel } from '~/components/badges/Badge';
import { EnumClientBadge } from '~/constants/enums';

const getLevel = (title: string): BadgeLevel => {
	if (title === EnumClientBadge.PROBLEM || title === EnumClientBadge.INACTIVE) return 'error';
	if (title === EnumClientBadge.LOYAL) return 'success';
	if (title === EnumClientBadge.VIP) return 'warn';
	return 'info';
};

const factory = (key: string, item: IClient) => {
	switch (key) {
		case NAME:
			return (
				<NameRenderer
					item={{
						login: item.login,
						avatar: item.avatar,
						name: item.name,
						surname: item.surname,
						phone: item.contacts.phone,
					}}
				/>
			);
		case BADGES:
			const budges = (item.meta.badges || '')
				.split(',')
				.filter((badge) => !!badge)
				.map((title) => ({
					title,
					level: getLevel(title.toLowerCase()),
				}));
			return <BadgesRenderer item={budges} />;
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
