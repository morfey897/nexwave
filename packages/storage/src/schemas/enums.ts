import { pgEnum } from 'drizzle-orm/pg-core';

//////////// Enums ////////////
export const genderEnum = pgEnum('gender', ['male', 'female', 'none']);
export const statusEnum = pgEnum('status', ['draft', 'on', 'pause', 'off']);
export const colorEnum = pgEnum('color', [
	'red',
	'green',
	'blue',
	'yellow',
	'indigo',
	'orange',
	'skyblue',
	'purple',
	'pink',
	'gray',
]);
