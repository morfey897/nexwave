import { createStore } from 'zustand';
import { ICurrentUser } from '@/models/user';
import { immer } from 'zustand/middleware/immer';

export interface INWStore {
	user: ICurrentUser | null;
}

export type NWStore = ReturnType<typeof createNWStore>;

function createNWStore(state: Partial<INWStore>) {
	const DEFAULT_STATE: INWStore = {
		user: null,
	};

	return createStore(
		immer<INWStore>((set, get) => ({
			...DEFAULT_STATE,
			...state,
		})),
	);
}
export default createNWStore;
