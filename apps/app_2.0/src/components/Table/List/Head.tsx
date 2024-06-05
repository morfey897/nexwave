import { ITableProps } from '@/types/table';
import { EnumSortBy } from '@/enums';
import { TUID } from '@/types/common';
import { hasType } from '@/utils/table';

import SortButton from '@/components/Button/SortButton';
import clsx from 'clsx';

function Head<T extends TUID>({
	title,
	head,
	className,
}: {
	title?: string;
	head: ITableProps<T>['head'];
} & React.HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<div
			className={clsx(
				'flex w-full gap-x-2 items-center justify-between py-3.5 px-4 text-xs lg:text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400',
				className,
			)}
		>
			<p className='text-lg w-2'>{title}</p>
			<div className='flex gap-x-4'>
				{head.map(({ token, type, title, comparator, onSort }) => {
					if (!!type && hasType(type, EnumSortBy.SYMBOLIC))
						return (
							<SortButton
								key={token}
								variant='text'
								comparator={comparator || 0}
								as='symbolic'
								onClick={() => typeof onSort === 'function' && onSort(token)}
								message={title}
								className='!p-0 text-xs md:text-sm'
							/>
						);
					if (!!type && hasType(type, EnumSortBy.NUMERIC))
						return (
							<SortButton
								key={token}
								variant='text'
								comparator={comparator || 0}
								as='numeric'
								onClick={() => typeof onSort === 'function' && onSort(token)}
								message={title}
								className='!p-0 text-xs md:text-sm'
							/>
						);
					return null;
				})}
			</div>
		</div>
	);
}

export default Head;
