import { TUID } from '@/types/common';
import { ITableProps } from '@/types/table';
import { EnumDevice } from '@/types/view';
import clsx from 'clsx';
import { BiChevronDown } from 'react-icons/bi';
import Accordion from '@/components/Accordion';

function Body<T extends TUID>({
	head,
	body,
	className,
}: ITableProps<T> & React.HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<div className={clsx(className)}>
			{body?.map((item) => (
				<div key={`tr_${item.uuid}}`}>
					<Accordion
						id={`cb_${item.uuid}`}
						head={
							<div className='p-4 pl-3 flex justify-between'>
								{head.slice(0, 1).map(({ Generator, token }) => (
									<Generator
										key={`generator_${item.uuid}_${token}`}
										item={item}
										device={EnumDevice.MOBILE}
									/>
								))}
								<span className='icon shrink-0 block transition-transform rotate-0 ease-out self-baseline'>
									<BiChevronDown size={24} className={''} />
								</span>
							</div>
						}
						className={clsx('bg-white dark:bg-gray-800')}
					>
						<div className='divide-y bg-gray-50 dark:bg-gray-900 divide-gray-200 dark:divide-gray-700'>
							{head.slice(1).map(({ token, Generator, title }) => (
								<div
									key={`line_${item.uuid}_${token}`}
									className='p-4 pl-3 flex align-end justify-between gap-x-4'
								>
									<div>
										<span>{title}</span>
									</div>
									<Generator
										key={`generator_${item.uuid}_${token}`}
										item={item}
										device={EnumDevice.MOBILE}
									/>
								</div>
							))}
						</div>
					</Accordion>
				</div>
			))}
		</div>
	);
}

export default Body;
