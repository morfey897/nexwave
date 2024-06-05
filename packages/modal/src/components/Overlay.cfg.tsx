import { type RuleSet } from 'styled-components';
import { type UnionAnimation } from '../types';
import { opacity, toOpacity, build } from './animations';

export const ANIMATIONS: Record<UnionAnimation, RuleSet | string> = {
	show: build(toOpacity('0.3', '1')),
	finish: opacity('1'),
	hide: build(toOpacity('1', '0.3')),
};
