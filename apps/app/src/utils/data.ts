import { ICurrentUser } from '@/types/user';

export const abbreviation = (user: ICurrentUser | null) => {
  if (!user) return '';
	let abbrev = '';
	if (user.name && user.surname) {
		abbrev = user.name[0] + user.surname[0];
	} else {
		const [first, last] = user.email.split('@');
		abbrev = (
			first
				.split('.')
				.map((v) => v[0])
				.join('') + last[0]
		).slice(0, 2);
	}
	return abbrev.toUpperCase();
};

export const fullname = (user: ICurrentUser | null) =>
	[user?.name, user?.surname].filter((v) => !!v).join(' ');
