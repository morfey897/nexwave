import { TUID } from '@/types/common';
import { ITableProps } from '@/types/table';
import { EnumDevice } from '@/types/view';

function Body<T extends TUID>({
	head,
	body,
	...props
}: ITableProps<T> & React.HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<tbody {...props}>
			{body?.map((item, row) => (
				<tr key={`tr_${row}`}>
					{head.map(({ token, Generator }) => (
						<td
							key={`item_${token}_${item._uid}`}
							className='px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap'
						>
							<Generator item={item} device={EnumDevice.DESKTOP} />
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
}

export default Body;
