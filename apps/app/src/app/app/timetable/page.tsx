import events from '../../../../__mock__/timetable.json';
import TimetableView from '@/views/Timetable';
import { IEvent } from '@/types/event';

export default function Home() {
	return (
		<TimetableView
			events={events as unknown as IEvent[]}
			cellHeight={120}
			timeStep={30}
		/>
	);
}
