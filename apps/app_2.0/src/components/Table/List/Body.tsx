import { TUID } from '@/types/common';
import { ITableProps } from '@/types/table';
import { EnumDeviceType } from '@/enums';
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
						inputProps={{
							children: (
								<div className='flex justify-between p-4 pl-3'>
									{head.slice(0, 1).map(({ Generator, token }) => (
										<Generator
											key={`generator_${item.uuid}_${token}`}
											item={item}
											device={EnumDeviceType.MOBILE}
										/>
									))}
									<span className='icon block shrink-0 rotate-0 self-baseline transition-transform ease-out'>
										<BiChevronDown size={24} className={''} />
									</span>
								</div>
							),
						}}
						className={clsx('bg-white dark:bg-gray-800')}
					>
						<div className='divide-y divide-gray-200 bg-gray-50 dark:divide-gray-700 dark:bg-gray-900'>
							{head.slice(1).map(({ token, Generator, title }) => (
								<div
									key={`line_${item.uuid}_${token}`}
									className='align-end flex justify-between gap-x-4 p-4 pl-3'
								>
									<div>
										<span>{title}</span>
									</div>
									<Generator
										key={`generator_${item.uuid}_${token}`}
										item={item}
										device={EnumDeviceType.MOBILE}
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
