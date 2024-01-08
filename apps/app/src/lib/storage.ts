import { createDB } from '@nw/storage';

const { db } = createDB({
	connectionString: process.env.NEXT_PRIVATE_POSTGRES_URL,
});

export default db;
