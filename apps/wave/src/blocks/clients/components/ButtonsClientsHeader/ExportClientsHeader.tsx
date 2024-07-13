import ExportIcon from '~/icons/ExportIcon';
import { Button } from '~/components/buttons/Button';

const ExportClientsHeader = () => (
	<Button
		isFullWidth={false}
		message={'Export'}
		icon={<ExportIcon />}
		className='!border-blue-1'
	/>
);

export default ExportClientsHeader;
