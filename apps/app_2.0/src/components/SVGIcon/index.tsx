import { HiOutlinePuzzle } from 'react-icons/hi';
import { BsDiagram2 } from 'react-icons/bs';

function SVGIcon({
	type,
	size,
}: {
	type?: 'project' | 'branch';
	size?: number;
}) {
	if (type === 'project') {
		return <BsDiagram2 size={size} />;
	}

	if (type === 'branch') {
		return <HiOutlinePuzzle size={size} />;
	}
	return null;
}

export default SVGIcon;
