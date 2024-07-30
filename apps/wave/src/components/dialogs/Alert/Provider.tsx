import Dialog from './Dialog';
import useNWStore from '~/lib/store';

function Provider() {
	const alerts = useNWStore((store) => store.alerts);

	return (
		<>
			{alerts.map((alert) => (
				<Dialog open key={alert.uuid} {...alert} />
			))}
		</>
	);
}

export default Provider;
