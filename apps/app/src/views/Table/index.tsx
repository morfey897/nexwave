'use client';
import { useCallback, Fragment } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import clsx from 'clsx';
import { SORT_ASC, SORT_DESC } from '@/constants/searchparams';

import {
	BiSortAZ,
	BiSortZA,
	BiSortDown,
	BiSortUp,
	BiChevronDown,
	BiChevronUp,
} from 'react-icons/bi';
import { TSort, IHeadProps, ITableProps } from '@/types/table';

const hasType = (type: TSort | TSort[], input: TSort) =>
	type === input || (Array.isArray(type) && type.includes(input));

function SortIcon_S({
	s_asc,
	s_desc,
	uid,
}: { uid: string } & {
	s_asc?: string | null;
	s_desc?: string | null;
}) {
	if (s_asc?.includes(uid)) return <BiSortAZ size={20} />;
	if (s_desc?.includes(uid)) return <BiSortZA size={20} />;
	return <span className='w-[20px] h-[20px]' />;
}

function SortIcon_N({
	s_asc,
	s_desc,
	uid,
}: { uid: string } & {
	s_asc?: string | null;
	s_desc?: string | null;
}) {
	if (s_asc?.includes(uid)) return <BiSortDown size={20} />;
	if (s_desc?.includes(uid)) return <BiSortUp size={20} />;
	return <span className='w-[20px] h-[20px]' />;
}

function Table<T extends { _uid: string }>({
	head,
	headMobile,
	body,
	className,
	empty,
	...props
}: ITableProps<T> & {
	empty?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
	const params = useSearchParams();
	const router = useRouter();

	const isEmpty = !body?.length;

	const onSort = useCallback(
		(uid: string) => {
			const clone = new URLSearchParams(params);
			if (clone.get(SORT_ASC) === uid) {
				clone.set(SORT_ASC, '');
				clone.set(SORT_DESC, uid);
			} else if (clone.get(SORT_DESC) === uid) {
				clone.set(SORT_DESC, '');
			} else {
				clone.set(SORT_ASC, uid);
			}
			if (!clone.get(SORT_DESC)) {
				clone.delete(SORT_DESC);
			}
			if (!clone.get(SORT_ASC)) {
				clone.delete(SORT_ASC);
			}
			const str = clone.toString();
			router.push(`?${str}`);
		},
		[params, router],
	);

	return (
		<div className={clsx('flex flex-col my-6', className)} {...props}>
			<div className='overflow-x-auto min-w-full align-middle'>
				{(!isEmpty || !empty) && (
					<div className='overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg'>
						<table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
							<thead className='bg-gray-50 dark:bg-gray-800 hidden lg:table-header-group'>
								<tr>
									{head.map(({ token, type, title }) => (
										<th
											key={token}
											scope='col'
											className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400'
										>
											{hasType(type, 'sorted_s') && (
												<button
													onClick={() => onSort(token)}
													className='flex items-center gap-x-2 hover:underline'
												>
													<span>{title}</span>
													<SortIcon_S
														uid={token}
														s_asc={params.get(SORT_ASC)}
														s_desc={params.get(SORT_DESC)}
													/>
												</button>
											)}
											{hasType(type, 'sorted_n') && (
												<button
													onClick={() => onSort(token)}
													className='flex items-center gap-x-2 hover:underline'
												>
													<span>{title}</span>
													<SortIcon_N
														uid={token}
														s_asc={params.get(SORT_ASC)}
														s_desc={params.get(SORT_DESC)}
													/>
												</button>
											)}
											{hasType(type, 'none') && <span>{title}</span>}
											{hasType(type, 'sr-only') && (
												<span className='sr-only'>{title}</span>
											)}
										</th>
									))}
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 hidden lg:table-row-group'>
								{body?.map((item, row) => (
									<tr key={`tr_${row}`}>
										{head.map(({ token, Generator }) => (
											<td
												key={`item_${token}_${item._uid}`}
												className='px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap'
											>
												<Generator item={item} token={token} />
											</td>
										))}
									</tr>
								))}
							</tbody>
							<tbody className='bg-white dark:bg-gray-900 lg:hidden'>
								{body?.map((item, row) =>
									(headMobile || head).map(
										({ token, Generator, title, type }, index) => (
											<tr
												key={`tr_${row}_${index}}`}
												className={clsx(
													'border-b dark:bg-gray-900 border-gray-200 dark:border-gray-700',
													hasType(type, 'head') &&
														'bg-gray-100 dark:bg-gray-900',
												)}
											>
												{hasType(type, 'head') && (
													<>
														<td className='px-4 py-2' colSpan={2}>
															<div className='flex align-end justify-between'>
																<Generator item={item} token={token} />
																<input type='checkbox' className='peer' />
																<div className='hidden peer-checked:block'>
																	SHOW
																</div>
																{/* <button>{<BiChevronDown size={24} />}</button> */}
															</div>
														</td>
													</>
												)}
												{!hasType(type, 'head') && (
													<>
														<td className='w-4/12 pl-4 pr-2 py-4 md:text-base text-sm'>
															<span>{title}</span>
														</td>
														<td className='w-8/12 pl-4 pr-2 py-2 overflow-x-hidden'>
															<Generator item={item} token={token} />
														</td>
													</>
												)}
											</tr>
										),
									),
								)}
							</tbody>
						</table>
					</div>
				)}
				{isEmpty && empty}
			</div>
		</div>
	);
}

export default Table;
