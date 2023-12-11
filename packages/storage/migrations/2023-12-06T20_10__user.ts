import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  console.log('MIGRATION_FILE');
	await db.schema
		.createTable('user')
		.addColumn('uid', 'serial', (col) => col.primaryKey())
		.addColumn('name', 'varchar(255)')
		.addColumn('surname', 'varchar(255)')
		.addColumn('avatar', 'varchar(511)')
		.addColumn('gender', 'char(2)')
		.addColumn('birthday', 'date')
		.addColumn('bio', 'text')
		.addColumn('created_at', 'timestamp', (col) =>
			col.notNull().defaultTo(sql`now()`),
		)
		.addColumn('last_visit_at', 'timestamp')
		.addColumn('last_login_at', 'timestamp')
		.addColumn('contacts', 'jsonb')
		.execute();

	const result = await db
		.insertInto('user')
		.values({ name: 'Name', surname: 'Last' })
		.executeTakeFirst();

	console.log('result', result);
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('user').execute();
}
