import {
	pgEnum,
} from 'drizzle-orm/pg-core';

//////////// Enums ////////////
export const genderEnum = pgEnum('gender', ['male', 'female', 'none']);
export const statusEnum = pgEnum('status', ['draft', 'on', 'pause', 'off']);
