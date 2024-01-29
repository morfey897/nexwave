import Base, { type InputProps } from './Base';

function Checkbox(props: InputProps<HTMLInputElement>) {
	return <Base {...props} component='checkbox' />;
}

export default Checkbox;
