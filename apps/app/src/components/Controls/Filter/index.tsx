'use client';
import clsx from 'clsx';
import DropDown from '@/components/DropDown';
import { Button, GroupButton } from '@/components/Button';

interface IFilter {
	onChange?: (uid: string) => void;
	value?: string | null;
	filters?: Array<{
		title: string;
		uid: string;
	}>;
	icon?: React.ReactNode;
	message?: string | number | undefined,
	as?: 'dropdown' | 'group' | 'auto:lg' | 'auto:md';
}

const AsDropDown = ({
	onChange,
	value,
	icon,
	message,
	filters,
	className,
}: { className?: string } & IFilter) => (
	<DropDown
		wrapperClassName={clsx(className)}
		direction={{ y: 'bottom' }}
		element={<Button icon={icon} message={message} />}
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
);

const AsGroup = ({
	onChange,
	value,
	filters,
	className,
}: { className?: string } & IFilter) => (
	<GroupButton className={clsx(className)}>
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
	</GroupButton>
);

function Filter({
	onChange,
	value,
	message,
	filters,
	icon,
	as,
	...props
}: IFilter & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>) {
	return (
		<div {...props}>
			{as === 'dropdown' && (
				<AsDropDown
					onChange={onChange}
					value={value}
					message={message}
					filters={filters}
					icon={icon}
				/>
			)}
			{as === 'group' && (
				<AsGroup
					onChange={onChange}
					value={value}
					message={message}
					filters={filters}
					icon={icon}
				/>
			)}
			{(as === 'auto:lg' || as === 'auto:md') && (
				<>
					<AsGroup
						className={clsx('hidden', {
							'md:flex': as === 'auto:md',
							'lg:flex': as === 'auto:lg',
						})}
						onChange={onChange}
						value={value}
						message={message}
						filters={filters}
						icon={icon}
					/>
					<AsDropDown
						className={clsx({
							'md:hidden': as === 'auto:md',
							'lg:hidden': as === 'auto:lg',
						})}
						onChange={onChange}
						value={value}
						message={message}
						filters={filters}
						icon={icon}
					/>
				</>
			)}
		</div>
	);
}

export default Filter;
