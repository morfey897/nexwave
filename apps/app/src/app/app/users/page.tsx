import clients from '../../../../__mock__/clients.json';
import { IClient } from '@/types/client';
import UsersView from '@/views/Users';

export default function Home() {
	return <UsersView clients={clients as unknown as IClient[]} />;
}
