import 'dotenv/config';
import { promises as fs } from 'fs';
import { createDB, orm } from '@/db';
import {
	Users,
	Projects,
	Clients,
	Branches,
	ProjectUser,
	ProjectClient,
	Events,
} from '@/schemas';
import ms from 'ms';
import { parse } from 'csv-parse/sync';

const PRIORITY: Record<string, number> = {
	users: 1,
	clients: 2,
	projects: 3,
	branches: 4,
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

const [, , path, seed] = process.argv;
void (async function () {
	const timestamp = new Date().getTime();
	console.warn('SEED START...');
	const { db, destroy } = createDB({
		connectionString: process.env.POSTGRES_URL!,
	});

	const directory = path || './seed';
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
				break;
			}
			case 'branches': {
				for (const record of records) {
					await db
						.insert(Branches)
						.values({
							...record,
							langs: record.langs ? JSON.parse(record.langs) : undefined,
							address: record.address ? JSON.parse(record.address) : undefined,
							contacts: record.contacts
								? JSON.parse(record.contacts)
								: undefined,
							spaces: record.spaces ? JSON.parse(record.spaces) : undefined,
						})
						.onConflictDoUpdate({
							target: Branches.id,
							set: skipIfEmpty({
								...record,
								langs: record.langs ? JSON.parse(record.langs) : undefined,
								address: record.address
									? JSON.parse(record.address)
									: undefined,
								contacts: record.contacts
									? JSON.parse(record.contacts)
									: undefined,
								spaces: record.spaces ? JSON.parse(record.spaces) : undefined,
							}),
						});
				}
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
				break;
		}
		console.log(`Seeding ${id} done.`);
	}

	destroy();
	console.warn('\nSEED END.', ms(new Date().getTime() - timestamp));
})();
