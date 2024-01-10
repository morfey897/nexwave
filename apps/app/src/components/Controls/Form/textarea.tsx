import Base, { type InputProps } from './Base';

function TextArea(props: InputProps<HTMLTextAreaElement>) {
	return <Base {...props} component='textarea' />;
}

export default TextArea;
