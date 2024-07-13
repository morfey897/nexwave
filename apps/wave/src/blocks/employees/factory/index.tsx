import { IEmployee } from '@nw/storage';
import { BADGES, SCHEDULE, NAME, ACCESS, ACTIONS } from '~/constants/keys';
import NameRenderer from '~/components/renderers/NameRenderer';
import BadgesGenerator from '~/components/renderers/BadgesRenderer';
import AccessRenderer from './AccessRenderer';
import ActionsRenderer from './ActionsRenderer';
import TicketsRenderer from './ScheduleRenderer';
import { BadgeLevel } from '~/components/badges/Badge';

const getLevel = (title: string): BadgeLevel => {
	if (title === 'dismissed') return 'error';
	if (title === 'works') return 'success';
	if (title === 'vacancy') return 'warn';
	return 'info';
};

const factory = (key: string, item: IEmployee) => {
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
			return <BadgesGenerator item={budges} />;
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
