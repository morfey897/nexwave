// import { describe, expect, test } from '@jest/globals';
// import { schemas, orm } from '../../src';
// import * as utils from '../../__utils__/utils';

// let cfg: ReturnType<typeof utils.configDB>;

// const SUPER =
// 	1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192;

// const ADMIN = 1 | 2 | 4 | 8;

// const isNotNull = (value: any): value is number => value !== null;

// describe('project module', () => {
// 	beforeAll(() => {
// 		cfg = utils.configDB();
// 	});

// 	afterAll(async () => {
// 		const responseProjectsToUsers = await cfg.db
// 			.select({
// 				user_id: schemas.user.id,
// 				project_id: schemas.project.id,
// 				role: schemas.projectToUser.role,
// 			})
// 			.from(schemas.user)
// 			.leftJoin(
// 				schemas.projectToUser,
// 				orm.eq(schemas.projectToUser.userId, schemas.user.id),
// 			)
// 			.leftJoin(
// 				schemas.project,
// 				orm.eq(schemas.project.id, schemas.projectToUser.projectId),
// 			)
// 			.where(
// 				orm.and(
// 					orm.like(schemas.user.email, utils.whereTestEmail('project')),
// 					orm.isNotNull(schemas.projectToUser),
// 				),
// 			)
// 			.execute();

// 		const responseOwners = await cfg.db
// 			.select({
// 				user_id: schemas.user.id,
// 				project_id: schemas.project.id,
// 			})
// 			.from(schemas.user)
// 			.where(orm.like(schemas.user.email, utils.whereTestEmail('project')))
// 			.rightJoin(
// 				schemas.project,
// 				orm.eq(schemas.project.ownerId, schemas.user.id),
// 			);

// 		if (responseProjectsToUsers.length > 0) {
// 			// Clean up projectToUser
// 			const deleted = await cfg.db
// 				.delete(schemas.projectToUser)
// 				.where(
// 					orm.and(
// 						orm.inArray(
// 							schemas.projectToUser.projectId,
// 							responseProjectsToUsers
// 								.map((item) => item.project_id)
// 								.filter(isNotNull),
// 						),
// 						orm.inArray(
// 							schemas.projectToUser.userId,
// 							responseProjectsToUsers
// 								.map((item) => item.user_id)
// 								.filter(isNotNull),
// 						),
// 					),
// 				)
// 				.returning({
// 					userId: schemas.projectToUser.userId,
// 					projectId: schemas.projectToUser.projectId,
// 					roleId: schemas.projectToUser.role,
// 				});
// 			console.info('Clean up projectToUser:', deleted);
// 		}

// 		if (responseOwners.length > 0) {
// 			// Clean up project
// 			const deletedProjects = await cfg.db
// 				.delete(schemas.project)
// 				.where(
// 					orm.inArray(
// 						schemas.project.id,
// 						responseOwners.map((item) => item.project_id).filter(isNotNull),
// 					),
// 				)
// 				.returning({
// 					id: schemas.project.id,
// 					name: schemas.project.name,
// 				});
// 			console.info('Clean up project:', deletedProjects);

// 			// Clean up user
// 			const deletedUsers = await cfg.db
// 				.delete(schemas.user)
// 				.where(
// 					orm.inArray(
// 						schemas.user.id,
// 						responseOwners.map((item) => item.user_id).filter(isNotNull),
// 					),
// 				)
// 				.returning({
// 					id: schemas.user.id,
// 					email: schemas.user.email,
// 				});

// 			console.info('Clean up users:', deletedUsers);
// 		}

// 		cfg.destroy();
// 	});

// 	/**
// 	 * Test flow
// 	 */
// 	describe('test whole flow', () => {
// 		const data = {
// 			user_id: 0,
// 			project_id: 0,
// 		};
// 		/**
// 		 * Create test user
// 		 */
// 		test('createTestUserForNewProject', async () => {
// 			const email = utils.generateTestEmail('project');
// 			const password = utils.generateTestPassword();
// 			const [user] = await cfg.db
// 				.insert(schemas.user)
// 				.values({
// 					email: email,
// 					password: orm.sql<string>`crypt(${password}, gen_salt('bf'))`,
// 					name: `Test${Math.random().toString(36).substring(2, 7)}}`,
// 					surname: 'Jest',
// 				})
// 				.returning({
// 					id: schemas.user.id,
// 				});

// 			data.user_id = user.id;
// 			expect(user).toBeTruthy();
// 		});

