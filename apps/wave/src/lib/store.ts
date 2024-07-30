/* eslint-disable no-param-reassign */
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { EnumTheme } from '~/constants/enums';
import type { IUser, IProject, IClient, IEmployee } from '@nw/storage';
import { generateShortId } from '~/utils';
import { IAlert } from '~/types';

type TAlert = Omit<IAlert, 'uuid'> & { uuid?: string };

export interface INWStore {
	user: IUser | null;
	project: IProject | null;
	theme: EnumTheme | null;
	ui: {
		sidebar: boolean;
		timetable: 'week' | 'day' | 'month';
	};
	alerts: IAlert[];

	clients: {
		active: IClient | null;
		search: string;
		filters: string[];
		headers: string[];
	};

	edit: {
		// client: IClient | null;
		employee: IEmployee | null;
		event: boolean;
		calendar: boolean;
	};
}

interface INWStoreAction {
	// General
	setState: (state: Partial<INWStore>) => void;
	setTheme: (theme: EnumTheme) => void;

	setUI: (ui: Partial<INWStore['ui']>) => void;

	addAlert: (alert: TAlert) => string;
	removeAlert: (uuid: string) => void;

	// Project
	updateProject: (project: Partial<IProject>) => void;

	// Clients
	updateClients: (clients: Partial<INWStore['clients']>) => void;

	// Deprecated
	setEdit: (edit: Partial<INWStore['edit']>) => void;

	// Dangerous
	dangerousDestroyStore: () => void;
}

const useNWStore = create(
	devtools(
		immer<INWStore & INWStoreAction>((set) => ({
			theme: EnumTheme.LIGHT,
			user: null,
			project: null,
			ui: {
				sidebar: false,
				timetable: 'week',
			},
			edit: {
				employee: null,
				event: false,
				calendar: false,
			},
			clients: {
				active: null,
				search: '',
				filters: [],
				headers: [],
			},
			alerts: [],
			// Set theme
			setTheme: (theme: EnumTheme) =>
				set((state) => {
					state.theme = theme;
				}),
			// Set UI
			setUI: (ui: Partial<INWStore['ui']>) =>
				set((state) => {
					state.ui = { ...state.ui, ...ui };
				}),
			// Initialize store
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

			addAlert: (alert: TAlert) => {
				const uuid = alert.uuid || generateShortId(6);
				set((state) => {
					state.alerts.push({ uuid, ...alert });
				});
				return uuid;
			},
			removeAlert: (uuid: string) =>
				set((state) => {
					state.alerts = state.alerts.filter((alert) => alert.uuid !== uuid);
				}),

			// Deprecated
			setEdit: (edit: Partial<INWStore['edit']>) =>
				set((state) => {
					state.edit = { ...state.edit, ...edit };
				}),

			// Update project
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
			// Update clients
			updateClients: (clients: Partial<INWStore['clients']>) =>
				set((state) => {
					state.clients = { ...state.clients, ...clients };
				}),
			// Dangerous
			dangerousDestroyStore: () =>
				set({
					user: null,
					project: null,
					ui: { sidebar: false, timetable: 'week' },
					edit: { employee: null, event: false, calendar: false },
					clients: { active: null, search: '', filters: [], headers: [] },
				}),
		}))
	)
);

export default useNWStore;
