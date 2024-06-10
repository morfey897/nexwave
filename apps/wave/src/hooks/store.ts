// import { useContext } from 'react';
// import { useStore } from 'zustand';
// import { StoreContext } from '@/providers/StoreProvider';
// import { INWStore } from '@/lib/store';

// export function useNWStore<T>(selector: (state: INWStore) => T): T {
// 	const store = useContext(StoreContext);
// 	if (!store) {
// 		throw new Error('Missing StoreProvider');
// 	}
// 	return useStore(store, selector);
// };
