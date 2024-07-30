import React, { useMemo } from 'react';
import ColumnsIcon from '~/icons/ColumnsIcon';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import CheckboxGroup from '~/components/controls/CheckboxGroup';
import { useTranslations } from 'next-intl';
import { headerOptions } from '../../config';
import * as Form from '@radix-ui/react-form';

const TableSettings = () => {
	const t = useTranslations();
	

	const options = useMemo(
		() =>
			headerOptions.map((item) => ({
				name: item.key,
				label: t(`page.clients.header.${item.key}`),
				checked: item.checked,
				disabled: !!item.checked,
			})),
		[t]
	);

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<ColumnsIcon />
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content className='bg-secondary custom-scrollbar animate-slideUpAndFade relative mt-2 max-h-[356px] w-[250px] overflow-auto rounded-md shadow-md will-change-[opacity,transform]'>
					<Form.Root
						onSubmit={(event) => {
							event.preventDefault();
						}}
						onChange={(event) => {
							console.log('event.currentTarget', event.currentTarget);
						}}
					>
						<CheckboxGroup options={options} />
					</Form.Root>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
};

export default TableSettings;
