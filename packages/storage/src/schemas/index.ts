import { sql, relations } from 'drizzle-orm';
import {
	primaryKey,
	pgTable,
	serial,
	varchar,
	timestamp,
	date,
	text,
	jsonb,
	uuid,
	boolean,
	integer,
} from 'drizzle-orm/pg-core';
import * as enums from './enums';
export * from './enums';

//////////// Tables ////////////

/**
 * Schema for users table
 */
export const user = pgTable('users', {
	id: serial('id').primaryKey(),
	uuid: uuid('uuid')
		.default(sql`gen_random_uuid()`)
		.notNull(),
	email: varchar('email', { length: 511 }).notNull().unique(),
	emailVerified: boolean('emailVerified').default(false).notNull(),
	password: text('password'),
	name: varchar('name', { length: 255 }),
	surname: varchar('surname', { length: 255 }),
	birthday: date('birthday'),
	avatar: text('avatar'),
	gender: enums.genderEnum('gender').default('none').notNull(),
	bio: text('bio'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	lastLoginAt: timestamp('last_login_at'),
	contacts: jsonb('contacts')
		.$type<Array<{ type: string; value: string }>>()
		.default([])
		.notNull(),
});

/**
 * Schema for projects table
 */
export const project = pgTable('projects', {
	id: serial('id').primaryKey(),
	uuid: uuid('uuid')
		.default(sql`gen_random_uuid()`)
		.notNull(),
	ownerId: integer('owner_id')
		.notNull()
		.references(() => user.id),
	name: varchar('name', { length: 255 }).notNull(),
	visitedAt: timestamp('visited_at').defaultNow().notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	status: varchar('status', { length: 32 }),
	image: text('image'),
	color: varchar('color', { length: 32 }),
	roles: jsonb('roles')
		.$type<Record<string, number>>() // Record<string, number> is the same as { [key: string]: 1|2|4|8|16|32|64|128|256|512|1024|2048|4096|8192|16384|32768|... }
		.default({})
		.notNull(),
});

/**
 * Schema for branches table
 */
export const branch = pgTable('branches', {
	id: serial('id').primaryKey(),
	uuid: uuid('uuid')
		.default(sql`gen_random_uuid()`)
		.notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	status: varchar('status', { length: 32 }),
	projectId: integer('project_id')
		.notNull()
		.references(() => project.id),
});

/**
 * Schema for invitations table
 */
export const invitation = pgTable('invitations', {
	id: serial('id').primaryKey(),
	uuid: uuid('uuid')
		.default(sql`gen_random_uuid()`)
		.notNull(),
	email: varchar('email', { length: 511 }).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	projectId: integer('project_id')
		.notNull()
		.references(() => project.id),
	role: varchar('role', { length: 63 }).notNull(),
});

/**
 * Relations between bunches and users
 */
export const projectToUser = pgTable(
	'projects_to_users',
	{
		projectId: integer('project_id')
			.notNull()
			.references(() => project.id),
		userId: integer('user_id')
			.notNull()
			.references(() => user.id),
		role: varchar('role', { length: 63 }).notNull(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.projectId, t.userId] }),
	}),
);

//////////// Relations ////////////

/**
 * Relations for projects to users
 */
export const projectToUserRelations = relations(projectToUser, ({ one }) => ({
	bunch: one(project, {
		fields: [projectToUser.projectId],
		references: [project.id],
	}),
	user: one(user, {
		fields: [projectToUser.userId],
		references: [user.id],
	}),
}));

/**
 * Relations for users
 */
export const userRelations = relations(user, ({ many }) => ({
	projects: many(project),
}));

/**
 * Relations for projects
 * */
export const projectRelations = relations(project, ({ many, one }) => ({
	branches: many(branch),
	invitations: many(invitation),
	owner: one(user, {
		fields: [project.ownerId],
		references: [user.id],
	}),
}));

/**
 * Relations for branches
 * */
export const branchRelations = relations(branch, ({ one }) => ({
	project: one(project, {
		fields: [branch.projectId],
		references: [project.id],
	}),
}));

/**
 * Relations for invitations
 * */
export const invitationRelations = relations(invitation, ({ one }) => ({
	project: one(project, {
		fields: [invitation.projectId],
		references: [project.id],
	}),
}));
