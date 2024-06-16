import ThemeSwithcer from './components/ThemeSwitcher';

export default async function ProjectLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			<div className='flex h-screen'>
				<div className='w-[300px] bg-primary p-4'>
					<h2>Sidebar</h2>
					<ThemeSwithcer />
				</div>
				<div className='mx-5 grow'>
					<div className='container'>{children}</div>
				</div>
			</div>
		</main>
	);
}
