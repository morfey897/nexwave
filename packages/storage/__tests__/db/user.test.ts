import 'dotenv/config';
import { describe, expect, test } from '@jest/globals';
import { createDB, schemas, orm } from '../../src';

let cfg: ReturnType<typeof createDB>;

const generateEmail = () =>
	`test${Math.random().toString(36).substring(7)}@${process.env.DOMAIN!}`;

describe('user module', () => {
	beforeAll(() => {
		cfg = createDB({
			connectionString: process.env.POSTGRES_URL,
		});
	});

	afterAll(async () => {
		await cfg.db
			.delete(schemas.user)
			.where(orm.like(schemas.user.email, `%@${process.env.DOMAIN!}`))
			.execute();

		cfg.destroy();
	});

	/**
	 * Test create new user
	 */
	describe('createNewUser', () => {
		let email: string;
		const password = 'Test3Jest$';
		test('createNewUser', async () => {
			email = generateEmail();
			let user = await cfg.db
				.insert(schemas.user)
				.values({
					email: email,
					password: orm.sql<string>`crypt(${password}, gen_salt('bf'))`,
					name: 'Test',
					surname: 'Jest',
				})
				.returning({
					id: schemas.user.id,
					uuid: schemas.user.uuid,
					email: schemas.user.email,
					emailVerified: schemas.user.emailVerified,
					name: schemas.user.name,
					surname: schemas.user.surname,
					avatar: schemas.user.avatar,
				});
			expect(user).toBeTruthy();
			expect(user.length).toBe(1);
			expect(user[0].id).toBeTruthy();
			expect(user[0].email).toBe(email);
			expect(user[0].emailVerified).toBe(false);
			expect(user[0].name).toBe('Test');
			expect(user[0].surname).toBe('Jest');
			expect(user[0].uuid).toMatch(
				/^[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/,
			);
		});

		test('findUserByEmailAndPassword', async () => {
			let user = await cfg.db
				.select({
					id: schemas.user.id,
					uuid: schemas.user.uuid,
					email: schemas.user.email,
					emailVerified: schemas.user.emailVerified,
					name: schemas.user.name,
					surname: schemas.user.surname,
					avatar: schemas.user.avatar,
				})
				.from(schemas.user)
				.where(
					orm.and(
						orm.eq(schemas.user.email, email),
						orm.eq(
							schemas.user.password,
							orm.sql<string>`crypt(${password}, password)`,
						),
					),
				)
				.limit(1);
			expect(user).toBeTruthy();
			expect(user.length).toBe(1);
			expect(user[0].id).toBeTruthy();
			expect(user[0].email).toBe(email);
			expect(user[0].uuid).toMatch(
				/^[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/,
			);
		});
	});

	/**
	 * Test create new user with dublicate email
	 * Should throw error
	 */
	describe('createDublicateUser', () => {
		let email: string;
		const password = 'Test3Jest$';
		test('createNewUser', async () => {
			email = generateEmail();
			let user = await cfg.db
				.insert(schemas.user)
				.values({
					email: email,
					password: orm.sql<string>`crypt(${password}, gen_salt('bf'))`,
					name: 'Test',
					surname: 'Jest',
				})
				.returning({
					id: schemas.user.id,
					uuid: schemas.user.uuid,
					email: schemas.user.email,
					emailVerified: schemas.user.emailVerified,
					name: schemas.user.name,
					surname: schemas.user.surname,
					avatar: schemas.user.avatar,
				});
			expect(user).toBeTruthy();
			expect(user.length).toBe(1);
		});

		test('createDublicate', async () => {
			let user;
			try {
				user = await cfg.db
					.insert(schemas.user)
					.values({
						email: email,
						password: 'Test3Jest$',
						name: 'Test',
						surname: 'Jest',
					})
					.returning({
						id: schemas.user.id,
						uuid: schemas.user.uuid,
						email: schemas.user.email,
						emailVerified: schemas.user.emailVerified,
						name: schemas.user.name,
						surname: schemas.user.surname,
						avatar: schemas.user.avatar,
					});
			} catch (error) {
				user = null;
			}
			expect(user).toBeNull();
		});
	});
});
