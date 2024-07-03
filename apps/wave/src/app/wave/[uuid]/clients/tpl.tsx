import React from 'react';
import Header from '~/components/header/clients';

function Template({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
}

export default Template;
