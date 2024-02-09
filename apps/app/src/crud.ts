//Create
export const CREATE = {
	// Project section
	// Branch section
	BRANCH: 4,
} as const;

// Update
export const UPDATE = {
	// Project section
	PROJECT: 1,
	UNPUBLISH_PROJECT: 8,
	PROJECT_GROUP: 0,//16,
	PROJECT_ACCESS: 32,
	// Branch section
	BRANCH: 64,
	UNPUBLISH_BRANCH: 2048,
} as const;

// Delete
export const DELETE = {
	// Project section
	PROJECT: 128,
	PROJECT_GROUP: 0,//256,
	// Branch section
	BRANCH: 1024,
} as const;

// Read
export const READ = {} as const;
