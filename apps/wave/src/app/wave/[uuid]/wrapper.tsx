import React from 'react';
import Header from '~/components/header/dashboard';

function Template({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
}

export default Template;
