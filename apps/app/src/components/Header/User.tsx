import Image from 'next/image';
import { User } from 'firebase/auth';

export default function User({
	user,
	...props
}: { user: User | null } & React.HTMLAttributes<HTMLDivElement>) {
	const avatar = 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d29tYW4lMjBibHVlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=face&w=500&q=200';
	return (
		<div {...props}>
			<Image
				className='shrink-0 object-cover mx-1 rounded-full w-9 h-9'
				src={avatar}
				alt={user?.displayName || user?.email || 'avatar'}
				width={500}
				height={500}
			/>
			<div className='mx-1'>
				<h1 className='text-sm font-semibold text-gray-700 dark:text-gray-200'>
					{user?.displayName}
				</h1>
				<p className='text-sm text-gray-500 dark:text-gray-400 break-words hyphens-auto'>
					{user?.email}
				</p>
			</div>
		</div>
	);
}
