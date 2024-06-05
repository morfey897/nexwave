import * as React from 'react';
import styled from 'styled-components';
import { Position } from './types';

export const StyledContainer = styled.div<{
	$position: Position;
}>`
	position: absolute;
	${(props) =>
		props.$position === Position.CENTER &&
		'top: 50%; left: 50%; transform: translate(-50%, -50%);'}
	${(props) =>
		props.$position === Position.RIGHT && 'right: 0; top: 0; bottom: 0;'}
  ${(props) =>
		props.$position === Position.LEFT && 'left: 0; top: 0; bottom: 0;'}
  ${(props) => props.$position === Position.TOP && 'left: 0; right:0; top: 0;'}
  ${(props) =>
		props.$position === Position.BOTTOM && 'left: 0; right:0; bottom: 0;'}
`;

export function ComponentContainer({
	position,
	...props
}: React.HTMLAttributes<HTMLDivElement> & {
	position: Position;
}) {
	return <StyledContainer $position={position} {...props} />;
}
