import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
// import type { ICurrentUser } from '@/models/user';
// import type { IProject } from '@/models/project';
// import { sign } from 'crypto';

export interface INWStore {
	user: any | null;
	project: any | null;
	ui: {
		sidebar: boolean;
	};
}

interface INWStoreAction {
	updateProject: (project: Partial<any>) => void;
	setState: (state: Partial<INWStore>) => void;
	setUI: (ui: Partial<INWStore['ui']>) => void;
	_destroyStore: () => void;
}

const useNWStore = create(
	devtools(
		immer<INWStore & INWStoreAction>((set, get) => ({
			ui: {
				sidebar: false,
			},
			user: null,
			project: null,
			setUI: (ui: Partial<INWStore['ui']>) =>
				set((state) => {
					state.ui = { ...state.ui, ...ui };
				}),
			setState: (st: Partial<INWStore>) =>
				set((state) => {
					if (st.user) {
						state.user = st.user;
					}
					if (st.project) {
						state.project = st.project;
					}
				}),
			_destroyStore: () => set({ user: null, project: null }),
			updateProject: (project: Partial<any>) =>
				set((state) => {
					if (state.project === null) {
						state.project = {
							id: project.id || 0,
							uuid: project.uuid || '',
							createdAt: project.createdAt || new Date(),
							permission: project.permission || 0,
						} as any;
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
		}))
	)
);

export default useNWStore;
