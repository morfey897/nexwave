import { createDB, schemas as innerSchemas, orm as innerOrm } from 'storage';

export const schemas = innerSchemas;
export const orm = innerOrm;

const { db } = createDB({
	connectionString: process.env.NEXT_PRIVATE_POSTGRES_URL,
});

export default db;
