'use client';

import { Autocomplete } from '@/components/Controls/Form';
import Button from '@/components/Button';

function Client() {
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const form = event.currentTarget;
		const data = new FormData(form);
		console.log('SUBMIT:', Object.fromEntries(data.entries()));
		// submit(data);
	};

	return (
		<form onSubmit={onSubmit}>
			<p>{'<Form>'}</p>
			<Autocomplete
				name='autocomplete'
				options={[
					{ id: 1, label: 'Pole dance' },
					{ id: 2, label: 'Hip hope' },
					{ id: 3, label: 'Hills' },
					{ id: 4, label: 'Расстяжка' },
					{ id: 5, label: 'Stretching' },
					{ id: 6, label: 'Exotic Pole Dance' },
				]}
				searchOptions={{
					fields: ['label'],
					storeFields: ['id', 'label'],
					searchOptions: {
						fuzzy: 0.2,
						prefix: true,
					},
				}}
				defaultValue={'2'}
				isDisabled={(option) => option.id === 3}
			/>
			<p>{'</Form>'}</p>
			<Button variant='primary' type='submit' message={'Submit'} />
		</form>
	);
}

export default Client;
