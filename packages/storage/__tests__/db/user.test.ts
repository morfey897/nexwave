// import { describe, expect, test } from '@jest/globals';
// import { schemas, orm } from '../../src';
// import * as utils from '../../__utils__/utils';

// let cfg: ReturnType<typeof utils.configDB>;

// describe('user module', () => {
// 	beforeAll(() => {
// 		cfg = utils.configDB();
// 	});

// 	afterAll(async () => {
// 		const users = await cfg.db
// 			.delete(schemas.user)
// 			.where(orm.like(schemas.user.email, utils.whereTestEmail('user')))
// 			.returning({
// 				id: schemas.user.id,
// 				email: schemas.user.email,
// 			});

// 		console.info('Clean up users:', users);

// 		cfg.destroy();
// 	});

// 	/**
// 	 * Test create new user
// 	 */
// 	describe('createNewUser', () => {
// 		const email = utils.generateTestEmail('user');
// 		const password = utils.generateTestPassword();
// 		test('createNewUser', async () => {
// 			const [user] = await cfg.db
// 				.insert(schemas.user)
// 				.values({
// 					email: email,
// 					password: orm.sql<string>`crypt(${password}, gen_salt('bf'))`,
// 					name: 'Test',
// 					surname: 'Jest',
// 				})
// 				.returning({
// 					id: schemas.user.id,
// 					uuid: schemas.user.uuid,
// 					email: schemas.user.email,
// 					emailVerified: schemas.user.emailVerified,
// 					name: schemas.user.name,
// 					surname: schemas.user.surname,
// 					avatar: schemas.user.avatar,
// 				});
// 			expect(user).toBeTruthy();
// 			expect(user.id).toBeTruthy();
// 			expect(user.email).toBe(email);
// 			expect(user.emailVerified).toBe(false);
// 			expect(user.name).toBe('Test');
// 			expect(user.surname).toBe('Jest');
// 			expect(user.uuid).toMatch(/^[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/);
// 		});

// 		test('findUserByEmailAndPassword', async () => {
// 			const [user] = await cfg.db
// 				.select({
// 					id: schemas.user.id,
// 					uuid: schemas.user.uuid,
// 					email: schemas.user.email,
// 					emailVerified: schemas.user.emailVerified,
// 					name: schemas.user.name,
// 					surname: schemas.user.surname,
// 					avatar: schemas.user.avatar,
// 				})
// 				.from(schemas.user)
// 				.where(
// 					orm.and(
// 						orm.eq(schemas.user.email, email),
// 						orm.eq(
// 							schemas.user.password,
// 							orm.sql<string>`crypt(${password}, password)`,
// 						),
// 					),
// 				);
// 			expect(user).toBeTruthy();
// 			expect(user.id).toBeTruthy();
// 			expect(user.email).toBe(email);
// 			expect(user.uuid).toMatch(/^[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/);
// 		});
// 	});

// 	/**
// 	 * Test create new user with dublicate email
// 	 * Should throw error
// 	 */
// 	describe('createDublicateUser', () => {
// 		const email = utils.generateTestEmail('user');
// 		const password = utils.generateTestPassword();
// 		test('createNewUser', async () => {
// 			const [user] = await cfg.db
// 				.insert(schemas.user)
// 				.values({
// 					email: email,
// 					password: orm.sql<string>`crypt(${password}, gen_salt('bf'))`,
// 					name: 'Test',
// 					surname: 'Jest',
// 				})
// 				.returning({
// 					id: schemas.user.id,
// 					uuid: schemas.user.uuid,
// 					email: schemas.user.email,
// 					emailVerified: schemas.user.emailVerified,
// 					name: schemas.user.name,
// 					surname: schemas.user.surname,
// 					avatar: schemas.user.avatar,
// 				});
// 			expect(user).toBeTruthy();
// 		});

// 		test('createDublicate', async () => {
// 			let user;
// 			try {
// 				user = await cfg.db
// 					.insert(schemas.user)
// 					.values({
// 						email: email,
// 						password: orm.sql<string>`crypt(${password}, gen_salt('bf'))`,
// 						name: 'Test',
// 						surname: 'Jest',
// 					})
// 					.returning({
// 						id: schemas.user.id,
// 						uuid: schemas.user.uuid,
// 						email: schemas.user.email,
// 						emailVerified: schemas.user.emailVerified,
// 						name: schemas.user.name,
// 						surname: schemas.user.surname,
// 						avatar: schemas.user.avatar,
// 					});
// 			} catch (error) {
// 				user = null;
// 			}
// 			expect(user).toBeNull();
// 		});
// 	});
// });
