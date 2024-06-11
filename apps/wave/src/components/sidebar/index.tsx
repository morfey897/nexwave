import { Box, Container, Heading, ScrollArea } from '@radix-ui/themes';
import { useMemo } from 'react';
import ThemeSwitcher from './ThemeSwitcher';
// import styles from './style.module.css';

export default function Sidebar() {
	const content = useMemo(
		() =>
			new Array(100).fill(0).map((_, i) => (
				<Heading as='h3' key={i}>
					Aside
				</Heading>
			)),
		[]
	);

	// return (
	// 	<Box
	// 		width={'300px'}
	// 		style={{ background: '#1F2A37' }}
	// 		overflowY={'auto'}
	// 		overflowX={'hidden'}
	// 	>
	// 		<Flex direction={'column'}>
	// 			<ThemeSwitcher />
	// 			{content}
	// 		</Flex>
	// 	</Box>
	// );
	return (
		<Box
			position={'relative'}
			width={'300px'}
			style={{ background: '#1F2A37' }}
			// overflowY={'auto'}
			// overflowX={'hidden'}
		>
			<Box
				position={'fixed'}
				top={'0'}
				style={{ background: '#ff00001f' }}
				width={'300px'}
			>
				<ThemeSwitcher />
			</Box>
			<ScrollArea scrollbars='vertical' type='auto'>
				<Box p='2' pr='8'>
					{content}
				</Box>
			</ScrollArea>
			<Box position={'fixed'} bottom={'0'}>
				<Container
					height={'50px'}
					width={'300px'}
					style={{ background: '#ff00001f' }}
				>
					Container
				</Container>
			</Box>
		</Box>
	);
}
