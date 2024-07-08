import ExportClientsHeader from './ExportClientsHeader';
import ImportClientsHeader from './ImportClientsHeader';

const ButtonsClientsHeader = () => (
	<div className='hidden gap-5 md:flex'>
		<ImportClientsHeader />
		<ExportClientsHeader />
	</div>
);

export default ButtonsClientsHeader;
