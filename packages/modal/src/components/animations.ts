import { keyframes, css } from 'styled-components';
import { Keyframes, RuleSet } from 'styled-components/dist/types';
import { type AnimParams, type SetOfAnimParams } from '../types';

export const concat = (...args: string[]) => args.join(' ');

export const opacity = (value: string) => `opacity: ${value};`;
export const move = ({ x, y }: { x: string; y: string }) =>
	`transform: translate(${x}, ${y});`;

export const toOpacity = (
	...args: Array<Parameters<typeof opacity>[0]>
) => keyframes`
${args.map(
	(value, index) => `${(index * 100) / (args.length - 1)}% {${opacity(value)}}`
)}
`;
export const toMove = (
	...args: Array<Parameters<typeof move>[0] | undefined>
) => keyframes`
  ${args.map(
		(value, index) => `${(index * 100) / (args.length - 1)}% {${move(value)}}`
	)}
`;
export function build(keyframes: Keyframes | Array<Keyframes>): RuleSet<object>;
export function build(
	keyframes: Keyframes | Array<Keyframes>,
	params: AnimParams
): RuleSet<object>;

export function build(
	keyframes: Keyframes | Array<Keyframes>,
	props: SetOfAnimParams | undefined,
	part: string
): RuleSet<object>;

export function build(
	keyframes: Keyframes | Array<Keyframes>,
	...args: unknown[]
): RuleSet<object> {
	let params: AnimParams;
	if (args.length === 1) {
		if (Array.isArray(args[0])) {
			params = args[0] as AnimParams;
		}
	} else if (args.length === 2) {
		const [props, part] = args;
		if (Array.isArray(props)) {
			params = props as AnimParams;
		} else if (typeof props === 'object') {
			params = props[part as string];
		}
	}
	params = params || ['0.3s', 'ease'];

	return Array.isArray(keyframes)
		? keyframes.length === 1
			? css`
					animation: ${keyframes[0]} ${params.join(' ')} 1 normal forwards;
				`
			: keyframes.length === 2
				? css`
						animation:
							${keyframes[0]} ${params.join(' ')} 1 normal forwards,
							${keyframes[1]} ${params.join(' ')} 1 normal forwards;
					`
				: css`
						animation:
							${keyframes[0]} ${params.join(' ')} 1 normal forwards,
							${keyframes[1]} ${params.join(' ')} 1 normal forwards,
							${keyframes[2]} ${params.join(' ')} 1 normal forwards;
					`
		: css`
				animation: ${keyframes} ${params.join(' ')} 1 normal forwards;
			`;
}
