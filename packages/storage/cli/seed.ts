import 'dotenv/config';
import { getTableName } from 'drizzle-orm';
import { promises as fs } from 'fs';
import { createDB, orm } from '@/db';
import {
	Users,
	Projects,
	Clients,
	ProjectUser,
	ProjectClient,
	Events,
} from '@/schemas';
import ms from 'ms';
import { parse } from 'csv-parse/sync';
import { join } from 'path';
import { PgTableWithColumns } from 'drizzle-orm/pg-core';

const PRIORITY: Record<string, number> = {
	users: 1,
	clients: 2,
	projects: 3,
	project_user: 5,
	project_client: 6,
	events: 7,
};

function skipIfEmpty(value: Object) {
	return Object.entries(value).reduce((acc, [key, value]) => {
		if (value) {
			acc[key] = value === 'NULL' ? null : value;
		}
		return acc;
	}, {} as any);
}

async function updateMaxValue(
	db: ReturnType<typeof createDB>['db'],
	config: { tableName: string; id: string }
) {
	const nextVal = (
		await db.execute(
			orm.sql`SELECT nextval(pg_get_serial_sequence(${config.tableName}, ${config.id})) as neeext`
		)
	).rows[0].neeext;

	const maxId = (
		await db.execute(
			orm.sql`SELECT MAX(${config.id}) as maxId FROM ${orm.sql.raw(config.tableName)}`
		)
	).rows[0].maxid;

	if (Number(maxId) + 1 > Number(nextVal)) {
		await db.execute(
			orm.sql`SELECT setval(pg_get_serial_sequence(${orm.sql.raw(config.tableName)}, ${config.id}), ${Number(maxId) + 1});`
		);
	}
}

const [, , path, seed] = process.argv;
void (async function () {
	const timestamp = new Date().getTime();
	console.warn('SEED START...');
	const { db, destroy } = createDB({
		connectionString: process.env.POSTGRES_URL!,
	});

	const directory = join('./seeds', path || '');
	const files = (await fs.readdir(directory))
		.map((file) => ({
			id: file.toLowerCase().split('.')[0],
			file,
		}))
		.sort((a, b) => PRIORITY[a.id] - PRIORITY[b.id]);
	for (const { id, file } of files) {
		if (seed && seed !== id) continue;
		let records;
		let content;
		try {
			content = (await fs.readFile(`${directory}/${file}`, 'utf-8')).replace(
				/"{2}/g,
				'\\"'
			);
			records = parse(content, {
				columns: true,
				skip_empty_lines: true,
				trim: true,
				delimiter: ',',
				escape: '\\',
				quote: '"',
			});
		} catch (error: any) {
			console.error(`Error reading ${id} file: ${error.message}`, content);
			break;
		}

		console.log(`\n\nSeeding ${id}...`, seed ? records : '');

		switch (id) {
			case 'users': {
				for (const record of records) {
					await db
						.insert(Users)
						.values({
							...record,
							password: orm.sql<string>`crypt(${record.password}, gen_salt('bf'))`,
							contacts: record.contacts
								? JSON.parse(record.contacts)
								: undefined,
						})
						.onConflictDoUpdate({
							target: Users.id,
							set: {
								...skipIfEmpty({
									...record,
									contacts: record.contacts
										? JSON.parse(record.contacts)
										: undefined,
								}),
								password: orm.sql<string>`crypt(${record.password}, gen_salt('bf'))`,
							},
						});
				}
				await updateMaxValue(db, {
					tableName: getTableName(Users),
					id: Users.id.name,
				});
				break;
			}
			case 'projects': {
				for (const record of records) {
					await db
						.insert(Projects)
						.values({
							...record,
							langs: record.langs ? JSON.parse(record.langs) : undefined,
							roles: record.roles ? JSON.parse(record.roles) : undefined,
						})
						.onConflictDoUpdate({
							target: Projects.id,
							set: skipIfEmpty({
								...record,
								langs: record.langs ? JSON.parse(record.langs) : undefined,
								roles: record.roles ? JSON.parse(record.roles) : undefined,
							}),
						});
				}
				await updateMaxValue(db, {
					tableName: getTableName(Projects),
					id: Projects.id.name,
				});
				break;
			}
			case 'clients': {
				for (const record of records) {
					await db
						.insert(Clients)
						.values({
							...record,
							password: orm.sql<string>`crypt(${record.password}, gen_salt('bf'))`,
							contacts: record.contacts
								? JSON.parse(record.contacts)
								: undefined,
						})
						.onConflictDoUpdate({
							target: Clients.id,
							set: {
								...skipIfEmpty({
									...record,
									contacts: record.contacts
										? JSON.parse(record.contacts)
										: undefined,
								}),
								password: orm.sql<string>`crypt(${record.password}, gen_salt('bf'))`,
							},
						});
				}
				await updateMaxValue(db, {
					tableName: getTableName(Clients),
					id: Clients.id.name,
				});
				break;
			}
			case 'project_user': {
				for (const record of records) {
					await db
						.insert(ProjectUser)
						.values({
							...record,
						})
						.onConflictDoUpdate({
							target: [ProjectUser.projectId, ProjectUser.userId],
							set: skipIfEmpty(record),
						});
				}
				break;
			}
			case 'project_client': {
				for (const record of records) {
					await db
						.insert(ProjectClient)
						.values({
							...record,
						})
						.onConflictDoUpdate({
							target: [ProjectClient.projectId, ProjectClient.clientId],
							set: skipIfEmpty(record),
						});
				}
				break;
			}
			case 'events':
				{
					for (const record of records) {
						await db
							.insert(Events)
							.values({
								...record,
								startAt: record.startAt ? new Date(record.startAt) : new Date(),
								endAt: record.endAt ? new Date(record.endAt) : undefined,
								rrule: record.rrule ? JSON.parse(record.rrule) : undefined,
							})
							.onConflictDoUpdate({
								target: Events.id,
								set: skipIfEmpty({
									...record,
									startAt: record.startAt
										? new Date(record.startAt)
										: undefined,
									endAt: record.endAt ? new Date(record.endAt) : undefined,
									rrule: record.rrule ? JSON.parse(record.rrule) : undefined,
								}),
							});
					}
				}
				await updateMaxValue(db, {
					tableName: getTableName(Events),
					id: Events.id.name,
				});
				break;
		}
		console.log(`Seeding ${id} done.`);
	}

	destroy();
	console.warn('\nSEED END.', ms(new Date().getTime() - timestamp));
})();
