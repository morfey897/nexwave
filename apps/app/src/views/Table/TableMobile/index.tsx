import { ITableProps } from '@/types/table';
import { TUID } from '@/types/common';
import Body from './Body';

function TableMobile<T extends TUID>({
	head,
	body,
	...props
}: ITableProps<T> & React.HTMLAttributes<HTMLTableElement>) {
	return (
		<table {...props}>
			<Body
				className='bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700'
				head={head}
				body={body}
			/>
		</table>
	);
}

export default TableMobile;
