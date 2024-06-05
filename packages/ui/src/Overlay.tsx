import * as React from 'react';
import styled from 'styled-components';
import { Blur } from './types';

export const StyledOverlay = styled.div<{ $blur?: Blur }>`
	inset: 0;
	position: fixed;
	background-color: transparent;
	backdrop-filter: ${(props) => `blur(${props.$blur || Blur.NONE})`};
`;

export const ComponentOverlay = React.forwardRef<
	HTMLDivElement,
	React.HTMLAttributes<HTMLDivElement> & {
		blur?: Blur;
	}
>(function Component({ blur, ...props }, ref) {
	return <StyledOverlay ref={ref} $blur={blur} {...props} />;
});
