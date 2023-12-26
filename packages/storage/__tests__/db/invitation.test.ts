import { describe, expect, test } from '@jest/globals';
import { schemas, orm } from '../../src';
import * as utils from '../../__utils__/utils';

let cfg: ReturnType<typeof utils.configDB>;

const SUPER =
	1 | 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192;

const ADMIN = 1 | 2 | 4 | 8;

const isNotNull = (value: any): value is number => value !== null;

describe('invitation module', () => {
	beforeAll(() => {
		cfg = utils.configDB();
	});

	afterAll(async () => {
		// Clean up invitation
		const deletedInvitations = await cfg.db
			.delete(schemas.invitation)
			.where(
				orm.like(schemas.invitation.email, utils.whereTestEmail('invitation')),
			)
			.returning({
				email: schemas.invitation.email,
				projectId: schemas.invitation.projectId,
			});
		console.info('Clean up invitations:', deletedInvitations);

		const responseOwners = await cfg.db
			.select({
				user_id: schemas.user.id,
				project_id: schemas.project.id,
			})
			.from(schemas.user)
			.where(orm.like(schemas.user.email, utils.whereTestEmail('invitation')))
			.rightJoin(
				schemas.project,
				orm.eq(schemas.project.ownerId, schemas.user.id),
			);

		if (responseOwners.length > 0) {
			// Clean up project
			const deletedProjects = await cfg.db
				.delete(schemas.project)
				.where(
					orm.inArray(
						schemas.project.id,
						responseOwners.map((item) => item.project_id).filter(isNotNull),
					),
				)
				.returning({
					id: schemas.project.id,
					name: schemas.project.name,
				});
			console.info('Clean up project:', deletedProjects);

			// Clean up user
			const deletedUsers = await cfg.db
				.delete(schemas.user)
				.where(
					orm.inArray(
						schemas.user.id,
						responseOwners.map((item) => item.user_id).filter(isNotNull),
					),
				)
				.returning({
					id: schemas.user.id,
					email: schemas.user.email,
				});

			console.info('Clean up users:', deletedUsers);
		}

		cfg.destroy();
	});

	/**
	 * Test flow
	 */
	describe('create invitation flow', () => {
		const data = {
			user_id: 0,
			project_id: 0,
		};
		/**
		 * Create test user
		 */
		test('createTestUserForNewProject', async () => {
			const email = utils.generateTestEmail('invitation');
			const [user] = await cfg.db
				.insert(schemas.user)
				.values({
					email: email,
					password: orm.sql<string>`crypt(${'Test3Jest$'}, gen_salt('bf'))`,
					name: `Test${Math.random().toString(36).substring(2, 7)}}`,
					surname: 'Jest',
				})
				.returning({
					id: schemas.user.id,
				});

			data.user_id = user.id;
			expect(user).toBeTruthy();
		});

		/**
		 * Create new project
		 */
		test('createNewProject', async () => {
			const slug = utils.generateTestSlug('invitation');
			const [project] = await cfg.db
				.insert(schemas.project)
				.values({
					ownerId: data.user_id,
					name: 'Jest-project',
					slug: slug,
					roles: {
						super: SUPER,
						admin: ADMIN,
						user: 1,
					},
				})
				.returning();

			data.project_id = project.id;
			expect(project).toBeTruthy();
			expect(project.id).toBeTruthy();
			expect(project.slug).toBe(slug);
			expect(project.name).toBe('Jest-project');
			expect(project.ownerId).toBe(data.user_id);
			expect(project.roles).toEqual({
				super: SUPER,
				admin: ADMIN,
				user: 1,
			});
			expect(project.uuid).toMatch(
				/^[a-f0-9]{8}-([a-f0-9]{4}-){3}[a-f0-9]{12}$/,
			);
		});

		/**
		 * Create first invitation
		 */
		test('createInvitation_1', async () => {
			const email = utils.generateTestEmail('invitation');
			const [invitation] = await cfg.db
				.insert(schemas.invitation)
				.values({
					email: email,
					projectId: data.project_id,
					role: 'user',
				})
				.returning({
					email: schemas.invitation.email,
					projectId: schemas.invitation.projectId,
					role: schemas.invitation.role,
				});

			expect(invitation).toEqual({
				email: email,
				projectId: data.project_id,
				role: 'user',
			});
		});

		/**
		 * Create second invitation
		 */
		test('createInvitation_2', async () => {
			const email = utils.generateTestEmail('invitation');
			const [invitation] = await cfg.db
				.insert(schemas.invitation)
				.values({
					email: email,
					projectId: data.project_id,
					role: 'user',
				})
				.returning({
					email: schemas.invitation.email,
					projectId: schemas.invitation.projectId,
					role: schemas.invitation.role,
				});

			expect(invitation).toEqual({
				email: email,
				projectId: data.project_id,
				role: 'user',
			});
		});

		/**
		 * Select all invitations
		 */
		test('selectInvitations', async () => {
			const response = await cfg.db
				.select({
					slug: schemas.project.slug,
					email: schemas.invitation.email,
					role: schemas.invitation.role,
				})
				.from(schemas.invitation)
				.leftJoin(
					schemas.project,
					orm.eq(schemas.project.id, schemas.invitation.projectId),
				)
				.where(
					orm.like(
						schemas.invitation.email,
						utils.whereTestEmail('invitation'),
					),
				)
				.execute();

			console.info('selectInvitations', response);
			expect(response).toBeTruthy();
			expect(response.length).toBe(2);
			expect(response[0].slug).toBe(response[1].slug);
		});
	});
});
