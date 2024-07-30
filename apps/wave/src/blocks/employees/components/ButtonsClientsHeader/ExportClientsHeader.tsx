import ExportIcon from '~/icons/ExportIcon';
import Button from '~/components/controls/Button';

const ExportClientsHeader = () => (
	<Button message='Export' icon={<ExportIcon />} className='!border-blue-1' />
);

export default ExportClientsHeader;
