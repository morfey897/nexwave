import ExportIcon from '~/icons/ExportIcon';

const ExportClientsHeader = () => (
	<button
		type='button'
		className='bg-primary hover:bg-blue-5 hover:text-primary-text-gray border-user-selected text-user-selected flex items-center rounded-lg border px-4 py-2 font-semibold transition-colors duration-200'
	>
		<div className='flex items-center gap-2'>
			<ExportIcon />
			<span>Export</span>
		</div>
	</button>
);

export default ExportClientsHeader;
