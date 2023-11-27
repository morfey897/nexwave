import events from '../../../../__mock__/timetable.json';
import TimetableView from '@/views/Timetable';
import { IEvent } from '@/types/event';
import { addDays } from 'date-fns';
import { getDevice } from '@/headers';

export default function Home() {
	return (
		<TimetableView
			events={(events as unknown as IEvent[]).map((event) => ({
				...event,
				date: addDays(new Date(event.date), 12).toISOString(),
			}))}
			cellHeight={120}
			timeStep={30}
			device={getDevice()}
		/>
	);
}
