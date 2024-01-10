import Base, { type InputProps } from './Base';

function Input(props: InputProps<HTMLInputElement>) {
	return <Base {...props} component='input' />;
}

export default Input;
