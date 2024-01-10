import Base, { type InputProps } from './Base';

function Select(props: InputProps<HTMLSelectElement>) {
	return <Base {...props} component='select' />;
}

export default Select;
