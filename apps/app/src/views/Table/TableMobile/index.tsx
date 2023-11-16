import { ITableProps } from '@/types/table';
import { TUID } from '@/types/common';
import Head from './Head';
import Body from './Body';

function TableMobile<T extends TUID>({
	head,
	body,
	...props
}: ITableProps<T> & React.HTMLAttributes<HTMLTableElement>) {
	return (
		<table {...props}>
			<Head className='bg-white dark:bg-gray-800 border-b-2 border-gray-200 dark:border-gray-700' head={head} />
			<Body
				className='bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700'
				head={head}
				body={body}
			/>
		</table>
	);
}

export default TableMobile;
