import { useTranslations } from 'next-intl';
import { type IProject } from '@/models/project';
import ProjectItem from '@/components/Project';
import AddProject from './Add.client';

function Server({ projects }: { projects: IProject[] | null }) {
	const t = useTranslations();

	return (
		<section className='w-full'>
			<div className='container mx-auto px-6 py-10'>
				<h1 className='text-2xl font-semibold text-gray-800 lg:text-3xl dark:text-white'>
					{t.rich('page.projects.headline_rt', {
						span: (chunks) => <span className='text-blue-500'>{chunks}</span>,
					})}
				</h1>

				<p className='mt-4 text-gray-500 xl:mt-6 dark:text-gray-300'>
					{t('page.projects.subheadline')}
				</p>

				<div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 xl:mt-12 xl:grid-cols-3 xl:gap-12'>
					{projects?.map((project) => (
						<ProjectItem
							key={project.uuid}
							project={project}
							more_less={t('button.more_less')}
						/>
					))}
					<AddProject />
				</div>
			</div>
		</section>
	);
}

export default Server;
