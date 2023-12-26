'use client';
import {
	ReactNode,
	createContext,
	useLayoutEffect,
	useRef,
} from 'react';
import createNWStore, { type NWStore } from '@/lib/store';

export const StoreContext = createContext<NWStore | null>(null);

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
