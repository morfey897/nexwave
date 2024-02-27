import {
	Input,
	Masked,
	Select,
	Textarea,
	Checkbox,
	File,
	Duration,
} from '@/components/Controls/Form/';
import Button from '@/components/Button';
import { HiOutlineClock } from 'react-icons/hi';
import { PiWarningCircle } from 'react-icons/pi';
import { MdOutlineCloudUpload } from 'react-icons/md';
import Client from './client';

export default async function Home() {
	// redirect(APP);
	return (
		<div className='grid grid-cols-2 gap-x-2 gap-y-4 mx-auto mt-10 bg-slate-700 p-10'>
			<Input
				required
				name='name'
				type='text'
				placeholder={'Name'}
				// errorCopy={'Hint'}
				icon={<HiOutlineClock size={24} />}
				hint={
					<div className='flex justify-end'>
						<Button
							variant='text'
							message={'forgot_password'}
							className='text-center text-xs text-blue-500 hover:underline dark:text-blue-400 !p-0 mt-1'
						/>
					</div>
				}
			/>
			<Input name='name' type='date' placeholder={'Name'} />
			<div className='flex'>
				<Masked
					name='from'
					placeholder={'From'}
					maskedProps={{
						alias: 'datetime',
						inputFormat: 'HH:MM',
						showMaskOnHover: false,
					}}
				/>
				<span className='mx-2'>-</span>
				<Masked
					name='to'
					placeholder={'To'}
					maskedProps={{
						alias: 'datetime',
						inputFormat: 'HH:MM',
						showMaskOnHover: false,
					}}
				/>
			</div>
			<Input
				// required
				hidePlaceholder
				name='name'
				type='text'
				// placeholder={'Name2'}
				// errorCopy={'Hint'}
				icon={<HiOutlineClock size={24} />}
			/>
			<Select name='branch' placeholder={'Select branch'}>
				{/* <option className='hidden' value={''} /> */}
				<option value={'1'}>1</option>
				<option className='bg-red-400' value={'2'}>
					2
				</option>
				<option value={'3'}>3</option>
				<option value={'4'}>4</option>

				{/* {project?.branches?.map((branch) => (
									<option key={branch.uuid} value={branch.uuid}>
										{branch.name}
									</option>
								))} */}
			</Select>

			<Select
				name='branch'
				placeholder='Select color'
				hint='Please select color'
			>
				<option className='hidden' value={''}>
					Select branch 2 *
				</option>
				<option value={'1'}>1</option>
				<option value={'2'}>2</option>
				<option value={'3'}>3</option>
				<option value={'4'}>4</option>

				{/* {project?.branches?.map((branch) => (
									<option key={branch.uuid} value={branch.uuid}>
										{branch.name}
									</option>
								))} */}
			</Select>

			<Textarea name='info' placeholder={'Short info'} />

			<Checkbox
				// errorCopy={'Required'}
				hint={'Hint'}
				name={`role`}
				// value={value}
				placeholder={'Checkbox'}
				icon={
					<span className='text-orange-600 dark:text-orange-400'>
						<PiWarningCircle size={16} />
					</span>
				}
			/>

			<File
				// disabled={disabledForm}
				// onChange={onChange}
				icon={<MdOutlineCloudUpload size={24} />}
				name='image'
				placeholder={'Select image'}
				hint={'Upload or darg & drop your file PNG or JPG'}
				accept='image/png, image/jpeg'
			/>

			<Duration name='duration' placeholder={'Duration'} errorCopy={'Error'} />

			<Client />
		</div>
	);
}
