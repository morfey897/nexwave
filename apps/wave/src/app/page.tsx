import { EnumProtectedRoutes } from '~/constants/enums';
import { redirect } from 'next/navigation';

export default async function Home() {
	// redirect(EnumProtectedRoutes.APP);
	return <div>Home</div>;
}
