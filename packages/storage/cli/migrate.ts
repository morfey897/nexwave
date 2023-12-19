import 'dotenv/config';
import { migrate } from 'drizzle-orm/vercel-postgres/migrator';
import { createDB } from '@/db';
import ms from 'ms';

void (async function () {
	const timestamp = new Date().getTime();
	console.warn('MIGRATION START...');
	const { db, destroy } = createDB({
		connectionString: process.env.POSTGRES_URL,
	});

	await migrate(db, { migrationsFolder: './migrations' });

	destroy();
	console.warn('MIGRATION END.', ms(new Date().getTime() - timestamp));
})();
