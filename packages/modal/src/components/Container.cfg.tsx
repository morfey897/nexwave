import { RuleSet } from "styled-components";
import { Position, type UnionAnimation, type LitPosition } from "../types";
import {
  move,
  moveAnim,
  opacity,
  opacityAnim,
  build,
  concat,
  toMove,
  toOpacity,
} from "./animations";

const CxT = {
  mounted: concat(move({ x: "-50%", y: "-100%" }), opacity("0.3")),
  show: build(
    toMove([
      { x: "-50%", y: "-100%" },
      { x: "-50%", y: "0" },
    ]),
    toOpacity(["0.0", "0.7", "1"]),
  ),
  hide: build(
    toMove([
      { x: "-50%", y: "0" },
      { x: "-50%", y: "-100%" },
    ]),
    toOpacity(["1", "0"]),
  ),
};

const CxC = {
  mounted: opacity("0"),
  show: opacityAnim(["0.3", "1"]),
  hide: opacityAnim(["1", "0"]),
};

const CxB = {
  mounted: concat(move({ x: "-50%", y: "100%" }), opacity("0.3")),
  show: build(
    toMove([
      { x: "-50%", y: "100%" },
      { x: "-50%", y: "0" },
    ]),
    toOpacity(["0.0", "0.7", "1"]),
  ),
  hide: build(
    toMove([
      { x: "-50%", y: "0" },
      { x: "-50%", y: "100%" },
    ]),
    toOpacity(["1", "0"]),
  ),
};

const LxT = {
  mounted: move({ x: "-100%", y: "0" }),
  show: moveAnim([
    { x: "-100%", y: "0" },
    { x: "0", y: "0" },
  ]),
  hide: moveAnim([
    { x: "0", y: "0" },
    { x: "-100%", y: "0" },
  ]),
};

const LxC = {
  mounted: move({ x: "-100%", y: "-50%" }),
  show: moveAnim([
    { x: "-100%", y: "-50%" },
    { x: "0", y: "-50%" },
  ]),
  hide: moveAnim([
    { x: "0", y: "-50%" },
    { x: "-100%", y: "-50%" },
  ]),
};

const LxB = {
  mounted: move({ x: "-100%", y: "0" }),
  show: moveAnim([
    { x: "-100%", y: "0" },
    { x: "0", y: "0" },
  ]),
  hide: moveAnim([
    { x: "0", y: "0" },
    { x: "-100%", y: "0" },
  ]),
};

const RxT = {
  mounted: move({ x: "100%", y: "0" }),
  show: moveAnim([
    { x: "100%", y: "0" },
    { x: "0", y: "0" },
  ]),
  hide: moveAnim([
    { x: "0", y: "0" },
    { x: "100%", y: "0" },
  ]),
};

const RxC = {
  mounted: move({ x: "100%", y: "-50%" }),
  show: moveAnim([
    { x: "100%", y: "-50%" },
    { x: "0", y: "-50%" },
  ]),
  hide: moveAnim([
    { x: "0", y: "-50%" },
    { x: "100%", y: "-50%" },
  ]),
};

const RxB = {
  mounted: move({ x: "100%", y: "0" }),
  show: moveAnim([
    { x: "100%", y: "0" },
    { x: "0", y: "0" },
  ]),
  hide: moveAnim([
    { x: "0", y: "0" },
    { x: "100%", y: "0" },
  ]),
};

export const ANIMATIONS: Record<
  LitPosition,
  Record<UnionAnimation, RuleSet | string>
> = {
  [`${Position.CENTER}x${Position.TOP}`]: CxT,
  [`${Position.CENTER}x-${Position.TOP}`]: CxB,
  [`${Position.CENTER}x${Position.CENTER}`]: CxC,
  [`${Position.CENTER}x${Position.BOTTOM}`]: CxB,
  [`${Position.CENTER}x-${Position.BOTTOM}`]: CxT,

  [`${Position.LEFT}x${Position.TOP}`]: LxT,
  [`${Position.LEFT}x${Position.CENTER}`]: LxC,
  [`${Position.LEFT}x${Position.BOTTOM}`]: LxB,

  [`${Position.RIGHT}x${Position.TOP}`]: RxT,
  [`${Position.RIGHT}x${Position.CENTER}`]: RxC,
  [`${Position.RIGHT}x${Position.BOTTOM}`]: RxB,
};

const CT_0 = "left: 50%; top: 0; transform: translate(-50%, 100%);";
const CT_1 = "left: 50%; top: 0; transform: translate(-50%, 0);";
const CC_0_1 = "left: 50%; top: 50%; transform: translate(-50%, -50%);";
const CB_0 = "left: 50%; bottom: 0; transform: translate(-50%, -100%);";
const CB_1 = "left: 50%; bottom: 0; transform: translate(-50%, 0);";

const LT_0 = "left: 0; top: 0; transform: translate(-100%, 0);";
const LT_1 = "left: 0; top: 0; transform: translate(0, 0);";
const LC_0 = "left: 0; top: 50%; transform: translate(-100%, -50%);";
const LC_1 = "left: 0; top: 50%; transform: translate(0, -50%);";
const LB_0 = "left: 0; bottom: 0; transform: translate(-100%, 0);";
const LB_1 = "left: 0; bottom: 0; transform: translate(0, 0);";

const RT_0 = "right: 0; top: 0; transform: translate(100%, 0);";
const RT_1 = "right: 0; top: 0; transform: translate(0, 0);";
const RC_0 = "right: 0; top: 50%; transform: translate(100%, -50%);";
const RC_1 = "right: 0; top: 50%; transform: translate(0, -50%);";
const RB_0 = "right: 0; bottom: 0; transform: translate(100%, 0);";
const RB_1 = "right: 0; bottom: 0; transform: translate(0, 0);";

export const POSITION: Record<`${LitPosition}_${"0" | "1"}`, string> = {
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
