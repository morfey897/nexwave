import { TUID } from '@/types/common';
import { ITableProps } from '@/types/table';
import { EnumDevice } from '@/types/view';
import clsx from 'clsx';

function Body<T extends TUID>({
	head,
	body,
	className,
}: ITableProps<T> & React.HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<div className={clsx(className)}>
			{body?.map((item, row) => (
				<div key={row} className={clsx('flex w-fit min-w-full items-center')}>
					{head.map(({ token, Generator, flex }) => (
						<div
							key={`item_${token}_${item._uid}`}
							className='w-full py-3.5 px-4 text-xs lg:text-sm font-normal rtl:text-right text-gray-500 dark:text-gray-400 text-left text-ellipsis'
							style={{ flex: flex || 1 }}
						>
							<Generator item={item} device={EnumDevice.DESKTOP} />
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default Body;
