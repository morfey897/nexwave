import CheckboxSettings from './CheckboxSettings';

const WorkTimeBlock = () => (
	<>
		<div className='mt-5 flex flex-col'>
			<span className='font-inter text-base font-medium leading-6'>
				Work time
			</span>
			<span className='font-inter text-primary-text-gray text-sm font-normal leading-6'>
				Provide work time of your school.
			</span>
		</div>
		<div className='flex flex-row gap-10'>
			<div className='flex flex-col gap-2'>
				<CheckboxSettings name='monday' label='Monday' checked />
				<CheckboxSettings name='tuesday' label='Tuesday' checked />
				<CheckboxSettings name='wednesday' label='Wednesday' checked />
				<CheckboxSettings name='thursday' label='Thursday' checked />
			</div>
			<div className='flex flex-col gap-2'>
				<CheckboxSettings name='friday' label='Friday' checked />
				<CheckboxSettings name='saturday' label='Saturday' checked />
				<CheckboxSettings name='sunday' label='Sunday' checked />
			</div>
		</div>
		<div className='flex flex-row gap-2'>
			<div className='relative my-6 w-full'>
				<label
					htmlFor='from'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
				>
					From <span className='text-red-600'>*</span>
				</label>
				<input
					id='from'
					name='from'
					type='text'
					autoComplete='from'
					value='09:00'
					required
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				/>
			</div>
			<div className='relative my-6 w-full'>
				<label
					htmlFor='to'
					className='text-primary-text-gray bg-secondary absolute -top-2 left-4 px-1 text-sm'
				>
					To <span className='text-red-600'>*</span>
				</label>
				<input
					id='to'
					name='to'
					type='text'
					autoComplete='to'
					value='21:00'
					required
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				/>
			</div>
		</div>
	</>
);
export default WorkTimeBlock;
