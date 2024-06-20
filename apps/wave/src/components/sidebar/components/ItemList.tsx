import Link from 'next/link';
import SidebarIconsSettings from '../IconsSettings';
import Separator from './Separator';

const ItemList = () => {
	const sidebarIconsSettings = SidebarIconsSettings();

	return (
		<div className='invisible-scrollbar overflow-y-auto py-1'>
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
								className='focus:outline-blue-blue hover:border-blue-blue hover:bg-gray-2 flex items-center rounded-t-lg border-b-2 border-transparent p-2 text-gray-600 focus:rounded-lg focus:border-b-0 dark:text-white dark:hover:bg-gray-700'
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
