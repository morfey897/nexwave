import { TUID } from '@/types/common';
import { ITableProps } from '@/types/table';
import { EnumDeviceType } from '@/enums';
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
							key={`item_${token}_${item.uuid}`}
							className='text-gray-5 w-full text-ellipsis px-4 py-3.5 text-left text-xs font-normal lg:text-sm rtl:text-right'
							style={{ flex: flex || 1 }}
						>
							<Generator item={item} device={EnumDeviceType.DESKTOP} />
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default Body;
