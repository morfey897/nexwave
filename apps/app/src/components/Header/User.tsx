import Image from 'next/image';

type TUserProps = {
	avatar: string;
	email: string;
	name: string;
	surname: string;
};

export default function User({
	user,
	...props
}: { user: TUserProps } & React.HTMLAttributes<HTMLDivElement>) {
	const fullname = [user.name, user.surname]
		.filter((v) => Boolean(v))
		.join(' ');
	return (
		<div {...props}>
			<Image
				className='shrink-0 object-cover mx-1 rounded-full w-9 h-9'
				src={user.avatar}
				alt={fullname}
				width={500}
				height={500}
			/>
			<div className='mx-1'>
				<h1 className='text-sm font-semibold text-gray-700 dark:text-gray-200'>
					{fullname}
				</h1>
				<p className='text-sm text-gray-500 dark:text-gray-400 break-words hyphens-auto'>
					{user.email}
				</p>
			</div>
		</div>
	);
}
