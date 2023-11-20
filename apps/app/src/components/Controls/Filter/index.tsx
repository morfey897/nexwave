'use client';
import clsx from 'clsx';
import DropDown from '../../DropDown';
import { Button } from '../../Button';
import { TMessage } from '@/types/view';

interface IFilter extends TMessage {
	onChange?: (uid: string) => void;
	value?: string | null;
	filters?: Array<{
		title: string;
		uid: string;
	}>;
	icon?: React.ReactNode;
}

function Filter({
	onChange,
	value,
	message,
	filters,
	icon,
	...props
}: IFilter & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>) {
	return (
		<div {...props}>
			<DropDown
				direction={{ y: 'bottom' }}
				element={
					<Button icon={icon} message={message} className='h-12 text-base' />
				}
			>
				<div className='px-2 py-4 flex flex-col'>
					{filters?.map(({ uid, title }) => (
						<Button
							key={uid}
							onClick={() => {
								typeof onChange === 'function' && onChange(uid);
							}}
							disabled={value === uid}
							className={clsx(
								'disabled:text-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-800 dark:disabled:text-gray-300',
							)}
						>
							{title}
						</Button>
					))}
				</div>
			</DropDown>
		</div>
	);
}

export default Filter;
