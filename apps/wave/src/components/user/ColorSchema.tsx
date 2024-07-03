'use client';

import { useLayoutEffect } from 'react';
import { EnumColor } from '~/constants/enums';

// --user-selected-blue: var(--blue-1);
// 	--user-selected-green: var(--green-1);
// 	--user-selected-yellow: var(--yellow-1);
// 	--user-selected-purple: var(--purple-1);
// 	--user-selected-cyan: var(--cyan-1);
// 	--user-selected-orange: var(--orange-1);
// 	--user-selected-teal: var(--teal-1);
// 	--user-selected-pink: var(--pink-1);
function ColorSchema({ color }: { color: string | null }) {
	// TODO need to update on the server side
	useLayoutEffect(() => {
		document.documentElement.style.setProperty(
			'--user-selected',
			`var(--user-selected-${EnumColor.PINK})`
		);
		// switch (color) {
		// 	case EnumColor.GREN: {

		// 		break;
		// 	}
		// 	default: {
		// 		document.documentElement.style.setProperty('--primary', '#3f51b5');
		// 		break;
		// 	}
		// }
	}, [color]);

	return null;
}

export default ColorSchema;
