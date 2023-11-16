'use client';
import { useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

import { SORT_ASC, SORT_DESC } from '@/constants/searchparams';

import { BiSortAZ, BiSortZA, BiSortDown, BiSortUp } from 'react-icons/bi';
import { IHeadProps } from '@/types/table';
import { TUID } from '@/types/common';
import { hasType } from '@/utils/table';

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

function Head<T extends TUID>({
	head,
	...props
}: { head: Array<IHeadProps<T>> } & React.HTMLAttributes<HTMLTableSectionElement>) {
	const params = useSearchParams();
	const router = useRouter();

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
		<thead {...props}>
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
	);
}

export default Head;
