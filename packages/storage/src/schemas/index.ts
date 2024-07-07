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
	integer,
	pgEnum,
} from 'drizzle-orm/pg-core';
import { GenderEnum, StateEnum, InvitationEnum } from '../enums';

//////////// Enums ////////////

export const genderEnum = pgEnum('gender', [
	GenderEnum.Male,
	GenderEnum.Female,
	GenderEnum.None,
]);
export const stateEnum = pgEnum('state', [
	StateEnum.Active,
	StateEnum.Inactive,
	StateEnum.Archived,
]);
export const invitationEnum = pgEnum('invitation', [
	InvitationEnum.Pending,
	InvitationEnum.Accepted,
	InvitationEnum.Rejected,
]);

//////////// Tables ////////////

/**
 * Schema for clients table
 */
export const Clients = pgTable('clients', {
	id: serial('id').primaryKey(),
	uuid: uuid('uuid')
		.default(sql`gen_random_uuid()`)
		.notNull(),
	login: varchar('login', { length: 512 }).notNull().unique(),
	password: text('password'),
	name: varchar('name', { length: 255 }),
	surname: varchar('surname', { length: 255 }),
	birthday: date('birthday'),
	avatar: text('avatar'),
	gender: genderEnum('gender').default(GenderEnum.None).notNull(),
	bio: text('bio'),
	lastVisitAt: timestamp('last_visit_at'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
	contacts: jsonb('contacts')
		.$type<Record<string, string>>()
		.default({})
		.notNull(),
	meta: jsonb('meta').$type<Record<string, string>>().default({}).notNull(),
	loginMetadata: jsonb('login_from')
		.$type<{ method?: string; device: string; ip: string; timestamp: number }>()
		.default({ device: '', ip: '', timestamp: 0 })
		.notNull(),
});

/**
 * Schema for users table
 */
export const Users = pgTable('users', {
	id: serial('id').primaryKey(),
	uuid: uuid('uuid')
		.default(sql`gen_random_uuid()`)
		.notNull(),
	login: varchar('login', { length: 512 }).notNull().unique(),
	password: text('password'),
	name: varchar('name', { length: 255 }),
	surname: varchar('surname', { length: 255 }),
	birthday: date('birthday'),
	avatar: text('avatar'),
	gender: genderEnum('gender').default(GenderEnum.None).notNull(),
	bio: text('bio'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
	contacts: jsonb('contacts')
		.$type<Record<string, string>>()
		.default({})
		.notNull(),
	meta: jsonb('meta').$type<Record<string, string>>().default({}).notNull(),
	loginMetadata: jsonb('login_from')
		.$type<{ method?: string; device: string; ip: string; timestamp: number }>()
		.default({ device: '', ip: '', timestamp: 0 })
		.notNull(),
});

/**
 * Schema for projects table
 */
export const Projects = pgTable('projects', {
	id: serial('id').primaryKey(),
	uuid: uuid('uuid')
		.default(sql`gen_random_uuid()`)
		.notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	info: text('info'),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
	state: stateEnum('state').default(StateEnum.Inactive).notNull(),
	image: text('image'),
	color: varchar('color', { length: 32 }),
	currency: varchar('currency', { length: 32 }),
	timezone: varchar('timezone', { length: 32 }),
	langs: jsonb('langs').$type<Array<string>>().default([]),
	roles: jsonb('roles')
		.$type<Record<string, number>>() // Record<string, number> is the same as { [key: string]: 1|2|4|8|16|32|64|128|256|512|1024|2048|4096|8192|16384|32768|... }
		.default({})
		.notNull(),
	address: jsonb('address')
		.$type<{
			country?: string;
			city?: string;
			address_line?: string;
			address_line_2?: string;
		}>()
		.default({})
		.notNull(),
	contacts: jsonb('contacts')
		.$type<Record<string, string>>()
		.default({})
		.notNull(),
	spaces: jsonb('spaces')
		.$type<Array<{ id: string; name: string }>>()
		.default([])
		.notNull(),
});

/**
 * Schema for invitations table
 */
export const Invitations = pgTable('invitations', {
	id: serial('id').primaryKey(),
	uuid: uuid('uuid')
		.default(sql`gen_random_uuid()`)
		.notNull(),
	login: varchar('login', { length: 512 }).notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	projectId: integer('project_id')
		.notNull()
		.references(() => Projects.id),
	role: varchar('role', { length: 63 }).notNull(),
	state: invitationEnum('state').default(InvitationEnum.Pending).notNull(),
});

/**
 * Schema for events table
 */
export const Events = pgTable('events', {
	id: serial('id').primaryKey(),
	uuid: uuid('uuid')
		.default(sql`gen_random_uuid()`)
		.notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
	projectId: integer('project_id')
		.notNull()
		.references(() => Projects.id),
	name: varchar('name', { length: 255 }).notNull(),
	info: text('info'),
	color: varchar('color', { length: 32 }),

	startAt: timestamp('start_at').notNull(),
	endAt: timestamp('end_at'),
	duration: serial('duration'),

	rrule: jsonb('rrule').$type<{
		freq?: string;
		interval?: number;
		byday?: string;
	}>(),

	spaceId: varchar('space_id', { length: 32 }), //from project:spaces
	capacity: integer('capacity').default(0),
});

/**
 * Schema for event registrations table
 */
export const EventRegistrations = pgTable('event_registrations', {
	id: serial('id').primaryKey(),
	uuid: uuid('uuid')
		.default(sql`gen_random_uuid()`)
		.notNull(),
	registrationDate: timestamp('registration_date').defaultNow().notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => Users.id),
	eventId: integer('event_id')
		.notNull()
		.references(() => Events.id),
});

/**
 * Relations between Projects and Users
 */
export const ProjectUser = pgTable(
	'project_user',
	{
		projectId: integer('project_id')
			.notNull()
			.references(() => Projects.id),
		userId: integer('user_id')
			.notNull()
			.references(() => Users.id),
		role: varchar('role', { length: 63 }).notNull(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.projectId, t.userId] }),
	})
);

/**
 * Relations between Projects and Users
 */
export const ProjectClient = pgTable(
	'project_client',
	{
		projectId: integer('project_id')
			.notNull()
			.references(() => Projects.id),
		clientId: integer('client_id')
			.notNull()
			.references(() => Clients.id),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.projectId, t.clientId] }),
	})
);

//////////// Relations ////////////

export const ProjectsRelations = relations(Projects, ({ many, one }) => ({
	users: many(ProjectUser),
	clients: many(ProjectClient),
	invitations: many(Invitations),
}));

export const UsersRelations = relations(Users, ({ many }) => ({
	projects: many(ProjectUser),
}));

export const ProjectUserRelations = relations(ProjectUser, ({ one }) => ({
	project: one(Projects, {
		fields: [ProjectUser.projectId],
		references: [Projects.id],
	}),
	user: one(Users, {
		fields: [ProjectUser.userId],
		references: [Users.id],
	}),
}));

export const ClientsRelations = relations(Users, ({ many }) => ({
	clients: many(ProjectUser),
	eventRegistrations: many(EventRegistrations),
}));

export const EventsRelations = relations(Events, ({ one, many }) => ({
	project: one(Projects, {
		fields: [Events.projectId],
		references: [Projects.id],
	}),
	registrations: many(EventRegistrations),
}));

export const EventRegistrationsRelations = relations(
	EventRegistrations,
	({ one }) => ({
		user: one(Users, {
			fields: [EventRegistrations.userId],
			references: [Users.id],
		}),
		event: one(Events, {
			fields: [EventRegistrations.eventId],
			references: [Events.id],
		}),
	})
);
