import { encode, decode } from "js-base64";
import { ModalState, TModalParams } from "./types";

export function encodeParams(params: TModalParams) {
  let str = "";
  try {
    str = JSON.stringify(typeof params === "object" ? params : null);
  } catch (error) {
    console.log("ERROR", error);
    return "";
  }
  return encode(str);
}

export function decodeParams(str: string | null | undefined) {
  try {
    return !str ? null : (JSON.parse(decode(str)) as TModalParams);
  } catch (error) {
    console.log("ERROR", error);
    return null;
  }
  return null;
}

export const totalHeight = (element: HTMLElement | null | undefined) => {
  if (!element || typeof element.getBoundingClientRect != "function") return 0;
  const rect = element.getBoundingClientRect();
  const height = rect.height;
  const style = window.getComputedStyle(element);
  const totalHeight = ["top", "bottom"]
    .map((side) => parseInt(style["margin-" + side], 10))
    .reduce((total, side) => total + side, height);
  return totalHeight;
};

export const filterModals = (
  modals: Record<string, ModalState>,
  from: ModalState,
  to: ModalState | null,
) =>
  Object.keys(modals).reduce((acc, name) => {
    const state = modals[name];
    if (state === from) {
      if (to === null) {
        delete acc[name];
        acc = {
          ...acc,
        };
      } else {
        acc = {
          ...acc,
          [name]: to,
        };
      }
    }
    return acc;
  }, modals);
