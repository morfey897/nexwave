import 'dotenv/config';
import type { Config } from 'drizzle-kit';

const [,,,path] = process.argv;

export default {
  schema: './src/schemas/index.ts',
  out: path || './migrations',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
} satisfies Config;