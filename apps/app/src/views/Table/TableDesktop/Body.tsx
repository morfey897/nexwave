import { TUID } from '@/types/common';
import { ITableProps } from '@/types/table';

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
							<Generator item={item} token={token} />
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
}

export default Body;
