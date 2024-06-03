import { describe, expect, test } from '@jest/globals';
import { schemas, orm } from '../src';
import * as utils from '../__utils__';

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
  describe('selectProjectWithUsers', () => {
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
                }
              },
            }
          }
        }
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
            }
          },
          {
            role: 'editor',
            user: {
              id: 2,
              name: 'Bobab',
            }
          },
          {
            role: 'viewer',
            user: {
              id: 3,
              name: 'Charlie',
            }
          },
        ]
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
                }
              },
            }
          }
        }
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
            }
          },
        ]
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
                }
              },
            }
          }
        }
      });
      expect(project).toEqual({
        id: 1,
        name: 'United States',
        roles: {
          admin: 512,
          user: 256,
        },
        users: []
      });
    });
    
  }); 

  /**
   * Select branches
   */
  describe('selectBranches', () => {
    /**
     * Test selectBranches
     */ 
    test('selectBranches', async () => {
      const projects = await cfg.db.query.Projects.findMany({
        columns: {
          id: true,
          name: true,
          currency: true,
          color: true,
          timezone: true,
          langs: true,
        },
        where: orm.eq(schemas.Projects.id, 1),
        with: {
          branches: {
            columns: {
              id: true,
              name: true,
              address: true,
              color: true,
              contacts: true,
              currency: true,
              timezone: true,
              langs: true,
              spaces: true,
            }
          },
        }
      });
      expect(projects).toEqual(
        [{ 
          id: 1, 
          name: 'United States',
          timezone: "America/New_York",
          currency: "USD",
          color: "green",
          langs: ["en-us"],
          branches: [
            { 
              id: 1, 
              name: 'Andersen, Alvarado and Mullins', 
              currency: 'USD', 
              timezone: 'Europe/Amsterdam',
              color: 'blue', 
              langs: ['en'],
              address: {
                address_line: "3398 Katherine Alley Apt. 398",
                city: "West Thomasville",
                country: "Luxembourg",
              }, 
              contacts: {
                phone: "569-426-7807",
              },
              spaces: [
                {id: 1, name: 'north',},
                {id: 2, name: 'realize',},
                {id: 3, name: 'energy',},
                {id: 4, name: 'serious',},
              ]
            },
          ]
        }]
      );
    });

    /**
     * Test selectBranches and no branches
     */
    test('selectBranches and no branches', async () => {
      const projects = await cfg.db.query.Projects.findMany({
        columns: {
          id: true,
          name: true,
          currency: true,
          color: true,
          timezone: true,
          langs: true,
        },
        where: orm.eq(schemas.Projects.id, 1),
        with: {
          branches: {
            where: orm.eq(schemas.Branches.id, 0),
            columns: {
              id: true,
              name: true,
              address: true,
              color: true,
              contacts: true,
              currency: true,
              timezone: true,
              langs: true,
              spaces: true,
            }
          },
        }
      });
      expect(projects).toEqual(
        [{ 
          id: 1, 
          name: 'United States',
          timezone: "America/New_York",
          currency: "USD",
          color: "green",
          langs: ["en-us"],
          branches: []
        }]
      );
    });
  });
});