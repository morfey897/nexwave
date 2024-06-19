import Link from 'next/link';
import SidebarIconsSettings from '../IconsSettings';
import Separator from './Separator';

const ItemList = () => {
	const sidebarIconsSettings = SidebarIconsSettings();

	return (
		<div className='invisible-scrollbar overflow-y-auto'>
			<ul className='space-y-2 font-medium md:px-2 lg:px-3'>
				{sidebarIconsSettings.map((item, index) =>
					item.type === 'divider' ? (
						<li key={index}>
							<Separator />
						</li>
					) : (
						<li key={index}>
							<Link
								href={item.href}
								className='flex rounded-lg p-2 text-gray-600 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700'
							>
								<span>{item.icon}</span>
								<span className='ms-3 md:hidden lg:block'>{item.name}</span>
							</Link>
						</li>
					)
				)}
			</ul>
		</div>
	);
};

export default ItemList;
