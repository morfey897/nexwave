import 'dotenv/config';
import type { Config } from 'drizzle-kit';
import { join } from 'path';

const [, , , path] = process.argv;

export default {
	schema: './src/schemas/index.ts',
	out: join('./migrations', path || ''),
	driver: 'pg',
	dbCredentials: {
		connectionString: process.env.POSTGRES_URL!,
	},
} satisfies Config;
