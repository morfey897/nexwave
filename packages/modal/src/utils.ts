import { encode, decode } from "js-base64";
import { ModalState, TModalParams } from "./types";

export function encodeParams(params: TModalParams) {
  let str = "";
  try {
    str = JSON.stringify(typeof params === "object" ? params : null);
  } catch (e) {
    console.log("ERROR", e);
    return "";
  }
  return encode(str);
}

export function decodeParams(str: string | null | undefined) {
  try {
    return !str ? null : (JSON.parse(decode(str)) as TModalParams);
  } catch (e) {}
  return null;
}

// export const openModal = (
// 	name: string,
// 	props: Record<string, string | boolean | number> | null = null,
// 	base?: URLSearchParams,
// ): `?${string}` => {
// 	const clone = new URLSearchParams(base);
// 	clone.set(`${getModalName(name)}`, encodeParams(props));
// 	return `?${clone.toString()}`;
// };

// export const closeModal = (
// 	name: string,
// 	base?: URLSearchParams,
// ): `?${string}` => {
// 	const clone = new URLSearchParams(base);
// 	clone.delete(`${getModalName(name)}`);
// 	return `?${clone.toString()}`;
// };

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
