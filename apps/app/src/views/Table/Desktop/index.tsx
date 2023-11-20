import { ITableProps } from '@/types/table';
import { TUID } from '@/types/common';
import Head from './Head';
import Body from './Body';

function TableDesktop<T extends TUID>({
	head,
	body,
	...props
}: ITableProps<T> & React.HTMLAttributes<HTMLTableElement>) {
	return (
		<table {...props}>
			<Head className='bg-gray-50 dark:bg-gray-800' head={head} />
			<Body
				className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900'
				head={head}
				body={body}
			/>
		</table>
	);
}

export default TableDesktop;
