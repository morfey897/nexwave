import CheckboxSettings from '../../GeneralSettings/CheckboxSettings';

const PaymentBlock = () => (
	<>
		<div className='mt-5 flex flex-col'>
			<span className='font-inter text-base font-medium leading-6'>
				Payment types
			</span>
			<span className='font-inter text-primary-text-gray text-sm font-normal leading-6'>
				Provide payment types in your school.
			</span>
		</div>
		<div className='flex flex-row gap-10'>
			<div className='flex flex-col gap-2'>
				<CheckboxSettings id='cash' label='Cash' checked={true} />
				<CheckboxSettings id='card' label='Card' checked={true} />
				<CheckboxSettings
					id='bank-transfer'
					label='Bank Transfer'
					checked={true}
				/>
				<CheckboxSettings
					id='internet-banking'
					label='Internet Banking'
					checked={true}
				/>
			</div>
		</div>
		<div className='relative my-6'>
			<label
				htmlFor='currency'
				className='text-primary-text-gray bg-secondary absolute -top-2 left-4 z-10 px-1 text-sm'
			>
				Currency <span className='text-red-600'>*</span>
			</label>
			<div className='relative h-[48px] w-[250px]'>
				<select className='border-stroke font-inter bg-secondary h-full w-full cursor-pointer rounded-md pl-12 text-base font-normal leading-6'>
					<option value=''>Dollar USA</option>
				</select>
				<div className='text-primary-text-gray absolute left-6 top-1/2 -translate-y-1/2 transform'>
					$
				</div>
			</div>
		</div>
	</>
);

export default PaymentBlock;
