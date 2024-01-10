import { createStore } from 'zustand';
import type { ICurrentUser } from '@/models/user';
import type { TProjectToUser } from '@/models/project';
import { immer } from 'zustand/middleware/immer';

export interface INWStore {
	user: ICurrentUser | null;
	activeProject: TProjectToUser | null;
	projects: TProjectToUser[] | null;
}

export type NWStore = ReturnType<typeof createNWStore>;

function createNWStore(state: Partial<INWStore>) {
	const DEFAULT_STATE: INWStore = {
		user: null,
		activeProject: null,
		projects: null,
	};

	return createStore(
		immer<INWStore>((set, get) => ({
			...DEFAULT_STATE,
			...state,
		})),
	);
}
export default createNWStore;
