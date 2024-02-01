import { keyframes, css } from "styled-components";
import { Keyframes } from "styled-components/dist/types";
const DURATION_SEC = "0.3s";

const ANIM_PROPS = `1 normal forwards`;
type AnimFunc = "ease" | "ease-in" | "ease-out" | "ease-in-out" | "linear";

export const concat = (...args: string[]) => args.join(" ");

export const build = (...args: Array<[Keyframes, string[]]>) =>
  args.length === 1
    ? css`
        animation: ${args[0][0]} ${args[0][1].join(" ")} ${ANIM_PROPS};
      `
    : args.length === 2
      ? css`
          animation:
            ${args[0][0]} ${args[0][1].join(" ")} ${ANIM_PROPS},
            ${args[1][0]} ${args[1][1].join(" ")} ${ANIM_PROPS};
        `
      : css`
          animation:
            ${args[0][0]} ${args[0][1].join(" ")} ${ANIM_PROPS},
            ${args[1][0]} ${args[1][1].join(" ")} ${ANIM_PROPS},
            ${args[2][0]} ${args[2][1].join(" ")} ${ANIM_PROPS};
        `;

export const opacity = (value: string) => `opacity: ${value};`;

export const opacityKeyframes = (
  ...args: Array<Parameters<typeof opacity>[0]>
) => keyframes`
${args.map(
  (value, index) => `${(index * 100) / (args.length - 1)}% {${opacity(value)}}`,
)}
`;

export const toOpacity = (
  values: Array<Parameters<typeof opacity>[0]>,
  duration: string = DURATION_SEC,
  timingFunc: AnimFunc = "ease-in-out",
): [Keyframes, Array<string>] => [
  opacityKeyframes(...values),
  [duration, timingFunc],
];

export const opacityAnim = (
  values: Array<Parameters<typeof opacity>[0]>,
  duration: string = DURATION_SEC,
  timingFunc: AnimFunc = "ease-in-out",
) => build(toOpacity(values, duration, timingFunc));

export const move = ({ x, y }: { x: string; y: string }) =>
  `transform: translate(${x}, ${y});`;

export const moveKeyframes = (
  ...args: Array<Parameters<typeof move>[0] | undefined>
) => keyframes`
${args.map(
  (value, index) => `${(index * 100) / (args.length - 1)}% {${move(value)}}`,
)}
`;

export const toMove = (
  values: Array<Parameters<typeof move>[0]>,
  duration: string = DURATION_SEC,
  timingFunc: AnimFunc = "ease-in-out",
): [Keyframes, Array<string>] => [
  moveKeyframes(...values),
  [duration, timingFunc],
];

export const moveAnim = (
  values: Array<Parameters<typeof move>[0]>,
  duration: string = DURATION_SEC,
  timingFunc: AnimFunc = "ease-in-out",
) => build(toMove(values, duration, timingFunc));
