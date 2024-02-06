import Link from 'next/link';
import clsx from 'clsx';
import Picture from './Picture';
import { abbrev, dynamicHref, findDynamicPath } from '@/utils';
import { usePathname } from 'next/navigation';
import { MdCheck } from 'react-icons/md';
import * as routes from '@/routes';

function Project({
	className,
	project,
	size = 'md',
	...props
}: {
	size?: 'sm' | 'md' | 'lg';
	project: {
		name: string;
		image?: string | null;
		slug: string;
	};
} & React.HTMLAttributes<HTMLDivElement>) {
	const pathname = usePathname();

	const sizeNumber = size === 'sm' ? 32 : size === 'md' ? 36 : 40;
	const active = !!project.slug && pathname.split('/').includes(project.slug);

	const path = findDynamicPath(pathname, Array.from(routes.DYNAMIC));
	return (
		<div
			className={clsx(
				'text-gray-600 dark:text-gray-200 font-semibold',
				{
					'text-sm': size === 'sm',
					'text-base': size === 'md',
					'text-lg': size === 'lg',
				},
				className,
			)}
			{...props}
		>
			<Link
				href={dynamicHref(path || routes.ROOT, { slug: project.slug })}
				className={clsx(
					'relative',
					'flex items-center gap-x-4',
					'group/relative',
				)}
			>
				<Picture
					variant='secondary'
					size={sizeNumber}
					photo={project?.image}
					abbrev={abbrev([project?.name?.split(/\s|-|_/g).slice(0, 2)])}
					name={project?.name}
					className='inline-block'
				/>
				<span
					className={clsx(
						'inline-block',
						'before:w-0 before:h-0.5 before:absolute before:-bottom-[2px] before:right-0 before:transition-all before:duration-500',
						'group-hover/relative:before:w-full group-hover/relative:before:left-0 before:bg-blue-500 group-hover/relative:before:bg-gradient-to-r group-hover/relative:before:from-blue-500 group-hover/relative:before:to-blue-800',
					)}
				>
					{project?.name}
				</span>
				{!!active && <MdCheck size={32} />}
			</Link>
		</div>
	);
}

export default Project;
