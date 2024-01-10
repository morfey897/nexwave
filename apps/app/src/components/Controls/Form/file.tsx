import Base, { type InputProps } from './Base';

function File(props: InputProps<HTMLInputElement>) {
	return <Base {...props} component='file' />;
}

export default File;
