import clsx from 'clsx';

import { ITableProps } from '@/types/table';
import { TUID } from '@/types/common';
import TableMobile from './TableMobile';
import TableDesktop from './TableDesktop';

function Table<T extends TUID>({
	head,
	body,
	className,
	empty,
	...props
}: ITableProps<T> & {
	empty?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {

	const isEmpty = !body?.length;

	return (
		<div className={clsx('flex flex-col my-4 lg:my-6', className)} {...props}>
			<div className='overflow-x-auto min-w-full align-middle'>
				{(!isEmpty || !empty) && (
					<div className='overflow-hidden border rounded-md border-gray-200 dark:border-gray-700 md:rounded-lg'>
						<TableDesktop
							className='min-w-full hidden lg:table'
							head={head}
							body={body}
						/>
						<TableMobile
							className='min-w-full lg:hidden'
							head={head}
							body={body}
						/>
					</div>
				)}
				{isEmpty && empty}
			</div>
		</div>
	);
}

export default Table;
