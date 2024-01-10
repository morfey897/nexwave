'use client';
import {
	ReactNode,
	createContext,
	useLayoutEffect,
	useRef,
	useContext,
} from 'react';
import createNWStore, { type NWStore } from '@/lib/store';

export const StoreContext = createContext<NWStore | null>(null);

export function UpdateStore({
	state,
}: {
	state: Parameters<typeof createNWStore>[0];
}) {
	const storeCtx = useContext(StoreContext);
	useLayoutEffect(() => {
		storeCtx?.setState({ ...storeCtx?.getState(), ...state });
	}, [storeCtx, state]);
	return null;
}

function StoreProvider({
	children,
	store,
}: {
	children: ReactNode;
	store: Parameters<typeof createNWStore>[0];
}) {
	const storeRef = useRef<NWStore | null>(null);
	if (!storeRef.current) {
		storeRef.current = createNWStore(store);
	}

	useLayoutEffect(() => {
		storeRef.current?.setState(store);
	}, [store]);

	return (
		<StoreContext.Provider value={storeRef.current}>
			{children}
		</StoreContext.Provider>
	);
}

export default StoreProvider;
