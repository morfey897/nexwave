import 'dotenv/config';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { createPool } from '@vercel/postgres';
import {
	pgTable,
	serial,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from 'drizzle-orm/pg-core';
import { eq, and, sql } from 'drizzle-orm';

const Kysely = pgTable('kysely_migration', {
	name: text('name').notNull(),
	timestamp: timestamp('timestamp').notNull(),
});

const UserTable = pgTable(
	'user',
	{
		uid: serial('uid').primaryKey(),
		name: varchar('name', { length: 255 }).notNull(),
		email: varchar('email', { length: 255 }).notNull().unique(),
		birthday: timestamp('birthday'),
		avatar: text('avatar'),
		created_at: timestamp('created_at').defaultNow().notNull(),
	},
	// (users) => {
	// 	return {
	// 		uniqueIdx: uniqueIndex('unique_idx').on(users.email),
	// 	};
	// },
);

const CredentialTable = pgTable(
	'credential',
	{
		uid: serial('uid').primaryKey(),
		email: varchar('email', { length: 255 }).notNull().unique(),
		password: text('password').notNull(),
	},
	// (users) => {
	// 	return {
	// 		uniqueIdx: uniqueIndex('unique_idx').on(users.email),
	// 	};
	// },
);

void (async function () {
	const pool = createPool({
		connectionString: process.env.NEXT_PRIVATE_POSTGRES_URL,
	});
	const db = drizzle(pool);
	// const result = await db
	// 	.update(UserTable)
	// 	.set({
	// 		name: 'Mr.s Test',
	// 	})
	// 	.where(eq(UserTable.uid, 5))
	// 	.returning({ insertId: UserTable.uid, name: UserTable.name });

	const password = 'test100';
	const email = 'andrew2@test.com';
	// const result = await db.transaction(async (tx) => {
	// 	await tx.insert(UserTable).values({
	// 		name: 'Andrew',
	// 		email: 'andrew2@test.com',
	// 	});
	// 	await tx.insert(CredentialTable).values({
	// 		email: 'andrew2@test.com',
	// 		password: sql<string>`crypt(${password}, gen_salt('bf'))`,
	// 	});
	// });

	// sql`c.password = crypt(${password}, c.password)`
	//
	// const result = await db.select()
	// .from(UserTable)
	// .innerJoin(CredentialTable, and(eq(CredentialTable.email, UserTable.email), eq(CredentialTable.email, email), eq(CredentialTable.password, sql<string>`crypt(${password}, password)`)))
	// ;
	// await db.select().from(UserTable);
	// const result = await db.sql`BEGIN;
	// INSERT INTO credential (email, password)
	// VALUES ('test100@test.com', crypt('test100', gen_salt('bf')));
	// INSERT INTO "user" (email, name, created_at, last_visit_at, last_login_at)
	// VALUES ('test100@test.com', 'Test100', now(), now(), now());
	// COMMIT;`;

	// const result = await db.sql`
	// INSERT INTO "user" (email, name, created_at, last_visit_at, last_login_at)
	// VALUES ('test100@test.com', 'Test100', now(), now(), now());
	// `;
	const result = await db.delete(UserTable);

	db.query('SELECT * FROM "user"')

	console.log(result);
	pool.end();
})();
