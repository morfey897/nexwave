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

async function migrateUp(amount: number | undefined) {
	if (typeof amount === 'undefined') {
		const { error, results } = await migrator.migrateToLatest();
		results?.forEach((it) => {
			if (it.status === 'Success') {
				console.info(
					`migration "${it.migrationName}" was executed successfully`,
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
	} else if (typeof amount === 'number') {
		for await (const _ of new Array(amount)) {
			const { error, results } = await migrator.migrateUp();

			results?.forEach((it) => {
				if (it.status === 'Success') {
					console.info(
						`migration "${it.migrationName}" was executed successfully`,
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
	} else {
		throw new Error('Invalid argument');
	}
	await db.destroy();
}

const getNumber = (value: string) => {
	if (typeof value === 'undefined') {
		return undefined;
	}
	const parsedValue = parseInt(value, 10);
	if (isNaN(parsedValue)) {
		throw new InvalidArgumentError('Not a number');
	}
	return parsedValue;
};

program
	.description('CLI for apply migration schema of database')
	.option('-up, --up [number]', 'transaction apply', getNumber);
program.parse();

const opts = program.opts();

void (async function () {
	console.warn('MIGRATION START...');
	await migrateUp(opts.up);
	console.warn('MIGRATION END...');
})();
