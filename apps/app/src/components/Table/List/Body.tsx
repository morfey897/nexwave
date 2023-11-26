import { TUID } from '@/types/common';
import { ITableProps } from '@/types/table';
import { EnumDevice } from '@/types/view';
import clsx from 'clsx';
import { BiChevronDown } from 'react-icons/bi';

function Body<T extends TUID>({
	head,
	body,
	className,
}: ITableProps<T> & React.HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<div className={clsx(className)}>
			{body?.map((item) => (
				<div key={`tr_${item._uid}}`}>
					<div className={clsx('bg-white dark:bg-gray-800')}>
						<input
							type='checkbox'
							id={`cb_${item._uid}`}
							className='peer sr-only'
						/>
						<label
							htmlFor={`cb_${item._uid}`}
							className='cursor-pointer peer-checked:[&>div>span]:rotate-180'
						>
							<div className='p-4 pl-3 flex justify-between'>
								{head.slice(0, 1).map(({ Generator, token }) => (
									<Generator
										key={`generator_${item._uid}_${token}`}
										item={item}
										device={EnumDevice.MOBILE}
									/>
								))}
								<span className='shrink-0 block transition-transform rotate-0 ease-out self-baseline'>
									<BiChevronDown size={24} className={''} />
								</span>
							</div>
						</label>
						<div className='overflow-hidden max-h-0 ease-out transition-all peer-checked:max-h-[100vh] divide-y bg-gray-50 dark:bg-gray-900 divide-gray-200 dark:divide-gray-700'>
							{head.slice(1).map(({ token, Generator, title }) => (
								<div
									key={`line_${item._uid}_${token}`}
									className='p-4 pl-3 flex align-end justify-between gap-x-4'
								>
									<div>
										<span>{title}</span>
									</div>
									<Generator
										key={`generator_${item._uid}_${token}`}
										item={item}
										device={EnumDevice.MOBILE}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default Body;
