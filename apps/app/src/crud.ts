//Create
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
