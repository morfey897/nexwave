import { BiSortAZ, BiSortZA, BiSortDown, BiSortUp } from 'react-icons/bi';

export function SortIcon_S({
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

export function SortIcon_N({
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