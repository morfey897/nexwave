import { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db
		.insertInto('user')
		.values({ name: 'Name', surname: 'Last' })
		.executeTakeFirst();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('user').execute();
}
