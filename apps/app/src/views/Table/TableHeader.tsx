'use client';
import React from 'react';
import clsx from 'clsx';
import {
	HiOutlineCloudArrowUp,
	HiOutlineCloudArrowDown,
} from 'react-icons/hi2';
import { HiOutlinePlusCircle, HiOutlineSearch } from 'react-icons/hi';
import { useTranslations } from 'next-intl';
import { Button, GroupButton } from '@/components/Buttons';
import { Search } from '@/components/Inputs';

type TTableHeaderProps = {
	messages?: Record<string, string>;
	filters?: Array<{
		title: string;
		active: boolean;
		uid: string;
	}>;
};

function TableHeader({
	messages,
	filters,
	className,
	...props
}: TTableHeaderProps & React.HTMLAttributes<HTMLDivElement>) {
	const t = useTranslations('common');

	return (
		<div className={clsx('container mx-auto mb-6', className)} {...props}>
			<div className='sm:flex sm:items-center sm:justify-between gap-x-3'>
				<div>
					<div className='flex items-center gap-x-3'>
						<h2 className='text-lg font-medium text-gray-800 dark:text-white'>
							{messages?.headline}
						</h2>

						{!!messages?.amount && (
							<span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400'>
								{messages?.amount}
							</span>
						)}
					</div>

					{!!messages?.subheadline && (
						<p className='mt-1 text-sm text-gray-500 dark:text-gray-300'>
							{messages?.subheadline}
						</p>
					)}
				</div>

				<div className='flex items-center mt-4 gap-x-3 gap-y-2'>
					<GroupButton>
						<Button
							variant='primary'
							icon={<HiOutlinePlusCircle size={20} />}
							message={messages?.add}
						/>
						<Button
							icon={<HiOutlineCloudArrowUp size={20} />}
							message={messages?.import}
						/>
					</GroupButton>
					{/* TODO */}
					{/* <button className='flex items-center justify-center w-full px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700'>
						<HiOutlineCloudArrowDown size={20} />
						<span>{messages?.export}</span>
					</button> */}
				</div>
			</div>

			<div className='mt-6 md:flex md:items-center md:justify-between'>
				<div className='w-full'>
					<GroupButton>
						{filters?.map(({ uid, title, active }) => (
							<Button
								key={uid}
								disabled={active}
								className={clsx(
									'disabled:text-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-800 dark:disabled:text-gray-300',
								)}
							>
								{title}
							</Button>
						))}
					</GroupButton>
				</div>

				<Search
					placeholder={messages?.search}
					wrapperClassName='flex items-center mt-4 md:mt-0 w-full'
				/>
			</div>
		</div>
	);
}

export default TableHeader;
