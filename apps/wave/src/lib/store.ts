/* eslint-disable no-param-reassign */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { EnumTheme } from '~/constants/enums';
import type { IUser, IProject, IClient, IEmployee } from '@nw/storage';

export interface INWStore {
	user: IUser | null;
	project: IProject | null;
	theme: EnumTheme | null;
	ui: {
		sidebar: boolean;
		timetable: 'week' | 'day' | 'month';
	};

	edit: {
		client: IClient | null;
		employee: IEmployee | null;
		event: boolean;
		calendar: boolean;
	};
}

interface INWStoreAction {
	updateProject: (project: Partial<IProject>) => void;
	setState: (state: Partial<INWStore>) => void;
	setUI: (ui: Partial<INWStore['ui']>) => void;
	setTheme: (theme: EnumTheme) => void;
	setEdit: (edit: Partial<INWStore['edit']>) => void;
	dengirousDestroyStore: () => void;
}

const useNWStore = create(
	devtools(
		immer<INWStore & INWStoreAction>((set) => ({
			theme: EnumTheme.LIGHT,
			ui: {
				sidebar: false,
				timetable: 'week',
			},
			edit: {
				client: null,
				employee: null,
				event: false,
				calendar: false,
			},
			user: null,
			project: null,
			setTheme: (theme: EnumTheme) =>
				set((state) => {
					state.theme = theme;
				}),
			setUI: (ui: Partial<INWStore['ui']>) =>
				set((state) => {
					state.ui = { ...state.ui, ...ui };
				}),
			setState: (st: Partial<INWStore>) =>
				set((state) => {
					if (st.theme) {
						state.theme = st.theme;
					}
					if (st.user) {
						state.user = st.user;
					}
					if (st.project) {
						state.project = st.project;
					}
				}),

			setEdit: (edit: Partial<INWStore['edit']>) =>
				set((state) => {
					state.edit = { ...state.edit, ...edit };
				}),
			dengirousDestroyStore: () =>
				set({
					user: null,
					project: null,
					ui: { sidebar: false, timetable: 'week' },
					edit: { client: null, employee: null, event: false, calendar: false },
				}),
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
				}),
		}))
	)
);

export default useNWStore;
