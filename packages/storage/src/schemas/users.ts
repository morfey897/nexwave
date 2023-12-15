import { sql } from 'drizzle-orm';
import { pgTable, serial, varchar, timestamp, date, text, jsonb, uuid, boolean } from 'drizzle-orm/pg-core';

export const user = pgTable('users', {
	id: serial('id').primaryKey(),
	uuid: uuid('uuid').default(sql`gen_random_uuid()`).notNull(),
	email: varchar('email', { length: 511 }).notNull().unique(),
	email_verified: boolean('email_verified').default(false).notNull(),
  password: text('password'),
	name: varchar('name', { length: 255 }),
	surname: varchar('surname', { length: 255 }),
	birthday: date('birthday'),
	avatar: text('avatar'),
	gender: varchar('gender', { length: 2, enum: ['m', 'f', 'o'] }),
	bio: text('bio'),
	created_at: timestamp('created_at').defaultNow().notNull(),
  last_login_at: timestamp('last_login_at'),
  contacts: jsonb('contacts'),
});
