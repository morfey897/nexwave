import { keyframes, css } from "styled-components";

type State = "show" | "hide";
type Transition = "from" | "to";

const OPACITY = {
  show: {
    from: 0.3,
    to: 1,
  },
  hide: {
    from: 1,
    to: 0.3,
  },
};

const MOVE = {
  "0": {
    show: {
      from: "-100%",
      to: 0,
    },
    hide: {
      from: 0,
      to: "-100%",
    },
  },
  "1": {
    show: {
      from: "100%",
      to: 0,
    },
    hide: {
      from: 0,
      to: "100%",
    },
  },
};

export const DURATION = "0.3s";
export const TIMING_FUNCTION = "ease-in-out";

export const opacity = (state: State, tr: Transition) =>
  `opacity: ${OPACITY[state][tr]};`;

export const opacityKeyframes = (state: State) => keyframes`
  from {
    ${opacity(state, "from")}
  }
  to {
    ${opacity(state, "to")}
  }
`;

export const opacityAnimation = (
  state: State,
  duration?: string,
  timingFunc?: string,
) => css`
  animation: ${opacityKeyframes(state)} ${duration || DURATION}
    ${timingFunc || TIMING_FUNCTION};
`;

export const move = (
  direction: "X" | "Y",
  pos: "0" | "1",
  state: State,
  tr: Transition,
) => `transform: translate${direction}(${MOVE[pos][state][tr]});`;

export const moveKeyframes = (
  direction: "X" | "Y",
  pos: "0" | "1",
  state: State,
) => keyframes`
  from {
    ${move(direction, pos, state, "from")}
  }
  to {
    ${move(direction, pos, state, "to")}
  }
`;

export const moveAnimation = (
  direction: "X" | "Y",
  pos: "0" | "1",
  state: State,
  duration?: string,
  timingFunc?: string,
) => css`
  animation: ${moveKeyframes(direction, pos, state)} ${duration || DURATION}
    ${timingFunc || TIMING_FUNCTION};
`;
