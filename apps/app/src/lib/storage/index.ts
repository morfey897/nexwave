import { createKysely } from '@vercel/postgres-kysely';
import { schemas } from 'storage';

export interface IStorage {
	user: schemas.IUserShema;
}

const db = createKysely<IStorage>({
	connectionString: process.env.NEXT_PRIVATE_POSTGRES_URL,
});

export default db;
