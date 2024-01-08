'use client';
import Button from '@/components/Button';
import { HiOutlinePlus, HiChevronDown } from 'react-icons/hi';
import { BsDiagram2 } from 'react-icons/bs';
import { useTranslations } from 'next-intl';
import Accordion from '@/components/Accordion';
import Branch from '@/components/Sidebar/Branch';
import Marker from '@/components/Project/Marker';
import { type IModal, Position, Blur, withModal } from '@nw/modal';
import clsx from 'clsx';

const PROJECTS = [
	{
		title: 'Meraki UI Components',
		slug: 'meraki-ui-components',
		color: 'pink',
		branches: [
			{
				title: 'Design system',
				slug: 'design-system',
				image: 'https://source.unsplash.com/random?w=64&h=64',
			},
			{ title: 'Design system2', slug: 'design-system2' },
		],
	},
	{
		title: 'Meraki UI Components2',
		slug: 'meraki-ui-components2',
		color: 'green',
		branches: [
			{ title: 'Wishlist components', slug: 'wish-list-components' },
			{ title: 'Wishlist components2', slug: 'wish-list-components2' },
		],
	},
];

function AsideProjects(props: IModal) {
	const t = useTranslations('common');

	return (
		<aside
			className={clsx(
				'mt-[86px] px-4 py-8',
				'h-screen w-64 overflow-y-auto',
				'bg-white dark:bg-gray-800 dark:border-gray-700 border-r',
			)}
		>
			<div className='flex items-center justify-between'>
				<h2 className='text-base font-semibold text-gray-600 dark:text-gray-300 flex items-center'>
					<BsDiagram2 size={32} />
					<span className='ml-2'>{t('projects')}</span>
				</h2>

				<Button
					variant='default'
					size='md'
					className='!p-1'
					icon={<HiOutlinePlus size={16} />}
				/>
			</div>
			<div className='mt-2 space-y-2'>
				{PROJECTS.map((project, index) => (
					<Accordion
						key={project.slug}
						id={project.slug}
						active={index === 0}
						head={
							<div className='flex items-center justify-between w-full px-2 py-2 text-xs font-medium text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700'>
								<div className='flex items-center gap-x-2 '>
									<Marker color={project.color} />
									<span>{project.title}</span>
								</div>

								<span className='icon shrink-0 block transition-transform rotate-0 ease-out self-baseline'>
									<HiChevronDown size={16} />
								</span>
							</div>
						}
					>
						<div className='space-y-2'>
							{project.branches.map((branch, index) => (
								<Branch
									key={branch.slug}
									image={branch.image}
									message={branch.title}
									active={index === 0}
								/>
							))}
						</div>
					</Accordion>
				))}
			</div>
		</aside>
	);
}

export default withModal(AsideProjects, {
	zIndex: 20,
	position: Position.LEFT,
	overlay: {
		blur: Blur.MD,
		className: 'bg-gray-100/20 dark:bg-black/60',
	},
});
