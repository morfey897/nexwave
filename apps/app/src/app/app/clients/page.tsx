import clients from '../../../../__mock__/clients.json';
import { IClient } from '@/types/client';
import ClintsView from '@/views/Clients';

export default function Home() {
	return <ClintsView clients={clients as unknown as IClient[]} />;
}
