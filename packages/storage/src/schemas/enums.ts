import { pgEnum } from 'drizzle-orm/pg-core';

//////////// Enums ////////////
export const genderEnum = pgEnum('gender', ['male', 'female', 'none']);

