'use client';
import React from 'react';
import clsx from 'clsx';
import { HiOutlineCloudArrowUp } from 'react-icons/hi2';
import { HiOutlinePlusCircle } from 'react-icons/hi';
import { Button, GroupButton } from '@/components/Buttons';
import { Search } from '@/components/Inputs';
import { CountBadge } from '@/components/Badge';
import { TMessages } from '@/types/view';
import DropDown from '@/components/DropDown';
import { HiOutlineFilter } from 'react-icons/hi';

import { useFilter, useSearch } from '@/hooks/filter';
import { EnumSearchParams } from '@/types/filter';

interface IPageHeaderProps extends TMessages {
	onAdd?: () => void;
	onImport?: () => void;
	filters?: Array<{
		title: string;
		uid: string;
	}>;
}

function PageHeader({
	onAdd,
	onImport,
	messages,
	filters,
	className,
	...props
}: IPageHeaderProps & React.HTMLAttributes<HTMLDivElement>) {
	const { onFilter, filter } = useFilter({ name: EnumSearchParams.FILTER });
	const { onSearch, search } = useSearch({ name: EnumSearchParams.SEARCH });

	return (
		<div
			className={clsx(
				'container mx-auto sticky top-[80px] bg-gray-100 dark:bg-gray-900 z-10 pb-4',
				className,
			)}
			{...props}
		>
			<div className='flex items-center justify-between gap-x-3'>
				<div className='w-full'>
					<div className='flex items-center gap-x-3 justify-between'>
						<CountBadge count={messages?.amount}>
							<h2 className='text-lg font-medium text-gray-800 dark:text-white'>
								{messages?.headline}
							</h2>
						</CountBadge>

						<Button
							variant='primary'
							icon={<HiOutlinePlusCircle size={16} />}
							message={messages?.add}
							className='md:hidden text-sm my-1'
						/>
					</div>

					{!!messages?.subheadline && (
						<p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
							{messages?.subheadline}
						</p>
					)}
				</div>

				<div className='hidden md:flex items-center mt-4 gap-x-3 gap-y-2'>
					<GroupButton>
						{!!onAdd && (
							<Button
								onClick={onAdd}
								variant='primary'
								icon={<HiOutlinePlusCircle size={20} />}
								message={messages?.add}
							/>
						)}
						{!!onImport && (
							<Button
								onClick={onImport}
								icon={<HiOutlineCloudArrowUp size={20} />}
								message={messages?.import}
							/>
						)}
					</GroupButton>
				</div>
			</div>

			<div className='mt-4 flex gap-2 items-center justify-between justify-items-center'>
				<div className='flex shrink-0'>
					<DropDown
						direction={{ y: 'bottom' }}
						element={
							<Button
								icon={<HiOutlineFilter size={16} />}
								message={'Filter'}
								className='h-12 text-base'
							/>
						}
					>
						<div className='px-2 py-4 flex flex-col'>
							{filters?.map(({ uid, title }) => (
								<Button
									key={uid}
									onClick={() => onFilter(uid)}
									disabled={filter === uid}
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

				<Search
					onChange={onSearch}
					defaultValue={search || ''}
					placeholder={messages?.search as string}
					wrapperClassName='flex items-center w-full max-w-[380px]'
					className='h-12'
				/>
			</div>
		</div>
	);
}

export default PageHeader;
