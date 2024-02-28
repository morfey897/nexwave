import BaseInput, { type TInput } from './BaseInput';

function Input(props: TInput) {
	return <BaseInput {...props} />;
}

export default Input;
