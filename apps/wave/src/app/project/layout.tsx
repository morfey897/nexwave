import { getRefreshToken, getSession, getTrail } from '~utils/headers';
import { getUserFromSession } from '~models/user';
import { Box, Container, Flex, Text } from '@radix-ui/themes';
// import { useMemo } from 'react';
import Sidebar from '~components/sidebar';
// import Loading from '../../app/loading';
// import AuthView from '~components/auth';
// import RefreshToken from '~components/user/RefreshToken.client';
// import UpdateStore from '~components/user/UpdateStore.client';

export default async function ProjectLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getUserFromSession(getSession());
	const refreshToken = getRefreshToken();
	const hasTrail = !!getTrail();

	const content = new Array(100)
		.fill(0)
		.map((_, i) => <Text key={i}>Aside</Text>);

	return (
		<>
			{/* <header>
				<Container>
					<Flex align={'center'}>
						<Text>Header</Text>
					</Flex>
				</Container>
			</header> */}
			<main>
				<Flex height={'100vh'}>
					<Sidebar />
					<Box flexGrow={'1'}>{children}</Box>
				</Flex>
			</main>
		</>
	);

	// return (
	// 	// <div className='w-full'>
	// 	// 	{!!user ? (
	// 	// 		<>
	// 	// 			{children}
	// 	// 			<UpdateStore state={{ user }} />
	// 	// 		</>
	// 	// 	) : (
	// 	// 		<>
	// 	// 			<Loading />
	// 	// 			<AuthView mode={hasTrail ? 'signIn' : 'signUp'} />
	// 	// 		</>
	// 	// 	)}
	// 	// 	{!!refreshToken && <RefreshToken />}
	// 	// </div>
	// );
}
