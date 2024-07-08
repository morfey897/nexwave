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
				<CheckboxSettings id='monday' label='Monday' checked={true} />
				<CheckboxSettings id='tuesday' label='Tuesday' checked={true} />
				<CheckboxSettings id='wednesday' label='Wednesday' checked={true} />
				<CheckboxSettings id='thursday' label='Thursday' checked={true} />
			</div>
			<div className='flex flex-col gap-2'>
				<CheckboxSettings id='friday' label='Friday' checked={true} />
				<CheckboxSettings id='saturday' label='Saturday' checked={true} />
				<CheckboxSettings id='sunday' label='Sunday' checked={true} />
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
					value={'09:00'}
					required
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				></input>
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
					value={'21:00'}
					required
					className='border-gray-3 bg-secondary mt-1 block w-full rounded-md border px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500'
				></input>
			</div>
		</div>
	</>
);
export default WorkTimeBlock;
