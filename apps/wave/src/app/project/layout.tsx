import { getRefreshToken, getSession, getTrail } from '~utils/headers';
import { getUserFromSession } from '~models/user';
import Loading from '~root/app/loading';
import AuthView from '~components/auth';
import RefreshToken from '~components/user/RefreshToken';
import UpdateStore from '~components/user/UpdateStore';
import { Box, Container, Flex, Text } from '@radix-ui/themes';
import Sidebar from '../dashboard/components/Sidebar';
// import { useMemo } from 'react';
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
					{/* <Box flexGrow={'1'} mx={'20px'}>
						{!!user ? (
							<>
								{children}
								<UpdateStore state={{ user }} />
							</>
						) : (
							<>
								<Loading />
								<AuthView mode={hasTrail ? 'signIn' : 'signUp'} />
							</>
						)}
					</Box> */}
					{children}
				</Flex>
			</main>
			{!!refreshToken && <RefreshToken />}
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
	// 	//
	// 	// </div>
	// );
}
