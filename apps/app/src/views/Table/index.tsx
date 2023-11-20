import clsx from 'clsx';

import { ITableProps } from '@/types/table';
import { TUID } from '@/types/common';
import TableMobile from './Mobile';
import TableDesktop from './Desktop';
import { TDeviceProps, EnumDevice } from '@/types/view';

function Table<T extends TUID>({
	head,
	body,
	className,
	empty,
	device,
	...props
}: ITableProps<T> &
	TDeviceProps & {
		empty?: React.ReactNode;
	} & React.HTMLAttributes<HTMLDivElement>) {
	const isEmpty = !body?.length;

	return (
		<div className={clsx('flex flex-col my-4 lg:my-6', className)} {...props}>
			<div className='overflow-x-auto min-w-full align-middle'>
				{(!isEmpty || !empty) && (
					<div className='overflow-scroll container border rounded-md border-gray-200 dark:border-gray-700 md:rounded-lg'>
						{device === EnumDevice.DESKTOP && (
							<TableDesktop
								className='min-w-full'
								head={head}
								body={body}
							/>
						)}
						{device != EnumDevice.DESKTOP && (
							<TableMobile
								className='min-w-full'
								head={head}
								body={body}
							/>
						)}
					</div>
				)}
				{isEmpty && empty}
			</div>
		</div>
	);
}

export default Table;
