import { RuleSet } from 'styled-components';
import { Position, type UnionAnimation, type LitPosition } from '../types';
import { move, opacity, build, concat, toMove, toOpacity } from './animations';
import { type SetOfAnimParams } from '../types';

type BuildFunc = (
	type: UnionAnimation,
	animProps?: SetOfAnimParams
) => ReturnType<typeof build> | ReturnType<typeof concat>;

/**
 * Center x Top
 * @param type show | finish | hide
 * @param animProps [] | [`${number}s`, AnimFunc]
 * @returns RuleSet | string
 */
const CxT: BuildFunc = (type, animProps) => {
	switch (type) {
		case 'show':
			return build(
				[
					toMove({ x: '-50%', y: '-100%' }, { x: '-50%', y: '0' }),
					toOpacity('0.0', '1'),
				],
				animProps,
				type
			);
		case 'finish':
			return concat(move({ x: '-50%', y: '0' }), opacity('1'));
		case 'hide':
			return build(
				[
					toMove({ x: '-50%', y: '0' }, { x: '-50%', y: '-100%' }),
					toOpacity('1', '0'),
				],
				animProps,
				type
			);
	}
};

/**
 * Center x Center
 * @param type show | finish | hide
 * @param animProps [] | [`${number}s`, AnimFunc]
 * @returns RuleSet | string
 */
const CxC: BuildFunc = (type, animProps) => {
	switch (type) {
		case 'show':
			return build(toOpacity('0.3', '1'), animProps, type);
		case 'finish':
			return concat(opacity('1'));
		case 'hide':
			return build(toOpacity('1', '0'), animProps, type);
	}
};

/**
 * Center x Bottom
 * @param type show | finish | hide
 * @param animProps [] | [`${number}s`, AnimFunc]
 * @returns RuleSet | string
 */
const CxB: BuildFunc = (type, animProps) => {
	switch (type) {
		case 'show':
			return build(
				[
					toMove({ x: '-50%', y: '100%' }, { x: '-50%', y: '0' }),
					toOpacity('0.0', '1'),
				],
				animProps,
				type
			);
		case 'finish':
			return concat(move({ x: '-50%', y: '0' }), opacity('1'));
		case 'hide':
			return build(
				[
					toMove({ x: '-50%', y: '0' }, { x: '-50%', y: '100%' }),
					toOpacity('1', '0'),
				],
				animProps,
				type
			);
	}
};

/**
 * Left x Top
 * @param type show | finish | hide
 * @param animProps [] | [`${number}s`, AnimFunc]
 * @returns RuleSet | string
 */
const LxT: BuildFunc = (type, animProps) => {
	switch (type) {
		case 'show':
			return build(
				toMove({ x: '-100%', y: '0' }, { x: '0', y: '0' }),
				animProps,
				type
			);
		case 'finish':
			return concat(move({ x: '0', y: '0' }));
		case 'hide':
			return build(
				toMove({ x: '0', y: '0' }, { x: '-100%', y: '0' }),
				animProps,
				type
			);
	}
};

/**
 * Left x Center
 * @param type show | finish | hide
 * @param animProps [] | [`${number}s`, AnimFunc]
 * @returns RuleSet | string
 */
const LxC: BuildFunc = (type, animProps) => {
	switch (type) {
		case 'show':
			return build(
				toMove({ x: '-100%', y: '-50%' }, { x: '0', y: '-50%' }),
				animProps,
				type
			);
		case 'finish':
			return concat(move({ x: '0', y: '-50%' }));
		case 'hide':
			return build(
				toMove({ x: '0', y: '-50%' }, { x: '-100%', y: '-50%' }),
				animProps,
				type
			);
	}
};

/**
 * Left x Bottom
 * @param type show | finish | hide
 * @param animProps [] | [`${number}s`, AnimFunc]
 * @returns RuleSet | string
 */
const LxB: BuildFunc = (type, animProps) => {
	switch (type) {
		case 'show':
			return build(
				toMove({ x: '-100%', y: '0' }, { x: '0', y: '0' }),
				animProps,
				type
			);
		case 'finish':
			return concat(move({ x: '0', y: '0' }));
		case 'hide':
			return build(
				toMove({ x: '0', y: '0' }, { x: '-100%', y: '0' }),
				animProps,
				type
			);
	}
};

/**
 * Right x Top
 * @param type show | finish | hide
 * @param animProps [] | [`${number}s`, AnimFunc]
 * @returns RuleSet | string
 */
const RxT: BuildFunc = (type, animProps) => {
	switch (type) {
		case 'show':
			return build(
				toMove({ x: '100%', y: '0' }, { x: '0', y: '0' }),
				animProps,
				type
			);
		case 'finish':
			return concat(move({ x: '0', y: '0' }), opacity('1'));
		case 'hide':
			return build(
				toMove({ x: '0', y: '0' }, { x: '100%', y: '0' }),
				animProps,
				type
			);
	}
};

/**
 * Right x Center
 * @param type show | finish | hide
 * @param animProps [] | [`${number}s`, AnimFunc]
 * @returns RuleSet | string
 */
const RxC: BuildFunc = (type, animProps) => {
	switch (type) {
		case 'show':
			return build(
				toMove({ x: '100%', y: '-50%' }, { x: '0', y: '-50%' }),
				animProps,
				type
			);
		case 'finish':
			return concat(move({ x: '0', y: '-50%' }));
		case 'hide':
			return build(
				toMove({ x: '0', y: '-50%' }, { x: '100%', y: '-50%' }),
				animProps,
				type
			);
	}
};

