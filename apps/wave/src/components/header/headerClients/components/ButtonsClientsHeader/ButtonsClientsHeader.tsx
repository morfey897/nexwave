import ExportClientsHeader from './ExportClientsHeader';
import ImportClientsHeader from './ImportClientsHeader';

const ButtonsClientsHeader = () => (
	<div className='flex gap-5'>
		<ImportClientsHeader />
		<ExportClientsHeader />
	</div>
);

export default ButtonsClientsHeader;
