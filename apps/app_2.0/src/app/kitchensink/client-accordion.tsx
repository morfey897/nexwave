'use client';
import Accordion from '@/components/Accordion';
import Button from '@/components/Button';
import { Input, Select } from '@/components/Controls/Form';
import { useState } from 'react';

function ClientAccordion() {
	const [open, setOpen] = useState(true);

	const toggle = () => setOpen(!open);
	return (
		<Accordion
			inputProps={{
				children: (
					<Button
						message={`Repeat ${open ? 'off' : 'on'}`}
						variant={'dark'}
						tag='span'
					/>
				),
				checked: open,
				onChange: toggle,
			}}
		>
			<div className='space-y-4 bg-gray-50 dark:bg-gray-900 p-2 pt-4 rounded-lg'>
				<Input
					name='repeat_every'
					type='number'
					placeholder={'page.add_event.repeat_every'}
					min={1}
					max={99}
					defaultValue={1}
				/>
				<Select
					name='repeat'
					placeholder={'page.add_event.repeat'}
					className='w-full'
				>
					<option value='weekly'>{'page.add_event.repeat_weekly'}</option>
					<option value='monthly'>{'page.add_event.repeat_monthly'}</option>
					<option value='yearly'>{'page.add_event.repeat_yearly'}</option>
				</Select>
			</div>
		</Accordion>
	);
}

export default ClientAccordion;