/**
 * Right x Bottom
 * @param type show | finish | hide
 * @param animProps [] | [`${number}s`, AnimFunc]
 * @returns RuleSet | string
 */
const RxB: BuildFunc = (type, animProps) => {
	switch (type) {
		case 'show':
			return build(
				toMove({ x: '100%', y: '0' }, { x: '0', y: '0' }),
				animProps,
				type
			);
		case 'finish':
			return concat(move({ x: '0', y: '0' }));
		case 'hide':
			return build(
				toMove({ x: '0', y: '0' }, { x: '100%', y: '0' }),
				animProps,
				type
			);
	}
};

export function buildAnimation(
	position: LitPosition,
	animation: UnionAnimation,
	animParams?: SetOfAnimParams
): RuleSet | string {
	switch (position) {
		case `${Position.CENTER}x${Position.TOP}`:
			return CxT(animation, animParams);
		case `${Position.CENTER}x-${Position.TOP}`:
			return CxB(animation, animParams);
		case `${Position.CENTER}x${Position.CENTER}`:
			return CxC(animation, animParams);
		case `${Position.CENTER}x${Position.BOTTOM}`:
			return CxB(animation, animParams);
		case `${Position.CENTER}x-${Position.BOTTOM}`:
			return CxT(animation, animParams);

		case `${Position.LEFT}x${Position.TOP}`:
			return LxT(animation, animParams);
		case `${Position.LEFT}x${Position.CENTER}`:
			return LxC(animation, animParams);
		case `${Position.LEFT}x${Position.BOTTOM}`:
			return LxB(animation, animParams);

		case `${Position.RIGHT}x${Position.TOP}`:
			return RxT(animation, animParams);
		case `${Position.RIGHT}x${Position.CENTER}`:
			return RxC(animation, animParams);
		case `${Position.RIGHT}x${Position.BOTTOM}`:
			return RxB(animation, animParams);
	}
}

const CT_0 = 'left: 50%; top: 0; transform: translate(-50%, 100%);';
const CT_1 = 'left: 50%; top: 0; transform: translate(-50%, 0);';
const CC_0_1 = 'left: 50%; top: 50%; transform: translate(-50%, -50%);';
const CB_0 = 'left: 50%; bottom: 0; transform: translate(-50%, -100%);';
const CB_1 = 'left: 50%; bottom: 0; transform: translate(-50%, 0);';

const LT_0 = 'left: 0; top: 0; transform: translate(-100%, 0);';
const LT_1 = 'left: 0; top: 0; transform: translate(0, 0);';
const LC_0 = 'left: 0; top: 50%; transform: translate(-100%, -50%);';
const LC_1 = 'left: 0; top: 50%; transform: translate(0, -50%);';
const LB_0 = 'left: 0; bottom: 0; transform: translate(-100%, 0);';
const LB_1 = 'left: 0; bottom: 0; transform: translate(0, 0);';

const RT_0 = 'right: 0; top: 0; transform: translate(100%, 0);';
const RT_1 = 'right: 0; top: 0; transform: translate(0, 0);';
const RC_0 = 'right: 0; top: 50%; transform: translate(100%, -50%);';
const RC_1 = 'right: 0; top: 50%; transform: translate(0, -50%);';
const RB_0 = 'right: 0; bottom: 0; transform: translate(100%, 0);';
const RB_1 = 'right: 0; bottom: 0; transform: translate(0, 0);';

export const POSITION: Record<`${LitPosition}_${'0' | '1'}`, string> = {
	[`${Position.CENTER}x${Position.TOP}_0`]: CT_0,
	[`${Position.CENTER}x-${Position.TOP}_0`]: CT_0,
	[`${Position.CENTER}x${Position.TOP}_1`]: CT_1,
	[`${Position.CENTER}x-${Position.TOP}_1`]: CT_1,
	[`${Position.CENTER}x${Position.CENTER}_0`]: CC_0_1,
	[`${Position.CENTER}x${Position.CENTER}_1`]: CC_0_1,
	[`${Position.CENTER}x${Position.BOTTOM}_0`]: CB_0,
	[`${Position.CENTER}x-${Position.BOTTOM}_0`]: CB_0,
	[`${Position.CENTER}x${Position.BOTTOM}_1`]: CB_1,
	[`${Position.CENTER}x-${Position.BOTTOM}_1`]: CB_1,

	[`${Position.LEFT}x${Position.TOP}_0`]: LT_0,
	[`${Position.LEFT}x${Position.TOP}_1`]: LT_1,
	[`${Position.LEFT}x${Position.CENTER}_0`]: LC_0,
	[`${Position.LEFT}x${Position.CENTER}_1`]: LC_1,
	[`${Position.LEFT}x${Position.BOTTOM}_0`]: LB_0,
	[`${Position.LEFT}x${Position.BOTTOM}_1`]: LB_1,

	[`${Position.RIGHT}x${Position.TOP}_0`]: RT_0,
	[`${Position.RIGHT}x${Position.TOP}_1`]: RT_1,
	[`${Position.RIGHT}x${Position.CENTER}_0`]: RC_0,
	[`${Position.RIGHT}x${Position.CENTER}_1`]: RC_1,
	[`${Position.RIGHT}x${Position.BOTTOM}_0`]: RB_0,
	[`${Position.RIGHT}x${Position.BOTTOM}_1`]: RB_1,
};
