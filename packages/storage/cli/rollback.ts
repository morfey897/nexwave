import 'dotenv/config';
import { program, InvalidArgumentError } from 'commander';

import * as path from 'node:path';
import fs from 'node:fs/promises';

import db from '../lib/db';
import { Migrator, FileMigrationProvider } from 'kysely';

const migrator = new Migrator({
	db,
	provider: new FileMigrationProvider({
		fs,
		path,
		migrationFolder: path.join(__dirname, '../migrations'),
	}),
});

async function migrateDown(down: number) {
	for await (const _ of new Array(down)) {
		const { error, results } = await migrator.migrateDown();

		results?.forEach((it) => {
			if (it.status === 'Success') {
				console.info(
					`migration "${it.migrationName}" was rollbacked successfully`,
				);
			} else if (it.status === 'Error') {
				console.error(`failed to execute migration "${it.migrationName}"`);
			}
		});

		if (error) {
			console.error('failed to migrate');
			console.error(error);
			process.exit(1);
		}
	}

	await db.destroy();
}

const getNumber = (value: string) => {
	const parsedValue = parseInt(value, 10);
	if (isNaN(parsedValue)) {
		throw new InvalidArgumentError('Not a number');
	}
	return parsedValue;
};

program
	.description('CLI for rollback migration schema of database')
	.option('-d, --down <>', 'transaction rollback', getNumber);
program.parse();

const opts = program.opts();

void (async function () {
	console.warn('ROLLBACK START...', opts.down);
	await migrateDown(opts.down);
	console.warn('ROLLBACK END...');
})();
