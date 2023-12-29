import Sidebar from '@/components/Sidebar';
import Block from '@/components/Block';
import Breadcrumbs from '@/components/Breadcrumbs';

export default async function ProjectLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: { slug: string };
}) {
	return (
		<>
			<Sidebar params={params} />
			<Block>
				<Breadcrumbs />
				{children}
			</Block>
		</>
	);
}
