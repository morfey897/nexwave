import Button from '~/components/buttons/Button';
import ColorThemeBlock from './ColorThemeBlock';
import InfoBlock from './InfoBlock';
import LogoBlock from './LogoBlock';
import PhotosBlock from './PhotosBlock';
import WorkTimeBlock from './WorkTimeBlock';

const GeneralSettings = () => (
	<div className='flex flex-col gap-5'>
		<span className='font-inter text-xl font-semibold leading-7'>General</span>
		<div className='flex flex-col gap-32 md:flex-row'>
			<div className='flex flex-col'>
				<InfoBlock />
				<WorkTimeBlock />
			</div>
			<div className='flex flex-col'>
				<PhotosBlock />
				<LogoBlock />
				<ColorThemeBlock />
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

export default GeneralSettings;
