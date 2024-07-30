'use client';

import Header from './Header';
import Body from './Body';
import EditViewAction from './ViewAction';
import * as Alert from '~/components/dialogs/Alert';

function Layout({ body }: { body: React.ComponentProps<typeof Body> }) {
	return (
		<>
			<Header />
			<Body {...body} />

			{/* Actions */}
			<EditViewAction />
			{/* Alert */}
			<Alert.Provider />
		</>
	);
}

export default Layout;
