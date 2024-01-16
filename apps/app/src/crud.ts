//Create
export const CREATE = {
  // Project section
  PROJECT: 2,
  // Branch section
  BRANCH: 4,
};

// Update
export const UPDATE = {
  // Project section
  PROJECT: 1,
  PROJECT_INFO: 8,
  PROJECT_GROUPS: 16,
  PROJECT_ACCESS: 32,
  // Branch section
  BRANCH: 64,
};

// Delete
export const DELETE = {
  // Project section
  PROJECT: 128,
  PROJECT_GROUP: 256,
  PROJECT_ACCESS: 512,
  // Branch section
  BRANCH: 1024,
};

// Read
export const READ = {

};

export const C = CREATE;
export const U = UPDATE;
export const D = DELETE;
export const R = READ;