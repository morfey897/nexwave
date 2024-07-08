import React from 'react';
import Header from '~/components/header/settings';

function Wrapper({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	);
}

export default Wrapper;
