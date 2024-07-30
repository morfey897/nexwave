import Button from '~/components/controls/Button';
import PaymentBlock from './components/PaymentBlock';
import BankAccountBlock from './components/BankAccountBlock';
import PaymentTerminalBlock from './components/PaymentTerminalBlock';

const PaymentSettings = () => (
	<div className='flex flex-col gap-5'>
		<span className='font-inter text-xl font-semibold leading-7'>Payment</span>
		<div className='flex flex-col gap-32 md:flex-row'>
			<div className='flex flex-col'>
				<PaymentBlock />
			</div>
			<div className='flex flex-col'>
				<BankAccountBlock />
				<PaymentTerminalBlock />
			</div>
		</div>
		<div className='flex justify-end'>
			<div className='flex flex-row gap-2'>
				<div className='w-[108px]'>
					<Button message='Cancel' />
				</div>
				<div className='w-[94px]'>
					<Button message='Save' variant='primary' />
				</div>
			</div>
		</div>
	</div>
);

export default PaymentSettings;
