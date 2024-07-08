import clsx from 'clsx';
import React from 'react';
import { EnumDeviceType } from '~/constants/enums';
import { TUID } from '@nw/storage';

export interface IHeadProps {
	key: string;
	title: React.ReactNode;
	alignX?: 'left' | 'center' | 'right';
	alignY?: 'top' | 'middle' | 'bottom';
	device?: EnumDeviceType;
}

export interface ITableProps<T extends TUID = TUID> {
	header: Array<IHeadProps>;
	content?: Array<T>;
	factory: (key: string, item: T) => React.ReactNode;
}

function Table<T extends TUID = TUID>({
	header,
	content,
	factory,
}: ITableProps<T>) {
	return (
		<div className='min-w-full'>
			<div className='table w-full'>
				<div className='text-primary-text bg-gray-1 dark:bg-dark-3 sticky top-[110px] z-10 table-header-group md:top-[136px]'>
					<div className='table-row'>
						{header.map(({ title, key, device, alignX }) => (
							<div
								key={key}
								className={clsx(
									device ? 'hidden' : 'table-cell',
									{
										'sm:table-cell': device === EnumDeviceType.MOBILE,
										'md:table-cell': device === EnumDeviceType.TABLET,
										'lg:table-cell': device === EnumDeviceType.DESKTOP,
									},
									{
										'text-left': alignX === 'left' || !alignX,
										'text-center': alignX === 'center',
										'text-right': alignX === 'right',
									}
								)}
							>
								{title}
							</div>
						))}
					</div>
				</div>
				<div className='bg-secondary text-secondary-text table-row-group'>
					{content?.map((item) => (
						<div key={`item-${item.id}`} className='table-row'>
							{header.map(({ key, alignX, alignY, device }) => {
								const child = factory(key, item);
								return (
									<div
										key={`item_${key}_${item.id}`}
										className={clsx(
											'table-cell',
											{
												'text-left': alignX === 'left' || !alignX,
												'text-center': alignX === 'center',
												'text-right': alignX === 'right',
												'align-top': alignY === 'top',
												'align-middle': alignY === 'middle' || !alignY,
												'align-bottom': alignY === 'bottom',
											},
											device ? 'hidden' : 'table-cell',
											{
												'sm:table-cell': device === EnumDeviceType.MOBILE,
												'md:table-cell': device === EnumDeviceType.TABLET,
												'lg:table-cell': device === EnumDeviceType.DESKTOP,
											}
										)}
									>
										{child}
									</div>
								);
							})}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Table;
