import { createStore } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { ICurrentUser } from '@/models/user';
import type { IProject } from '@/models/project';
import { immer } from 'zustand/middleware/immer';

export interface INWStore {
	user: ICurrentUser | null;
	project: IProject | null;
	updateProject: (project: Partial<IProject>) => void;
}

export type NWStore = ReturnType<typeof createNWStore>;

function createNWStore(state: Partial<INWStore>) {
	return createStore(
		devtools(
			immer<INWStore>((set, get) => ({
				user: state.user || null,
				project: state.project || null,
				updateProject: (project: Partial<IProject>) =>
					set((state) => {
						if (state.project === null) {
							state.project = {
								id: project.id || 0,
								uuid: project.uuid || '',
								createdAt: project.createdAt || new Date(),
								permission: project.permission || 0,
							} as IProject;
						}
						if (typeof project.name === 'string') {
							state.project.name = project.name;
						}
						if (typeof project.color === 'string') {
							state.project.color = project.color;
						}
						if (typeof project.image === 'string') {
							state.project.image = project.image;
						}
						if (typeof project.currency === 'string') {
							state.project.currency = project.currency;
						}
						if (typeof project.state === 'string') {
							state.project.state = project.state;
						}
						if (Array.isArray(project.branches)) {
							state.project.branches = project.branches;
						}
					}),
			})),
		),
	);
}
export default createNWStore;
