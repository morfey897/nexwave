'use client';

import { useLayoutEffect, useRef } from 'react';
import useNWStore, { type INWStore } from '~lib/store';

function UpdateStore({ state }: { state: Partial<INWStore> }) {
	const unsynced = useRef(true);
	const setState = useNWStore((store) => store.setState);

	useLayoutEffect(() => {
		if (unsynced.current) {
			unsynced.current = false;
			setState(state);
		}
	}, [state, setState]);
	return null;
}

export default UpdateStore;
