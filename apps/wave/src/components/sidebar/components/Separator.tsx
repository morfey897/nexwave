import clsx from 'clsx';

const Separator = ({ className }: { className?: string }) => (
	<hr className={clsx('border-gray-7 my-1  border-b', className)} />
);
export default Separator;
