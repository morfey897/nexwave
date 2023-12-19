import { drizzle } from 'drizzle-orm/vercel-postgres';
import { createPool, VercelPostgresPoolConfig } from '@vercel/postgres';
export * as orm from 'drizzle-orm';

export function createDB(props: VercelPostgresPoolConfig) {
	const pool = createPool(props);
	const db = drizzle(pool);
	return {
		db,
		destroy: () => pool.end(),
	};
}
