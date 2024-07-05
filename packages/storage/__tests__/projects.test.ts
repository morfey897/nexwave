import { describe, expect, test } from '@jest/globals';
import { schemas, orm, GenderEnum } from '../src';
import * as utils from '../__utils__';
import { uuid } from 'drizzle-orm/pg-core';

let cfg: ReturnType<typeof utils.configDB>;

describe('projects module', () => {
	beforeAll(() => {
		cfg = utils.configDB();
	});

	afterAll(async () => {
		cfg.destroy();
	});

	/**
	 * Test select all projects
	 * Should return 4 projects
	 */
	describe('selectAllProjects', () => {
		test('selectAllProjects', async () => {
			const projects = await cfg.db.query.Projects.findMany();
			expect(projects.length).toBeGreaterThanOrEqual(4);
		});
	});

	/**
	 * Select projects with users
	 */
	describe.skip('selectProjectWithUsers', () => {
		/**
		 * Test selectProjectById #1
		 * Should return project with id 1 and 3 users
		 */
		test('selectProjectById', async () => {
			const project = await cfg.db.query.Projects.findFirst({
				columns: {
					id: true,
					name: true,
					roles: true,
				},
				where: orm.eq(schemas.Projects.id, 1),
				with: {
					users: {
						columns: {
							projectId: false,
							userId: false,
						},
						with: {
							user: {
								columns: {
									id: true,
									name: true,
								},
							},
						},
					},
				},
			});
			expect(project).toEqual({
				id: 1,
				name: 'United States',
				roles: {
					admin: 512,
					user: 256,
				},
				users: [
					{
						role: 'editor',
						user: {
							id: 1,
							name: 'Alise',
						},
					},
					{
						role: 'editor',
						user: {
							id: 2,
							name: 'Bobab',
						},
					},
					{
						role: 'viewer',
						user: {
							id: 3,
							name: 'Charlie',
						},
					},
				],
			});
		});

		/**
		 * Test selectProjectById #1
		 * Should return project with id 1 and 3 users
		 */
		test('selectProjectById and by UserId', async () => {
			const project = await cfg.db.query.Projects.findFirst({
				columns: {
					id: true,
					name: true,
					roles: true,
				},
				where: orm.eq(schemas.Projects.id, 1),
				with: {
					users: {
						where: orm.eq(schemas.ProjectUser.userId, 1),
						columns: {
							projectId: false,
							userId: false,
						},
						with: {
							user: {
								columns: {
									id: true,
									name: true,
								},
							},
						},
					},
				},
			});
			expect(project).toEqual({
				id: 1,
				name: 'United States',
				roles: {
					admin: 512,
					user: 256,
				},
				users: [
					{
						role: 'editor',
						user: {
							id: 1,
							name: 'Alise',
						},
					},
				],
			});
		});

		/**
		 * Test selectProjectById #1
		 * Should return project with id 1 and no users
		 */
		test('selectProjectById and no users', async () => {
			const project = await cfg.db.query.Projects.findFirst({
				columns: {
					id: true,
					name: true,
					roles: true,
				},
				where: orm.eq(schemas.Projects.id, 1),
				with: {
					users: {
						where: orm.eq(schemas.ProjectUser.userId, 0),
						columns: {
							projectId: false,
							userId: false,
						},
						with: {
							user: {
								columns: {
									id: true,
									name: true,
								},
							},
						},
					},
				},
			});
			expect(project).toEqual({
				id: 1,
				name: 'United States',
				roles: {
					admin: 512,
					user: 256,
				},
				users: [],
			});
		});
	});

	/**
	 * Select projects with branches and users
	 */
	describe('selectProjectWithBranchesAndUsers', () => {
		test('selectProjectWithBranchesAndUsers', async () => {
			const prUsers = await cfg.db
				.insert(schemas.Users)
				.values({
					name: 'Charlie',
					surname: 'New',
					login: 'charlie_new@nexwave.com.ua',
					password: orm.sql<string>`crypt(${'password3'}, gen_salt('bf'))`,
					birthday: '1979-07-23',
					gender: GenderEnum.Male,
					// contacts: '',
				})
				.returning({
					id: schemas.Users.id,
					uuid: schemas.Users.uuid,
					login: schemas.Users.login,
					name: schemas.Users.name,
					surname: schemas.Users.surname,
					avatar: schemas.Users.avatar,
				});

			console.log(prUsers);

			expect(prUsers).not.toBeNull();
		});
	});
});
