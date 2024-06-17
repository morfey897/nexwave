import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

const dialect = new PostgresDialect({
	pool: new Pool({
		connectionString: process.env.POSTGRES_URL,
	}),
});

const db = new Kysely({
	dialect,
});

export default db;
