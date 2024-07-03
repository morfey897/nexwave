import { EnumRole } from '~/constants/enums';

// Create
export const CREATE = {
	// Project section
	// Branch section
	BRANCH: 4,
	EVENT: 2,
} as const;

// Update
export const UPDATE = {
	// Project section
	PROJECT: 1,
	UNPUBLISH_PROJECT: 8,
	PROJECT_GROUP: 0,
	PROJECT_ACCESS: 32,
	// Branch section
	BRANCH: 64,
	UNPUBLISH_BRANCH: 2048,
	EVENT: 16,
} as const;

// Delete
export const DELETE = {
	// Project section
	PROJECT: 128,
	PROJECT_GROUP: 0,
	// Branch section
	BRANCH: 1024,
	EVENT: 256,
} as const;

// Read
export const READ = {
	EVENT: 512,
} as const;

const ALL_ACCESS = [
	...(Object.values(CREATE) as number[]),
	...(Object.values(UPDATE) as number[]),
	...(Object.values(READ) as number[]),
	...(Object.values(DELETE) as number[]),
].reduce((acc, item) => acc | item, 0);

const ROLE_SUPER = ALL_ACCESS;
const ROLE_ADMIN = ROLE_SUPER & ~UPDATE.PROJECT_ACCESS;
const ROLE_MANAGER =
	ROLE_ADMIN &
	~(
		DELETE.PROJECT |
		DELETE.PROJECT_GROUP |
		DELETE.BRANCH |
		UPDATE.UNPUBLISH_BRANCH |
		UPDATE.UNPUBLISH_PROJECT |
		CREATE.BRANCH
	);
const ROLE_USER =
	ROLE_MANAGER & ~(UPDATE.PROJECT_GROUP | UPDATE.PROJECT | UPDATE.BRANCH);

export const ROLES = {
	[EnumRole.owner]: ALL_ACCESS,
	[EnumRole.super]: ROLE_SUPER,
	[EnumRole.admin]: ROLE_ADMIN,
	[EnumRole.user]: ROLE_USER,
	[EnumRole.manager]: ROLE_MANAGER,
} as const;
