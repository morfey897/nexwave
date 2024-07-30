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
import { EnumClientBadge, EnumLevel } from '~/constants/enums';

const getLevel = (title: string): EnumLevel => {
	if (title === EnumClientBadge.PROBLEM || title === EnumClientBadge.INACTIVE)
		return EnumLevel.CRIT;
	if (title === EnumClientBadge.LOYAL) return EnumLevel.SUCCESS;
	if (title === EnumClientBadge.VIP) return EnumLevel.WARN;
	return EnumLevel.INFO;
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
		case BADGES: {
			const budges = (item.meta.badges || '')
				.split(',')
				.filter((badge) => !!badge)
				.map((label) => ({
					label,
					value: label,
					level: getLevel(label.toLowerCase()),
				}));
			return <BadgesRenderer item={budges} />;
		}
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
