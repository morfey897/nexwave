import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schemas/index.ts',
  out: './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL as string,
  },
} satisfies Config;