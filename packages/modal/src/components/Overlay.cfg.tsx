import { type RuleSet } from "styled-components";
import { type UnionAnimation } from "../types";
import { opacity, opacityAnim } from "./animations";

export const ANIMATIONS: Record<UnionAnimation, RuleSet | string> = {
  show: opacityAnim(["0.3", "1"]),
  finish: opacity("1"),
  hide: opacityAnim(["1", "0.3"]),
};
