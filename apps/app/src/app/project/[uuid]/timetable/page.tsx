import TimetableView from '@/views/project/Timetable';
import { getDevice } from '@/headers';

export default function Home() {
	return <TimetableView device={getDevice()} />;
}
