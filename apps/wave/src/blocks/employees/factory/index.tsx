import { IEmployee } from '@nw/storage';
import { BADGES, SCHEDULE, NAME, ACCESS, ACTIONS } from '~/constants/keys';
import NameRenderer from '~/components/renderers/NameRenderer';
import BadgesRenderer from '~/components/renderers/BadgesRenderer';
import AccessRenderer from './AccessRenderer';
import ActionsRenderer from './ActionsRenderer';
import TicketsRenderer from './ScheduleRenderer';
import { EnumEmployeeBadge, EnumLevel } from '~/constants/enums';

const getLevel = (title: string): EnumLevel => {
	if (
		title === EnumEmployeeBadge.DISMISSED ||
		title === EnumEmployeeBadge.BLOCKED
	)
		return EnumLevel.CRIT;
	if (title === EnumEmployeeBadge.WORKS) return EnumLevel.SUCCESS;
	if (title === EnumEmployeeBadge.VACANCY) return EnumLevel.WARN;
	return EnumLevel.INFO;
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