// 		/**
// 		 * Create new project
// 		 */
// 		test('createNewProject', async () => {
// 			const [project] = await cfg.db
// 				.insert(schemas.project)
// 				.values({
// 					ownerId: data.user_id,
// 					name: 'Jest-project',
// 					color: 'green',
// 					roles: {
// 						super: SUPER,
// 						admin: ADMIN,
// 					},
// 				})
// 				.returning();

// 			data.project_id = project.id;
// 			expect(project).toBeTruthy();
// 			expect(project.id).toBeTruthy();
// 			expect(project.color).toBe('green');
// 			expect(project.state).toBeNull();
// 			expect(project.name).toBe('Jest-project');
// 			expect(project.ownerId).toBe(data.user_id);
// 			expect(project.roles).toEqual({
// 				super: SUPER,
// 				admin: ADMIN,
// 			});
// 			expect(project.uuid).toMatch(
// 				/^[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/,
// 			);
// 		});

// 		/**
// 		 * Create junction
// 		 */
// 		test('createJunction', async () => {
// 			const [junction] = await cfg.db
// 				.insert(schemas.projectToUser)
// 				.values({
// 					userId: data.user_id,
// 					projectId: data.project_id,
// 					role: 'super',
// 				})
// 				.returning({
// 					userId: schemas.projectToUser.userId,
// 					projectId: schemas.projectToUser.projectId,
// 					role: schemas.projectToUser.role,
// 				});

// 			expect(junction).toEqual({
// 				userId: data.user_id,
// 				projectId: data.project_id,
// 				role: 'super',
// 			});
// 		});

// 		/**
// 		 * Create one more junction
// 		 */
// 		test('createJunction', async () => {
// 			const [junction] = await cfg.db
// 				.insert(schemas.projectToUser)
// 				.values({
// 					userId: data.user_id,
// 					projectId: data.project_id,
// 					role: 'admin',
// 				})
// 				.onConflictDoUpdate({
// 					target: [
// 						schemas.projectToUser.userId,
// 						schemas.projectToUser.projectId,
// 					],
// 					set: {
// 						role: 'admin',
// 					},
// 				})
// 				.returning({
// 					userId: schemas.projectToUser.userId,
// 					projectId: schemas.projectToUser.projectId,
// 					role: schemas.projectToUser.role,
// 				});

// 			expect(junction).toEqual({
// 				userId: data.user_id,
// 				projectId: data.project_id,
// 				role: 'admin',
// 			});
// 		});

// 		/**
// 		 * Create additional user
// 		 */
// 		test('createJunction', async () => {
// 			const [user] = await cfg.db
// 				.insert(schemas.user)
// 				.values({
// 					email: utils.generateTestEmail('project'),
// 					password: orm.sql<string>`crypt(${'password'}, gen_salt('bf'))`,
// 					name: `Test${Math.random().toString(36).substring(2, 7)}}`,
// 					surname: 'Jest',
// 				})
// 				.returning({
// 					id: schemas.user.id,
// 				});

// 			expect(user).toBeTruthy();

// 			const [junction] = await cfg.db
// 				.insert(schemas.projectToUser)
// 				.values({
// 					userId: user.id,
// 					projectId: data.project_id,
// 					role: 'admin',
// 				})
// 				.returning({
// 					userId: schemas.projectToUser.userId,
// 					projectId: schemas.projectToUser.projectId,
// 					role: schemas.projectToUser.role,
// 				});

// 			expect(junction).toEqual({
// 				userId: user.id,
// 				projectId: data.project_id,
// 				role: 'admin',
// 			});
// 		});

// 		/**
// 		 * Get project
// 		 */
// 		test('selectUsers', async () => {
// 			const response = await cfg.db
// 				.select({
// 					user_id: schemas.user.id,
// 					role: schemas.projectToUser.role,
// 					permission: orm.sql<string>`${schemas.project.roles}->${schemas.projectToUser.role}`,
// 					roles: schemas.project.roles,
// 				})
// 				.from(schemas.projectToUser)
// 				.where(orm.eq(schemas.projectToUser.userId, data.user_id))
// 				.leftJoin(
// 					schemas.user,
// 					orm.eq(schemas.user.id, schemas.projectToUser.userId),
// 				)
// 				.leftJoin(
// 					schemas.project,
// 					orm.eq(schemas.project.id, schemas.projectToUser.projectId),
// 				)
// 				.execute();

// 			console.info('selectUsers', response);
// 			expect(response).toBeTruthy();
// 		});
// 	});
// });
