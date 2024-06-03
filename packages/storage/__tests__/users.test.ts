import { describe, expect, test } from '@jest/globals';
import { schemas, orm } from '../src';
import * as utils from '../__utils__';

let cfg: ReturnType<typeof utils.configDB>;

describe('user module', () => {
	beforeAll(() => {
		cfg = utils.configDB();
	});

	afterAll(async () => {
		const users = await cfg.db
			.delete(schemas.Users)
			.where(orm.like(schemas.Users.login, utils.whereTestLogin('email::user')))
			.returning({
				id: schemas.Users.id,
				login: schemas.Users.login,
			});

		console.info('Clean up users:', users);

		cfg.destroy();
	});

  /**
   * Test select all users
   * Should return 3 users
   */ 
  describe('selectAllUsers', () => {
    test('selectAllUsers', async () => {
      const users = await cfg.db
        .select({
          id: schemas.Users.id,
          uuid: schemas.Users.uuid,
          login: schemas.Users.login,
          name: schemas.Users.name,
          surname: schemas.Users.surname,
          avatar: schemas.Users.avatar,
        })
        .from(schemas.Users);
      expect(users).toBeTruthy();
      expect(users.length).toEqual(3);
    });
  });

	/**
	 * Test create new user
	 */
	describe('createNewUser', () => {
		const login = utils.generateTestLogin('email::user');
		const password = utils.generateTestPassword();
		test('createNewUser', async () => {
			const [user] = await cfg.db
				.insert(schemas.Users)
				.values({
					login,
					password: orm.sql<string>`crypt(${password}, gen_salt('bf'))`,
					name: 'Test',
					surname: 'Jest',
				})
				.returning({
					id: schemas.Users.id,
					uuid: schemas.Users.uuid,
					login: schemas.Users.login,
					name: schemas.Users.name,
					surname: schemas.Users.surname,
					avatar: schemas.Users.avatar,
				});
			expect(user).toBeTruthy();
			expect(user.id).toBeTruthy();
			expect(user.login).toBe(login);
			expect(user.name).toBe('Test');
			expect(user.surname).toBe('Jest');
			expect(user.uuid).toMatch(/^[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/);
		});

		test('findUserByEmailAndPassword', async () => {
			const [user] = await cfg.db
				.select({
					id: schemas.Users.id,
					uuid: schemas.Users.uuid,
					login: schemas.Users.login,
					name: schemas.Users.name,
					surname: schemas.Users.surname,
					avatar: schemas.Users.avatar,
				})
				.from(schemas.Users)
				.where(
					orm.and(
						orm.eq(schemas.Users.login, login),
						orm.eq(
							schemas.Users.password,
							orm.sql<string>`crypt(${password}, password)`,
						),
					),
				);
			expect(user).toBeTruthy();
			expect(user.id).toBeTruthy();
			expect(user.login).toBe(login);
			expect(user.uuid).toMatch(/^[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/);
		});
	});

	/**
	 * Test create new user with dublicate email
	 * Should throw error
	 */
	describe('createDublicateUser', () => {
		const login = utils.generateTestLogin('email::user');
		const password = utils.generateTestPassword();
		test('createNewUser', async () => {
			const [user] = await cfg.db
				.insert(schemas.Users)
				.values({
					login: login,
					password: orm.sql<string>`crypt(${password}, gen_salt('bf'))`,
					name: 'Test',
					surname: 'Jest',
				})
				.returning({
					id: schemas.Users.id,
					uuid: schemas.Users.uuid,
					login: schemas.Users.login,
					name: schemas.Users.name,
					surname: schemas.Users.surname,
					avatar: schemas.Users.avatar,
				});
			expect(user).toBeTruthy();
		});

		test('createDublicate', async () => {
			let user;
			try {
				user = await cfg.db
					.insert(schemas.Users)
					.values({
						login: login,
						password: orm.sql<string>`crypt(${password}, gen_salt('bf'))`,
						name: 'Test',
						surname: 'Jest',
					})
					.returning({
						id: schemas.Users.id,
						uuid: schemas.Users.uuid,
						login: schemas.Users.login,
						name: schemas.Users.name,
						surname: schemas.Users.surname,
						avatar: schemas.Users.avatar,
					});
			} catch (error) {
				user = null;
			}
			expect(user).toBeNull();
		});
	});
});