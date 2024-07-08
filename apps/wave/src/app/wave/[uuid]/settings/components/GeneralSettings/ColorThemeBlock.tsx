const ColorThemeBlock = () => (
	<div className='mt-5 flex flex-col'>
		<div className='flex flex-col'>
			<span className='font-inter text-base font-medium leading-6'>Logo</span>
			<span className='font-inter text-primary-text-gray text-sm font-normal leading-6'>
				By default, your logo is shown as an abbreviation of the school name.
				You can upload your logo (PNG, JPG, GIF file up to 5 MB).{' '}
			</span>
		</div>
		<div className='relative mt-5 w-full'>
			<label
				htmlFor='color'
				className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
			>
				Color <span className='text-red-600'>*</span>
			</label>
			<select
				id='color'
				name='color'
				autoComplete='color'
				required
				className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
			>
				<option value=''>Select...</option>
				<option value='option1'>Option 1</option>
				<option value='option2'>Option 2</option>
				<option value='option3'>Option 3</option>
			</select>
		</div>
	</div>
);

export default ColorThemeBlock;
